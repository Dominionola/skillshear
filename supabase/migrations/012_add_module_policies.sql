-- RLS Policies for Modules
-- Allows instructors to insert, update, delete modules for their own courses

drop policy if exists "Instructors can insert modules" on public.modules;
create policy "Instructors can insert modules"
  on public.modules for insert
  with check ( exists (
    select 1 from public.courses
    where courses.id = course_id
    and courses.instructor_id = auth.uid()
  ));

drop policy if exists "Instructors can update modules" on public.modules;
create policy "Instructors can update modules"
  on public.modules for update
  using ( exists (
    select 1 from public.courses
    where courses.id = course_id
    and courses.instructor_id = auth.uid()
  ));

drop policy if exists "Instructors can delete modules" on public.modules;
create policy "Instructors can delete modules"
  on public.modules for delete
  using ( exists (
    select 1 from public.courses
    where courses.id = course_id
    and courses.instructor_id = auth.uid()
  ));

-- RLS Policies for Lessons
-- Allows instructors to insert, update, delete lessons for their own courses/modules

drop policy if exists "Instructors can insert lessons" on public.lessons;
create policy "Instructors can insert lessons"
  on public.lessons for insert
  with check ( exists (
    select 1 from public.modules
    join public.courses on courses.id = modules.course_id
    where modules.id = module_id
    and courses.instructor_id = auth.uid()
  ));

drop policy if exists "Instructors can update lessons" on public.lessons;
create policy "Instructors can update lessons"
  on public.lessons for update
  using ( exists (
    select 1 from public.modules
    join public.courses on courses.id = modules.course_id
    where modules.id = module_id
    and courses.instructor_id = auth.uid()
  ));

drop policy if exists "Instructors can delete lessons" on public.lessons;
create policy "Instructors can delete lessons"
  on public.lessons for delete
  using ( exists (
    select 1 from public.modules
    join public.courses on courses.id = modules.course_id
    where modules.id = module_id
    and courses.instructor_id = auth.uid()
  ));
