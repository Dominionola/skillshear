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
            )
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
            instructor:instructor_id (
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

    // Sort modules and lessons by order_index
    if (data && data.modules) {
        data.modules.sort((a, b) => a.order_index - b.order_index)
        data.modules.forEach(module => {
            if (module.lessons) {
                module.lessons.sort((a, b) => a.order_index - b.order_index)
            }
        })
    }

    return { data, error }
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
                instructor:instructor_id (
                    first_name,
                    last_name
                )
            )
        `)
        .eq('user_id', userId)

    return { data, error }
}
