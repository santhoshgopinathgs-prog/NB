import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rgzqnsaonuokqiialvcv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnenFuc2FvbnVva3FpaWFsdmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTQ5MjgsImV4cCI6MjA5OTk3MDkyOH0.R2n71fhf1AOeOuNHQ_c8CVkjr6K2ZAvcxK31kBguFRQ';

// If Vercel env vars were added with accidental quotes, strip them out
const cleanUrl = supabaseUrl.replace(/['"]/g, '').trim();
const cleanKey = supabaseAnonKey.replace(/['"]/g, '').trim();

export const supabase = createClient(cleanUrl, cleanKey);
