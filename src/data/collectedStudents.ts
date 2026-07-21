export interface CollectedStudent {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  school: string;
  classLevel: number;
  language: string;
  points: number;
  rollNo?: string;
  attendance?: number;
  score?: number;
  level?: number;
  status?: 'active' | 'needs_help' | 'inactive';
}

export const RAW_COLLECTED_STUDENTS: Omit<CollectedStudent, 'id'>[] = [
  // Top Scorers (100+ XP)
  { name: 'Poornima S', age: 14, gender: 'Female', school: 'Vidhatha', classLevel: 8, language: 'en', points: 140 },
  { name: 'Meghana', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 130 },
  { name: 'Yashaswini', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 120 },
  { name: 'Yashodha P', age: 13, gender: 'Female', school: 'Vidhatha Vidhya Trust Anekal', classLevel: 8, language: 'en', points: 110 },
  { name: 'Harshitha', age: 13, gender: 'Male', school: 'Vidhatha', classLevel: 8, language: 'en', points: 100 },
  { name: 'Shaylu', age: 13, gender: 'Female', school: 'Vidhatha Vidya Trust Anekal', classLevel: 8, language: 'en', points: 90 },

  // 70-80 XP
  { name: 'Mahesh', age: 14, gender: 'Male', school: 'Vidhata Vidya Trust Anekal', classLevel: 8, language: 'en', points: 80 },
  { name: 'Bhumika', age: 13, gender: 'Female', school: 'Asb', classLevel: 8, language: 'en', points: 70 },
  { name: 'Nayana', age: 13, gender: 'Female', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 70 },
  { name: 'Goutam', age: 15, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 70 },
  { name: 'Gowthami K', age: 13, gender: 'Female', school: 'Vitha Vidha', classLevel: 8, language: 'kn', points: 70 },

  // 60 XP
  { name: 'Navya Nayak', age: 13, gender: 'Male', school: 'Govt', classLevel: 8, language: 'en', points: 60 },
  { name: 'Kishan', age: 14, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 8, language: 'en', points: 60 },
  { name: 'Santhosh', age: 13, gender: 'Male', school: 'High School', classLevel: 8, language: 'en', points: 60 },
  { name: 'Veeresh', age: 13, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 60 },
  { name: 'Ajith', age: 14, gender: 'Male', school: 'Vidhatha Viday Trust', classLevel: 9, language: 'en', points: 60 },
  { name: 'Ashwath Kumar', age: 14, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 60 },
  { name: 'Vishal', age: 14, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 60 },
  { name: 'Poornima', age: 14, gender: 'Female', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 60 },
  { name: 'Ranjith', age: 14, gender: 'Male', school: 'Vidhata Vidya Trust', classLevel: 9, language: 'en', points: 60 },
  { name: 'Sharath Babu C G', age: 13, gender: 'Male', school: 'Government School', classLevel: 8, language: 'kn', points: 60 },
  { name: 'Lokesh K', age: 13, gender: 'Male', school: 'VST School', classLevel: 8, language: 'en', points: 60 },
  { name: 'Pallavi', age: 13, gender: 'Female', school: 'Vidthata Vidya Trust', classLevel: 8, language: 'en', points: 60 },
  { name: 'Lekha Dyamanna', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 60 },
  { name: 'Akshatha', age: 13, gender: 'Male', school: 'Vidhatha', classLevel: 8, language: 'en', points: 60 },
  { name: 'Shravanthi', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 60 },
  { name: 'Madesh Class 9', age: 15, gender: 'Male', school: 'Viddhata', classLevel: 9, language: 'en', points: 60 },
  { name: 'Nagesh', age: 14, gender: 'Male', school: 'Vidthata Vidya Trust', classLevel: 9, language: 'en', points: 60 },
  { name: 'Loki', age: 13, gender: 'Male', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 60 },
  { name: 'Rashmi', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 9, language: 'en', points: 60 },
  { name: 'Shreemathi', age: 13, gender: 'Female', school: 'Vidthata Kannada High School', classLevel: 9, language: 'en', points: 60 },
  { name: 'Navyashree R', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 9, language: 'en', points: 60 },
  { name: 'Harshith', age: 13, gender: 'Male', school: 'Vidhatha Vidya Trust', classLevel: 9, language: 'en', points: 60 },
  { name: 'Aa', age: 13, gender: 'Male', school: 'Aa', classLevel: 8, language: 'en', points: 60 },

  // 50 XP
  { name: 'Mohan', age: 15, gender: 'Male', school: 'Anekal Government School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Raghav', age: 13, gender: 'Male', school: 'Vidhya High School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Muttu', age: 13, gender: 'Male', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 50 },
  { name: 'Lokesh', age: 13, gender: 'Male', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 50 },
  { name: 'Rajeshwari', age: 12, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Radhana', age: 14, gender: 'Female', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 50 },
  { name: 'Jeevan', age: 13, gender: 'Male', school: 'Vidhatha High School', classLevel: 8, language: 'kn', points: 50 },
  { name: 'Chandra Mohan', age: 14, gender: 'Male', school: 'Vidtha Vidya', classLevel: 9, language: 'en', points: 50 },
  { name: 'Gowthami', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Dhanushree', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Tanmay', age: 13, gender: 'Male', school: 'Vidhata Vidya Trust', classLevel: 8, language: 'en', points: 50 },
  { name: 'Vaishnavi', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Veeresh V', age: 13, gender: 'Male', school: 'Vidhatha', classLevel: 8, language: 'en', points: 50 },
  { name: 'Nikil', age: 13, gender: 'Male', school: 'Vidthata Vidya Trust', classLevel: 8, language: 'en', points: 50 },
  { name: 'Sufiyan Anekal', age: 15, gender: 'Male', school: 'Vidhatha Vidya Trust Anekal', classLevel: 8, language: 'en', points: 50 },
  { name: 'Jeevan K', age: 13, gender: 'Male', school: 'Vidhatha High School', classLevel: 9, language: 'kn', points: 50 },
  { name: 'Gagan', age: 14, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'en', points: 50 },
  { name: 'Mahesh B', age: 14, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 8, language: 'en', points: 50 },
  { name: 'Lavanya', age: 13, gender: 'Female', school: 'Vidhatha Vidya Anekal', classLevel: 8, language: 'en', points: 50 },
  { name: 'Praveen', age: 13, gender: 'Male', school: 'Vidthata Vidya Trust', classLevel: 8, language: 'kn', points: 50 },
  { name: 'Anjali', age: 13, gender: 'Female', school: 'Vidthata Kannada High School', classLevel: 9, language: 'en', points: 50 },
  { name: 'Hemavathi', age: 13, gender: 'Female', school: 'Vidthh High School', classLevel: 9, language: 'kn', points: 50 },
  { name: 'Yash', age: 15, gender: 'Male', school: 'Vidthha', classLevel: 9, language: 'en', points: 50 },
  { name: 'Kubra', age: 13, gender: 'Female', school: 'Vidhatha Vidya High School', classLevel: 9, language: 'kn', points: 50 },
  { name: 'Sanjay', age: 14, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'en', points: 50 },
  { name: 'Monika', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 9, language: 'en', points: 50 },
  { name: 'Handjsjs', age: 13, gender: 'Male', school: 'SBS High School', classLevel: 8, language: 'en', points: 50 },
  { name: 'Pronoy Das', age: 20, gender: 'Male', school: 'Alliance High School', classLevel: 10, language: 'en', points: 50 },

  // 30-40 XP
  { name: 'Yashwant', age: 15, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'kn', points: 40 },
  { name: 'Adarsh', age: 14, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 40 },
  { name: 'Shiva', age: 13, gender: 'Male', school: 'Vidhatha Vidya Trust', classLevel: 8, language: 'en', points: 40 },
  { name: 'Keerthana', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 40 },
  { name: 'Hamenth Kumar A', age: 14, gender: 'Male', school: 'Vidhatha Vidya Trust Anekal', classLevel: 8, language: 'en', points: 40 },
  { name: 'Deepika V', age: 13, gender: 'Female', school: 'Vidthata Vidya Trust Anekal', classLevel: 8, language: 'en', points: 40 },
  { name: 'Pallavi M', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'kn', points: 40 },
  { name: 'Vijaya Lakshmi', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 8, language: 'en', points: 40 },
  { name: 'John', age: 15, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 40 },
  { name: 'Dilip', age: 13, gender: 'Male', school: 'Anekal High School', classLevel: 8, language: 'en', points: 40 },

  { name: 'Manoj', age: 14, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'kn', points: 30 },
  { name: 'Lokesh B', age: 13, gender: 'Male', school: 'VSBII School', classLevel: 8, language: 'en', points: 30 },
  { name: 'Faizal', age: 14, gender: 'Male', school: 'Vidhatha Vidya Trust Anekal', classLevel: 8, language: 'kn', points: 30 },
  { name: 'Hemanth Kumar', age: 13, gender: 'Male', school: 'Vidhatha', classLevel: 8, language: 'en', points: 30 },
  { name: 'Sufiyan', age: 13, gender: 'Male', school: 'Vidhatha', classLevel: 8, language: 'en', points: 30 },
  { name: 'Chethana C', age: 13, gender: 'Female', school: 'Vidthata Vidhya Trust Anekal', classLevel: 8, language: 'en', points: 30 },
  { name: 'Savitha', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 9, language: 'en', points: 30 },

  // 10-20 XP
  { name: 'Madesh', age: 15, gender: 'Male', school: 'Vidhatha Vidya', classLevel: 9, language: 'en', points: 20 },
  { name: 'Manoj S', age: 13, gender: 'Male', school: 'VST School', classLevel: 8, language: 'en', points: 20 },
  { name: 'Afreen M', age: 13, gender: 'Female', school: 'Vidhatha Vidya Trust', classLevel: 8, language: 'en', points: 20 },
  { name: 'Chinthana M', age: 13, gender: 'Female', school: 'Vidhatha Vidhya School Anekal', classLevel: 8, language: 'en', points: 20 },
  { name: 'Nithin Kumar M', age: 14, gender: 'Male', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 20 },
  { name: 'Gowtham R', age: 14, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'en', points: 20 },
  { name: 'Keerthana C', age: 13, gender: 'Female', school: 'Vidhatha Vidha Secondary School', classLevel: 9, language: 'en', points: 20 },
  { name: 'Kubra M', age: 13, gender: 'Female', school: 'Vidhatha Vidya Trust School', classLevel: 9, language: 'kn', points: 20 },
  { name: 'Naven', age: 14, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'en', points: 20 },
  { name: 'Manol', age: 13, gender: 'Male', school: 'VSBT School', classLevel: 8, language: 'en', points: 10 },

  // 0 XP
  { name: 'Shreyas', age: 13, gender: 'Male', school: 'Vidhatha', classLevel: 8, language: 'en', points: 0 },
  { name: 'Arjun', age: 14, gender: 'Male', school: 'Vidhatha', classLevel: 9, language: 'en', points: 0 },
  { name: 'Bhoomika (Teacher)', age: 24, gender: 'Female', school: 'Vidhatha High School', classLevel: 9, language: 'en', points: 0 }
];

export const COLLECTED_STUDENTS: CollectedStudent[] = RAW_COLLECTED_STUDENTS
  .sort((a, b) => b.points - a.points)
  .map((s, idx) => ({
    ...s,
    id: `cs_${idx + 1}`,
    rollNo: `80${(idx + 1).toString().padStart(2, '0')}`,
    attendance: Math.min(100, Math.max(72, 98 - (idx % 12))),
    score: Math.min(100, Math.max(45, Math.floor(s.points / 1.5) + 55)),
    level: Math.max(1, Math.floor(s.points / 25) + 1),
    status: s.points >= 50 ? 'active' : (s.points >= 20 ? 'needs_help' : 'inactive')
  }));
