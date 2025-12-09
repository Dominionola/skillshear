import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

// Fetch all published courses
export async function getCourses() {
    const { data, error } = await supabase
        .from('courses')
        .select(`
            *,
            profiles!instructor_id (
                first_name,
                last_name,
                avatar_url
            ),
            enrollments(count)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching courses:', error)
        return { data: null, error }
    }

    // Rename profiles to instructor for easier access
    const coursesWithInstructor = data?.map(course => ({
        ...course,
        instructor: course.profiles,
        profiles: undefined
    }))

    return { data: coursesWithInstructor, error: null }
}

// Fetch a single course by ID with modules and lessons
export async function getCourse(courseId) {
    const { data, error } = await supabase
        .from('courses')
        .select(`
            *,
            profiles!instructor_id (
                first_name,
                last_name,
                avatar_url,
                bio
            ),
            modules (
                *,
                lessons (
                    *
                )
            )
        `)
        .eq('id', courseId)
        .single()

    if (error) {
        console.error('Error fetching course:', error)
        return { data: null, error }
    }

    // Sort modules and lessons by order_index
    if (data && data.modules) {
        data.modules.sort((a, b) => a.order_index - b.order_index)
        data.modules.forEach(module => {
            if (module.lessons) {
                module.lessons.sort((a, b) => a.order_index - b.order_index)
            }
        })
    }

    // Rename profiles to instructor for easier access
    const courseWithInstructor = {
        ...data,
        instructor: data.profiles,
        profiles: undefined
    }

    return { data: courseWithInstructor, error: null }
}

// Enroll a user in a course
export async function enrollInCourse(userId, courseId) {
    const { data, error } = await supabase
        .from('enrollments')
        .insert([
            { user_id: userId, course_id: courseId }
        ])
        .select()

    return { data, error }
}

// Check if a user is enrolled in a course
export async function checkEnrollment(userId, courseId) {
    const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single()

    return { data, error }
}

// Fetch all courses a user is enrolled in
export async function getStudentEnrollments(userId) {
    const { data, error } = await supabase
        .from('enrollments')
        .select(`
            *,
            course:course_id (
                *,
                profiles!instructor_id (
                    first_name,
                    last_name,
                    avatar_url
                )
            )
        `)
        .eq('user_id', userId)

    if (error) {
        console.error('Error fetching enrollments:', error)
        return { data: null, error }
    }

    // Transform the data to rename profiles to instructor
    const enrollmentsWithInstructor = data?.map(enrollment => ({
        ...enrollment,
        course: enrollment.course ? {
            ...enrollment.course,
            instructor: enrollment.course.profiles,
            profiles: undefined
        } : null
    }))

    return { data: enrollmentsWithInstructor, error: null }
}

// Check if a lesson is completed by the user
export async function getLessonCompletion(userId, lessonId) {
    const { data, error } = await supabase
        .from('lesson_completions')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single()

    return { completed: !!data, error }
}

// Toggle lesson completion status
export async function toggleLessonCompletion(userId, lessonId, courseId) {
    // First check if already completed
    const { completed } = await getLessonCompletion(userId, lessonId)

    let error = null

    if (completed) {
        // Remove completion
        const { error: deleteError } = await supabase
            .from('lesson_completions')
            .delete()
            .eq('user_id', userId)
            .eq('lesson_id', lessonId)
        error = deleteError
    } else {
        // Add completion
        const { error: insertError } = await supabase
            .from('lesson_completions')
            .insert([
                { user_id: userId, lesson_id: lessonId }
            ])
        error = insertError
    }

    if (error) return { error }

    // Update overall course progress using our database function
    const { data: progress, error: funcError } = await supabase
        .rpc('update_enrollment_progress', {
            p_user_id: userId,
            p_course_id: courseId
        })

    return { progress, completed: !completed, error: funcError }
}

// Create a new course
export async function createCourse(courseData) {
    const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single()

    return { data, error }
}

// Update an existing course
export async function updateCourse(courseId, courseData) {
    const { data, error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', courseId)
        .select()
        .single()

    return { data, error }
}

// Upload course thumbnail to Supabase Storage
export async function uploadCourseThumbnail(courseId, file) {
    // Create a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${courseId}-thumbnail-${Date.now()}.${fileExt}`
    const filePath = `${courseId}/${fileName}`

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('course-thumbnails')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        })

    if (uploadError) {
        return { data: null, error: uploadError }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('course-thumbnails')
        .getPublicUrl(filePath)

    // Update course with thumbnail URL
    const { data, error } = await supabase
        .from('courses')
        .update({ thumbnail_url: publicUrl })
        .eq('id', courseId)
        .select()
        .single()

    return { data, error }
}

// Create a new module
export async function createModule(courseId, title, orderIndex) {
    const { data, error } = await supabase
        .from('modules')
        .insert([{ course_id: courseId, title, order_index: orderIndex }])
        .select()
        .single();
    return { data, error };
}

// Create a new lesson
export async function createLesson(moduleId, title, orderIndex, contentType, contentUrl, description, quizData) {
    const { data, error } = await supabase
        .from('lessons')
        .insert([
            {
                module_id: moduleId,
                title,
                order_index: orderIndex,
                content_type: contentType,
                content_url: contentUrl,
                description,
                quiz_data: quizData
            },
        ])
        .select()
        .single();
    return { data, error };
}

// Delete a module
export async function deleteModule(moduleId) {
    const { data, error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);
    return { data, error };
}

// Delete a lesson
export async function deleteLesson(lessonId) {
    const { data, error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);
    return { data, error };
}

// Publish a course
export async function publishCourse(courseId) {
    const { data, error } = await supabase
        .from('courses')
        .update({ published: true, updated_at: new Date().toISOString() })
        .eq('id', courseId)
        .select()
        .single();
    return { data, error };
}

// Unpublish a course
export async function unpublishCourse(courseId) {
    const { data, error } = await supabase
        .from('courses')
        .update({ published: false, updated_at: new Date().toISOString() })
        .eq('id', courseId)
        .select()
        .single();
    return { data, error };
}
