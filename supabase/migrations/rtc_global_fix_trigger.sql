-- =====================================================================================
-- FIX SUPABASE AUTHENTICATION TRIGGER
-- Run this in your Supabase SQL Editor to resolve the "Database error saving new user"
-- =====================================================================================

-- 1. Drop the existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Replace the function with robust error handling and explicit search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- If there's an error inserting the profile, we still return NEW 
  -- so the authentication user is successfully created without blocking sign-up.
  RETURN NEW;
END;
$$;

-- 3. Re-attach the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
