-- Add a foreign key relationship between courses.instructor_id and profiles.id
-- This allows PostgREST to understand how to join courses with profiles

-- First, drop the existing foreign key that points to auth.users
alter table public.courses 
  drop constraint if exists courses_instructor_id_fkey;

-- Add a new foreign key that points to profiles instead
-- This works because profiles.id IS auth.users(id)
alter table public.courses
  add constraint courses_instructor_id_fkey 
  foreign key (instructor_id) 
  references public.profiles(id) 
  on delete cascade;

-- Create an index for better join performance
create index if not exists idx_courses_instructor_id 
  on public.courses(instructor_id);
