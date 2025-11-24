-- Create storage buckets for course content
insert into storage.buckets (id, name, public)
values 
  ('course-thumbnails', 'course-thumbnails', true),
  ('lesson-content', 'lesson-content', true)
on conflict (id) do nothing;

-- RLS policies for course thumbnails
drop policy if exists "Anyone can view course thumbnails" on storage.objects;
create policy "Anyone can view course thumbnails"
  on storage.objects for select
  using ( bucket_id = 'course-thumbnails' );

drop policy if exists "Instructors can upload course thumbnails" on storage.objects;
create policy "Instructors can upload course thumbnails"
  on storage.objects for insert
  with check ( bucket_id = 'course-thumbnails' and auth.uid() is not null );

drop policy if exists "Instructors can update their course thumbnails" on storage.objects;
create policy "Instructors can update their course thumbnails"
  on storage.objects for update
  using ( bucket_id = 'course-thumbnails' and auth.uid() is not null );

drop policy if exists "Instructors can delete their course thumbnails" on storage.objects;
create policy "Instructors can delete their course thumbnails"
  on storage.objects for delete
  using ( bucket_id = 'course-thumbnails' and auth.uid() is not null );

-- RLS policies for lesson content
drop policy if exists "Anyone can view lesson content" on storage.objects;
create policy "Anyone can view lesson content"
  on storage.objects for select
  using ( bucket_id = 'lesson-content' );

drop policy if exists "Instructors can upload lesson content" on storage.objects;
create policy "Instructors can upload lesson content"
  on storage.objects for insert
  with check ( bucket_id = 'lesson-content' and auth.uid() is not null );

drop policy if exists "Instructors can update their lesson content" on storage.objects;
create policy "Instructors can update their lesson content"
  on storage.objects for update
  using ( bucket_id = 'lesson-content' and auth.uid() is not null );

drop policy if exists "Instructors can delete their lesson content" on storage.objects;
create policy "Instructors can delete their lesson content"
  on storage.objects for delete
  using ( bucket_id = 'lesson-content' and auth.uid() is not null );
