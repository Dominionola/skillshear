# Sample Course Data Migration Instructions

## Quick Start

You have two options to add the sample course data:

### Option 1: Using Supabase Dashboard (Recommended)

1. **Open your Supabase project dashboard** at [https://supabase.com/dashboard](https://supabase.com/dashboard)

2. **Navigate to SQL Editor**:
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and paste the migration**:
   - Open the file: `supabase/migrations/007_sample_course_data.sql`
   - Copy the entire contents
   - Paste into the SQL Editor

4. **Run the migration**:
   - Click "Run" or press `Ctrl+Enter`
   - You should see a success message with the course IDs

5. **Verify**:
   - Refresh your course listing page at `http://localhost:3000/dashboard/courses`
   - You should see 5 new courses!

### Option 2: Using Supabase CLI

If you have Supabase CLI configured locally:

```bash
# Apply all pending migrations
npx supabase db push

# Or reset the database (WARNING: This will delete all data)
npx supabase db reset
```

## What Gets Created

The migration creates **5 sample courses**:

1. **Web Development Fundamentals** (Free, Beginner)
   - 3 modules: HTML Basics, CSS Styling, JavaScript Basics
   - 9 lessons total

2. **React for Beginners** ($49.99, Intermediate)
   - 2 modules: Getting Started, React Components
   - 6 lessons total

3. **Python Programming Masterclass** ($79.99, Beginner)
   - 2 modules: Python Fundamentals, Data Structures
   - 7 lessons total

4. **UI/UX Design Principles** ($39.99, Beginner)
   - 2 modules: Design Fundamentals, User Research
   - 6 lessons total

5. **Advanced JavaScript & Node.js** ($89.99, Advanced)
   - 3 modules: Advanced JS Concepts, Node.js Fundamentals, Full-Stack Apps
   - 9 lessons total

## Notes

- The migration automatically uses the first user in your `profiles` table as the instructor
- If no users exist, the migration will exit gracefully with a notice
- All courses are marked as `published = true` so they appear immediately
- Some lessons are marked as `is_free = true` for preview functionality

## Troubleshooting

**Error: "No users found in profiles table"**
- Make sure you have at least one user account created
- Sign up at `http://localhost:3000/auth/signup` first

**Courses not appearing**
- Check that the migration ran successfully
- Verify courses exist: Go to Supabase Dashboard → Table Editor → courses
- Check browser console for any errors
