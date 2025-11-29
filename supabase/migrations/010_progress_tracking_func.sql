-- Function to calculate and update enrollment progress
CREATE OR REPLACE FUNCTION public.update_enrollment_progress(
  p_user_id uuid,
  p_course_id uuid
) RETURNS integer AS $$
DECLARE
  v_total_lessons integer;
  v_completed_lessons integer;
  v_progress integer;
BEGIN
  -- Get total number of lessons for the course
  SELECT count(*) INTO v_total_lessons
  FROM public.lessons l
  JOIN public.modules m ON m.id = l.module_id
  WHERE m.course_id = p_course_id;

  -- If no lessons, progress is 0
  IF v_total_lessons = 0 THEN
    v_progress := 0;
  ELSE
    -- Get number of completed lessons for this user and course
    SELECT count(*) INTO v_completed_lessons
    FROM public.lesson_completions lc
    JOIN public.lessons l ON l.id = lc.lesson_id
    JOIN public.modules m ON m.id = l.module_id
    WHERE lc.user_id = p_user_id AND m.course_id = p_course_id;

    -- Calculate progress percentage
    v_progress := (v_completed_lessons::float / v_total_lessons::float * 100)::integer;
  END IF;

  -- Update the enrollment record
  UPDATE public.enrollments
  SET 
    progress = v_progress,
    completed_at = CASE WHEN v_progress = 100 THEN now() ELSE null END
  WHERE user_id = p_user_id AND course_id = p_course_id;

  RETURN v_progress;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
