-- Create courses table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  thumbnail_url text,
  instructor_id uuid references auth.users(id) not null,
  price decimal(10, 2) default 0,
  level text check (level in ('beginner', 'intermediate', 'advanced')),
  category text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create modules table
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create lessons table
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  description text,
  content_type text check (content_type in ('video', 'article', 'quiz')) not null,
  content_url text,
  duration integer, -- in minutes
  order_index integer not null,
  is_free boolean default false, -- for preview
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create enrollments table
create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  progress integer default 0, -- percentage
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- Create lesson_completions table to track individual lesson progress
create table public.lesson_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- RLS Policies

-- Courses: Public read access for published courses
alter table public.courses enable row level security;
create policy "Published courses are viewable by everyone"
  on public.courses for select
  using ( published = true );

-- Instructors can view all their own courses (even unpublished)
create policy "Instructors can view their own courses"
  on public.courses for select
  using ( auth.uid() = instructor_id );

-- Instructors can insert/update/delete their own courses
create policy "Instructors can insert their own courses"
  on public.courses for insert
  with check ( auth.uid() = instructor_id );

create policy "Instructors can update their own courses"
  on public.courses for update
  using ( auth.uid() = instructor_id );

create policy "Instructors can delete their own courses"
  on public.courses for delete
  using ( auth.uid() = instructor_id );

-- Modules & Lessons: Viewable if course is published or user is instructor
alter table public.modules enable row level security;
create policy "Modules viewable by everyone if course is published"
  on public.modules for select
  using ( exists (
    select 1 from public.courses
    where courses.id = modules.course_id
    and (courses.published = true or courses.instructor_id = auth.uid())
  ));

alter table public.lessons enable row level security;
create policy "Lessons viewable by everyone if course is published"
  on public.lessons for select
  using ( exists (
    select 1 from public.modules
    join public.courses on courses.id = modules.course_id
    where modules.id = lessons.module_id
    and (courses.published = true or courses.instructor_id = auth.uid())
  ));

-- Enrollments: Users can view and create their own enrollments
alter table public.enrollments enable row level security;
create policy "Users can view their own enrollments"
  on public.enrollments for select
  using ( auth.uid() = user_id );

create policy "Users can enroll themselves"
  on public.enrollments for insert
  with check ( auth.uid() = user_id );

-- Lesson Completions: Users can view and manage their own completions
alter table public.lesson_completions enable row level security;
create policy "Users can view their own completions"
  on public.lesson_completions for select
  using ( auth.uid() = user_id );

create policy "Users can mark lessons as complete"
  on public.lesson_completions for insert
  with check ( auth.uid() = user_id );
