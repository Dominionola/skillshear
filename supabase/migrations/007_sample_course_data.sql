-- Sample Course Data Migration
-- This creates 5 diverse courses with modules and lessons for testing

-- First, we need to get an instructor ID from existing users
-- We'll use a DO block to dynamically assign the first available user as instructor

DO $$
DECLARE
  instructor_uuid uuid;
  course1_id uuid;
  course2_id uuid;
  course3_id uuid;
  course4_id uuid;
  course5_id uuid;
  module_id uuid;
BEGIN
  -- Get the first user from profiles to use as instructor
  SELECT id INTO instructor_uuid FROM public.profiles LIMIT 1;
  
  -- If no user exists, exit
  IF instructor_uuid IS NULL THEN
    RAISE NOTICE 'No users found in profiles table. Please create a user first.';
    RETURN;
  END IF;

  RAISE NOTICE 'Using instructor ID: %', instructor_uuid;

  -- ============================================
  -- COURSE 1: Web Development Fundamentals
  -- ============================================
  INSERT INTO public.courses (id, title, description, instructor_id, price, level, category, published)
  VALUES (
    gen_random_uuid(),
    'Web Development Fundamentals',
    'Learn the basics of web development including HTML, CSS, and JavaScript. Perfect for beginners starting their coding journey.',
    instructor_uuid,
    0.00,
    'beginner',
    'Web Development',
    true
  ) RETURNING id INTO course1_id;

  -- Module 1: HTML Basics
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course1_id, 'HTML Basics', 'Introduction to HTML and document structure', 1)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'What is HTML?', 'Understanding HTML and its role in web development', 'video', 15, 1, true),
    (module_id, 'HTML Document Structure', 'Learn about HTML tags and document structure', 'video', 20, 2, true),
    (module_id, 'Working with Text', 'Headings, paragraphs, and text formatting', 'video', 18, 3, false);

  -- Module 2: CSS Styling
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course1_id, 'CSS Styling', 'Make your websites beautiful with CSS', 2)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Introduction to CSS', 'What is CSS and how does it work?', 'video', 12, 1, false),
    (module_id, 'Colors and Backgrounds', 'Working with colors, backgrounds, and gradients', 'video', 25, 2, false),
    (module_id, 'CSS Layout Basics', 'Understanding the box model and layout', 'video', 30, 3, false);

  -- Module 3: JavaScript Basics
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course1_id, 'JavaScript Basics', 'Add interactivity to your websites', 3)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'JavaScript Introduction', 'Your first JavaScript program', 'video', 20, 1, false),
    (module_id, 'Variables and Data Types', 'Working with data in JavaScript', 'video', 22, 2, false),
    (module_id, 'Functions and Events', 'Making your page interactive', 'video', 28, 3, false);

  -- ============================================
  -- COURSE 2: React for Beginners
  -- ============================================
  INSERT INTO public.courses (id, title, description, instructor_id, price, level, category, published)
  VALUES (
    gen_random_uuid(),
    'React for Beginners',
    'Master React.js from scratch. Build modern, interactive web applications with the most popular JavaScript library.',
    instructor_uuid,
    49.99,
    'intermediate',
    'Web Development',
    true
  ) RETURNING id INTO course2_id;

  -- Module 1: Getting Started with React
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course2_id, 'Getting Started with React', 'Set up your React development environment', 1)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'What is React?', 'Introduction to React and its ecosystem', 'video', 15, 1, true),
    (module_id, 'Setting Up Your Environment', 'Install Node.js and create your first React app', 'video', 20, 2, false),
    (module_id, 'Understanding JSX', 'Learn the syntax that powers React', 'video', 18, 3, false);

  -- Module 2: React Components
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course2_id, 'React Components', 'Building blocks of React applications', 2)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Functional Components', 'Creating reusable components', 'video', 25, 1, false),
    (module_id, 'Props and State', 'Managing data in React', 'video', 30, 2, false),
    (module_id, 'Component Lifecycle', 'Understanding how components work', 'video', 22, 3, false);

  -- ============================================
  -- COURSE 3: Python Programming Masterclass
  -- ============================================
  INSERT INTO public.courses (id, title, description, instructor_id, price, level, category, published)
  VALUES (
    gen_random_uuid(),
    'Python Programming Masterclass',
    'Complete Python course from beginner to advanced. Learn data structures, OOP, and build real-world projects.',
    instructor_uuid,
    79.99,
    'beginner',
    'Programming',
    true
  ) RETURNING id INTO course3_id;

  -- Module 1: Python Fundamentals
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course3_id, 'Python Fundamentals', 'Start your Python journey', 1)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Installing Python', 'Set up Python on your computer', 'video', 10, 1, true),
    (module_id, 'Your First Python Program', 'Hello World and basic syntax', 'video', 15, 2, true),
    (module_id, 'Variables and Data Types', 'Working with numbers, strings, and booleans', 'video', 20, 3, false),
    (module_id, 'Control Flow', 'If statements and loops', 'video', 25, 4, false);

  -- Module 2: Data Structures
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course3_id, 'Data Structures', 'Lists, dictionaries, and more', 2)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Working with Lists', 'Python lists and list operations', 'video', 22, 1, false),
    (module_id, 'Dictionaries and Sets', 'Key-value pairs and unique collections', 'video', 20, 2, false),
    (module_id, 'Tuples and Advanced Structures', 'Immutable data and nested structures', 'video', 18, 3, false);

  -- ============================================
  -- COURSE 4: UI/UX Design Principles
  -- ============================================
  INSERT INTO public.courses (id, title, description, instructor_id, price, level, category, published)
  VALUES (
    gen_random_uuid(),
    'UI/UX Design Principles',
    'Learn the fundamentals of user interface and user experience design. Create beautiful, user-friendly applications.',
    instructor_uuid,
    39.99,
    'beginner',
    'Design',
    true
  ) RETURNING id INTO course4_id;

  -- Module 1: Design Fundamentals
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course4_id, 'Design Fundamentals', 'Core principles of good design', 1)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'What is UI/UX?', 'Understanding the difference and importance', 'video', 12, 1, true),
    (module_id, 'Color Theory', 'Using colors effectively in design', 'video', 18, 2, false),
    (module_id, 'Typography Basics', 'Choosing and using fonts', 'video', 15, 3, false);

  -- Module 2: User Research
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course4_id, 'User Research', 'Understanding your users', 2)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Conducting User Interviews', 'Gathering user feedback', 'video', 20, 1, false),
    (module_id, 'Creating User Personas', 'Defining your target audience', 'video', 16, 2, false),
    (module_id, 'User Journey Mapping', 'Visualizing the user experience', 'video', 22, 3, false);

  -- ============================================
  -- COURSE 5: Advanced JavaScript & Node.js
  -- ============================================
  INSERT INTO public.courses (id, title, description, instructor_id, price, level, category, published)
  VALUES (
    gen_random_uuid(),
    'Advanced JavaScript & Node.js',
    'Take your JavaScript skills to the next level. Learn async programming, APIs, and build full-stack applications with Node.js.',
    instructor_uuid,
    89.99,
    'advanced',
    'Web Development',
    true
  ) RETURNING id INTO course5_id;

  -- Module 1: Advanced JavaScript Concepts
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course5_id, 'Advanced JavaScript Concepts', 'Deep dive into JavaScript', 1)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Closures and Scope', 'Understanding JavaScript scope chain', 'video', 25, 1, true),
    (module_id, 'Promises and Async/Await', 'Mastering asynchronous JavaScript', 'video', 30, 2, false),
    (module_id, 'ES6+ Features', 'Modern JavaScript syntax and features', 'video', 28, 3, false);

  -- Module 2: Node.js Fundamentals
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course5_id, 'Node.js Fundamentals', 'Server-side JavaScript', 2)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Introduction to Node.js', 'What is Node and why use it?', 'video', 20, 1, false),
    (module_id, 'Building a REST API', 'Create your first API with Express', 'video', 35, 2, false),
    (module_id, 'Database Integration', 'Connecting to MongoDB and PostgreSQL', 'video', 32, 3, false);

  -- Module 3: Building Full-Stack Apps
  INSERT INTO public.modules (id, course_id, title, description, order_index)
  VALUES (gen_random_uuid(), course5_id, 'Building Full-Stack Apps', 'Putting it all together', 3)
  RETURNING id INTO module_id;

  INSERT INTO public.lessons (module_id, title, description, content_type, duration, order_index, is_free)
  VALUES 
    (module_id, 'Authentication & Authorization', 'Securing your applications', 'video', 40, 1, false),
    (module_id, 'Real-time with WebSockets', 'Building real-time features', 'video', 35, 2, false),
    (module_id, 'Deployment and DevOps', 'Deploying your Node.js apps', 'video', 30, 3, false);

  RAISE NOTICE 'Successfully created 5 sample courses with modules and lessons!';
  RAISE NOTICE 'Course IDs: %, %, %, %, %', course1_id, course2_id, course3_id, course4_id, course5_id;

END $$;
