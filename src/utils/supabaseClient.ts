import { createClient } from '@supabase/supabase-js';

// Hardcoding the keys directly to completely ignore Vercel's environment variables
// This prevents any broken keys entered in the Vercel dashboard from overriding the correct ones.
const cleanUrl = 'https://rgzqnsaonuokqiialvcv.supabase.co';
const cleanKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnenFuc2FvbnVva3FpaWFsdmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTQ5MjgsImV4cCI6MjA5OTk3MDkyOH0.R2n71fhf1AOeOuNHQ_c8CVkjr6K2ZAvcxK31kBguFRQ';

export const supabase = createClient(cleanUrl, cleanKey);
