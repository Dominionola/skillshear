import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

// Upload course thumbnail
export async function uploadCourseThumbnail(file, courseId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${courseId}-${Date.now()}.${fileExt}`
    const filePath = `${courseId}/${fileName}`

    const { data, error } = await supabase.storage
        .from('course-thumbnails')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        })

    if (error) {
        console.error('Error uploading thumbnail:', error)
        return { data: null, error }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('course-thumbnails')
        .getPublicUrl(filePath)

    return { data: { path: filePath, url: publicUrl }, error: null }
}

// Upload lesson content (video, etc.)
export async function uploadLessonContent(file, lessonId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${lessonId}-${Date.now()}.${fileExt}`
    const filePath = `${lessonId}/${fileName}`

    const { data, error } = await supabase.storage
        .from('lesson-content')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        })

    if (error) {
        console.error('Error uploading lesson content:', error)
        return { data: null, error }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('lesson-content')
        .getPublicUrl(filePath)

    return { data: { path: filePath, url: publicUrl }, error: null }
}

// Delete a file from storage
export async function deleteFile(bucket, path) {
    const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

    if (error) {
        console.error('Error deleting file:', error)
    }

    return { error }
}
