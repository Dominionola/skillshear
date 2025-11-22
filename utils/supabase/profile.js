import { createClient } from './client'

/**
 * Get user profile from Supabase
 * @param {string} userId - The user's ID
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function getProfile(userId) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    return { data, error }
}

/**
 * Update user profile in Supabase
 * @param {string} userId - The user's ID
 * @param {object} profileData - The profile data to update
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function updateProfile(userId, profileData) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            ...profileData,
            updated_at: new Date().toISOString()
        })
        .select()
        .single()

    return { data, error }
}

/**
 * Create user profile in Supabase
 * @param {string} userId - The user's ID
 * @param {object} profileData - The initial profile data
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function createProfile(userId, profileData) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('profiles')
        .insert({
            id: userId,
            ...profileData
        })
        .select()
        .single()

    return { data, error }
}

/**
 * Upload avatar to Supabase Storage
 * @param {string} userId - The user's ID
 * @param {File} file - The avatar file
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function uploadAvatar(userId, file) {
    const supabase = createClient()

    // Create a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        })

    if (uploadError) {
        return { data: null, error: uploadError }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

    // Update profile with avatar URL
    const { data, error } = await updateProfile(userId, { avatar_url: publicUrl })

    return { data: { ...data, avatar_url: publicUrl }, error }
}
