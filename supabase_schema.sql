-- Supabase Schema for Namma Buddy

-- 1. Create Profiles table (extends Supabase Auth Users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Create User Progress table
CREATE TABLE public.user_progress (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  total_xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Create Certificates table
CREATE TABLE public.user_certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  date_earned TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, subject, class_level)
);

-- 4. Create Completed Quizzes table
CREATE TABLE public.completed_quizzes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, quiz_id)
);

-- 5. Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_quizzes ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Progress: Users can view and update their own progress
CREATE POLICY "Users can view own progress" 
  ON public.user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
  ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Certificates: Users can view their own certificates (Inserts happen via triggers or Edge Functions/n8n usually, but we'll allow insert for this demo)
CREATE POLICY "Users can view own certificates" 
  ON public.user_certificates FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates" 
  ON public.user_certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quizzes: Users can view and insert their own completed quizzes
CREATE POLICY "Users can view own completed quizzes" 
  ON public.completed_quizzes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completed quizzes" 
  ON public.completed_quizzes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to automatically create a profile and progress record on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, name, school, class_level)
  VALUES (
    new.id, 
    new.phone, 
    COALESCE(new.raw_user_meta_data->>'name', 'Student'), 
    COALESCE(new.raw_user_meta_data->>'school', 'School'), 
    COALESCE((new.raw_user_meta_data->>'class_level')::integer, 9)
  );

  INSERT INTO public.user_progress (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
