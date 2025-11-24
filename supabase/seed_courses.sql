-- Seed Data for Courses

-- Note: You need to replace 'INSTRUCTOR_ID_HERE' with your actual User ID from the auth.users table.
-- You can find your ID by running: select id from auth.users limit 1;

DO $$
DECLARE
  v_instructor_id uuid;
  v_course_id uuid;
  v_module_id uuid;
BEGIN
  -- Get the first user to be the instructor (OR REPLACE THIS WITH YOUR SPECIFIC ID)
  select id into v_instructor_id from auth.users limit 1;

  IF v_instructor_id IS NULL THEN
    RAISE EXCEPTION 'No users found in auth.users. Please sign up first.';
  END IF;

  -- ==========================================
  -- Course 1: React Fundamentals (Beginner)
  -- ==========================================
  insert into public.courses (title, description, instructor_id, price, level, category, published, thumbnail_url)
  values (
    'React Fundamentals',
    'Master the basics of React.js, the most popular JavaScript library for building user interfaces. Learn components, props, state, and hooks.',
    v_instructor_id,
    0,
    'beginner',
    'Development',
    true,
    'https://raw.githubusercontent.com/facebook/react/main/fixtures/dom/public/react-logo.svg'
  ) returning id into v_course_id;

  -- Module 1
  insert into public.modules (course_id, title, order_index)
  values (v_course_id, 'Introduction to React', 1)
  returning id into v_module_id;

  insert into public.lessons (module_id, title, content_type, duration, order_index, is_free)
  values
  (v_module_id, 'What is React?', 'video', 5, 1, true),
  (v_module_id, 'Setting up the Environment', 'article', 10, 2, true),
  (v_module_id, 'Your First Component', 'video', 15, 3, false);

  -- Module 2
  insert into public.modules (course_id, title, order_index)
  values (v_course_id, 'State and Props', 2)
  returning id into v_module_id;

  insert into public.lessons (module_id, title, content_type, duration, order_index)
  values
  (v_module_id, 'Understanding Props', 'video', 12, 1),
  (v_module_id, 'Managing State with useState', 'video', 20, 2);

  -- ==========================================
  -- Course 2: Advanced CSS Layouts (Intermediate)
  -- ==========================================
  insert into public.courses (title, description, instructor_id, price, level, category, published, thumbnail_url)
  values (
    'Advanced CSS Layouts',
    'Deep dive into Flexbox, Grid, and modern CSS layout techniques. Build responsive and complex web layouts with ease.',
    v_instructor_id,
    49.99,
    'intermediate',
    'Design',
    true,
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
  ) returning id into v_course_id;

  -- Module 1
  insert into public.modules (course_id, title, order_index)
  values (v_course_id, 'Mastering Flexbox', 1)
  returning id into v_module_id;

  insert into public.lessons (module_id, title, content_type, duration, order_index, is_free)
  values
  (v_module_id, 'Flex Container & Items', 'video', 10, 1, true),
  (v_module_id, 'Alignment & Justification', 'video', 15, 2, false);

  -- ==========================================
  -- Course 3: Fullstack Next.js (Advanced)
  -- ==========================================
  insert into public.courses (title, description, instructor_id, price, level, category, published, thumbnail_url)
  values (
    'Fullstack Next.js 14',
    'Build production-ready applications with Next.js 14, Server Actions, Supabase, and Tailwind CSS.',
    v_instructor_id,
    99.99,
    'advanced',
    'Development',
    true,
    'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png'
  ) returning id into v_course_id;

   -- Module 1
  insert into public.modules (course_id, title, order_index)
  values (v_course_id, 'App Router Fundamentals', 1)
  returning id into v_module_id;

  insert into public.lessons (module_id, title, content_type, duration, order_index, is_free)
  values
  (v_module_id, 'Server vs Client Components', 'article', 15, 1, true),
  (v_module_id, 'Routing & Navigation', 'video', 20, 2, false);

END $$;
