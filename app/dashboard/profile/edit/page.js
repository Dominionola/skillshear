"use client"

import { useState, useEffect } from 'react'
import { UserAuth } from "@/app/context/ContextAuth"
import { useRouter } from "next/navigation"
import { HiArrowLeft, HiCamera } from 'react-icons/hi'
import { getProfile, updateProfile, createProfile } from '@/utils/supabase/profile'

export default function EditProfilePage() {
    const { session } = UserAuth()
    const router = useRouter()

    // Initialize form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        website: '',
        twitter: '',
        linkedin: '',
    })

    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    // Load existing profile data
    useEffect(() => {
        async function loadProfile() {
            if (session?.user?.id) {
                const { data, error } = await getProfile(session.user.id)

                if (!error && data) {
                    setFormData({
                        firstName: data.first_name || session?.user?.user_metadata?.first_name || '',
                        lastName: data.last_name || session?.user?.user_metadata?.last_name || '',
                        bio: data.bio || '',
                        website: data.website || '',
                        twitter: data.twitter || '',
                        linkedin: data.linkedin || '',
                    })
                } else {
                    // No profile yet, use metadata
                    setFormData({
                        firstName: session?.user?.user_metadata?.first_name || '',
                        lastName: session?.user?.user_metadata?.last_name || '',
                        bio: '',
                        website: '',
                        twitter: '',
                        linkedin: '',
                    })
                }
                setIsLoading(false)
            }
        }
        loadProfile()
    }, [session])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        setError(null)
        setSuccess(false)

        try {
            const profileData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                bio: formData.bio,
                website: formData.website,
                twitter: formData.twitter,
                linkedin: formData.linkedin,
            }

            // Try to update first
            const { data, error: updateError } = await updateProfile(session.user.id, profileData)

            // If update fails because profile doesn't exist, create it
            if (updateError && updateError.code === 'PGRST116') {
                const { error: createError } = await createProfile(session.user.id, profileData)
                if (createError) {
                    throw createError
                }
            } else if (updateError) {
                throw updateError
            }

            setSuccess(true)
            setTimeout(() => {
                router.push('/dashboard/profile')
            }, 1000)
        } catch (err) {
            console.error('Error saving profile:', err)
            setError('Failed to save profile. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/profile')
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-600">Loading...</div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleCancel}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <HiArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Profile updated successfully! Redirecting...
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Upload */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">
                                {formData.firstName.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <HiCamera className="w-5 h-5" />
                            <span>Change Avatar</span>
                        </button>
                        <p className="text-sm text-gray-500">Coming soon!</p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                placeholder="https://yourwebsite.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Twitter
                            </label>
                            <input
                                type="text"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                placeholder="@username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                LinkedIn
                            </label>
                            <input
                                type="text"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                                placeholder="linkedin.com/in/username"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}
