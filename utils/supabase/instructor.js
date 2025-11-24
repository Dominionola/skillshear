import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

// ==========================================
// INSTRUCTOR COURSE MANAGEMENT
// ==========================================

// Get all courses for an instructor (published + unpublished)
export async function getInstructorCourses(userId) {
    const { data, error } = await supabase
        .from('courses')
        .select(`
            *,
            profiles!instructor_id (
                first_name,
                last_name,
                avatar_url
            ),
            modules (
                id,
                title
            )
        `)
        .eq('instructor_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching instructor courses:', error)
        return { data: null, error }
    }

    // Transform data
    const coursesWithInstructor = data?.map(course => ({
        ...course,
        instructor: course.profiles,
        profiles: undefined,
        moduleCount: course.modules?.length || 0
    }))

    return { data: coursesWithInstructor, error: null }
}

// Create a new course
export async function createCourse(userId, courseData) {
    const { data, error } = await supabase
        .from('courses')
        .insert([{
            instructor_id: userId,
            title: courseData.title,
            description: courseData.description,
            thumbnail_url: courseData.thumbnail_url,
            price: courseData.price || 0,
            level: courseData.level,
            category: courseData.category,
            published: false
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating course:', error)
    }

    return { data, error }
}

// Update a course
export async function updateCourse(courseId, courseData) {
    const { data, error } = await supabase
        .from('courses')
        .update({
            title: courseData.title,
            description: courseData.description,
            thumbnail_url: courseData.thumbnail_url,
            price: courseData.price,
            level: courseData.level,
            category: courseData.category,
            updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .select()
        .single()

    if (error) {
        console.error('Error updating course:', error)
    }

    return { data, error }
}

// Delete a course
export async function deleteCourse(courseId) {
    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)

    if (error) {
        console.error('Error deleting course:', error)
    }

    return { error }
}

// Publish/unpublish a course
export async function toggleCoursePublish(courseId, published) {
    const { data, error } = await supabase
        .from('courses')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', courseId)
        .select()
        .single()

    if (error) {
        console.error('Error toggling course publish status:', error)
    }

    return { data, error }
}

// ==========================================
// MODULE MANAGEMENT
// ==========================================

// Create a module
export async function createModule(courseId, moduleData) {
    const { data, error } = await supabase
        .from('modules')
        .insert([{
            course_id: courseId,
            title: moduleData.title,
            description: moduleData.description,
            order_index: moduleData.order_index
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating module:', error)
    }

    return { data, error }
}

// Update a module
export async function updateModule(moduleId, moduleData) {
    const { data, error } = await supabase
        .from('modules')
        .update({
            title: moduleData.title,
            description: moduleData.description,
            order_index: moduleData.order_index,
            updated_at: new Date().toISOString()
        })
        .eq('id', moduleId)
        .select()
        .single()

    if (error) {
        console.error('Error updating module:', error)
    }

    return { data, error }
}

// Delete a module
export async function deleteModule(moduleId) {
    const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId)

    if (error) {
        console.error('Error deleting module:', error)
    }

    return { error }
}

// ==========================================
// LESSON MANAGEMENT
// ==========================================

// Create a lesson
export async function createLesson(moduleId, lessonData) {
    const { data, error } = await supabase
        .from('lessons')
        .insert([{
            module_id: moduleId,
            title: lessonData.title,
            description: lessonData.description,
            content_type: lessonData.content_type,
            content_url: lessonData.content_url,
            duration: lessonData.duration,
            order_index: lessonData.order_index,
            is_free: lessonData.is_free || false
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating lesson:', error)
    }

    return { data, error }
}

// Update a lesson
export async function updateLesson(lessonId, lessonData) {
    const { data, error } = await supabase
        .from('lessons')
        .update({
            title: lessonData.title,
            description: lessonData.description,
            content_type: lessonData.content_type,
            content_url: lessonData.content_url,
            duration: lessonData.duration,
            order_index: lessonData.order_index,
            is_free: lessonData.is_free,
            updated_at: new Date().toISOString()
        })
        .eq('id', lessonId)
        .select()
        .single()

    if (error) {
        console.error('Error updating lesson:', error)
    }

    return { data, error }
}

// Delete a lesson
export async function deleteLesson(lessonId) {
    const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId)

    if (error) {
        console.error('Error deleting lesson:', error)
    }

    return { error }
}
