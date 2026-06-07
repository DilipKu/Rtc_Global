-- =====================================================================================
-- MAKE A USER AN ADMIN
-- Instructions: 
-- 1. Sign up on your frontend (http://localhost:3000/#/login)
-- 2. Replace 'YOUR_EMAIL_HERE' with the email you signed up with.
-- 3. Run this script in the Supabase SQL Editor.
-- =====================================================================================

UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'YOUR_EMAIL_HERE';
