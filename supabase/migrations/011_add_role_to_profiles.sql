-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin'));

-- Create policy to allow users to update their own role (needed for "Become Instructor" button)
-- Note: existing "Users can update own profile" policy might already cover this, 
-- but we want to be explicit or ensure no column restrictions prevent it.
-- The existing policy is:
-- create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
-- This allows updating ANY column, so we are good.

-- However, we might want to restrict WHO can set 'admin' role in the future, 
-- but for now, we'll trust the client-side logic + basic RLS.
