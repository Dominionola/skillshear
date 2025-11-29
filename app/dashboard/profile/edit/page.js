"use client"

import { useState, useEffect } from 'react'
import { UserAuth } from "@/app/context/ContextAuth"
import { useRouter } from "next/navigation"
import { getProfile, updateProfile, uploadAvatar, uploadBanner } from '@/utils/supabase/profile'
import { HiCamera, HiSave, HiAdjustments } from 'react-icons/hi'
import BannerRepositioner from '@/app/components/BannerRepositioner'

export default function EditProfilePage() {
    const { session } = UserAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [showRepositioner, setShowRepositioner] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        bio: '',
        website: '',
        twitter: '',
        linkedin: '',
        avatar_url: '',
        banner_url: '',
        banner_position: 50
    })

    useEffect(() => {
        async function loadProfile() {
            if (session?.user?.id) {
                const { data, error } = await getProfile(session.user.id)
                if (data) {
                    setFormData({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        bio: data.bio || '',
                        website: data.website || '',
                        twitter: data.twitter || '',
                        linkedin: data.linkedin || '',
                        avatar_url: data.avatar_url || '',
                        banner_url: data.banner_url || '',
                        banner_position: data.banner_position || 50
                    })
                }
                setLoading(false)
            }
        }
        loadProfile()
    }, [session])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleAvatarChange = async (e) => {
        if (!e.target.files || e.target.files.length === 0) return

        const file = e.target.files[0]
        setSaving(true)
        setMessage({ type: 'info', text: 'Uploading avatar...' })

        try {
            const { data, error } = await uploadAvatar(session.user.id, file)
            if (error) throw error

            setFormData(prev => ({ ...prev, avatar_url: data.avatar_url }))
            setMessage({ type: 'success', text: 'Avatar updated successfully!' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Error uploading avatar: ' + error.message })
        } finally {
            setSaving(false)
        }
    }

    const handleBannerChange = async (e) => {
        if (!e.target.files || e.target.files.length === 0) return

        const file = e.target.files[0]
        setSaving(true)
        setMessage({ type: 'info', text: 'Uploading banner...' })

        try {
            const { data, error } = await uploadBanner(session.user.id, file)
            if (error) throw error

            setFormData(prev => ({ ...prev, banner_url: data.banner_url }))
            setMessage({ type: 'success', text: 'Banner updated successfully!' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Error uploading banner: ' + error.message })
        } finally {
            setSaving(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ type: 'info', text: 'Saving profile...' })

        try {
            const { error } = await updateProfile(session.user.id, formData)
            if (error) throw error

            setMessage({ type: 'success', text: 'Profile updated successfully!' })
            setTimeout(() => router.push('/dashboard/profile'), 1500)
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating profile: ' + error.message })
            setSaving(false)
        }
    }

    const handleSavePosition = async (position) => {
        setSaving(true)
        setMessage({ type: 'info', text: 'Saving banner position...' })

        try {
            const { error } = await updateProfile(session.user.id, { banner_position: position })
            if (error) throw error

            setFormData(prev => ({ ...prev, banner_position: position }))
            setShowRepositioner(false)
            setMessage({ type: 'success', text: 'Banner position updated!' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving position: ' + error.message })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="p-6 text-center">Loading profile...</div>
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                <button
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-gray-900"
                >
                    Cancel
                </button>
            </div>

            {message.text && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' :
                    message.type === 'error' ? 'bg-red-50 text-red-700' :
                        'bg-blue-50 text-blue-700'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Banner Upload */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Banner</h2>
                    <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group">
                        {formData.banner_url ? (
                            <img
                                src={formData.banner_url}
                                alt="Banner"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: `center ${formData.banner_position}%` }}
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                <HiCamera className="w-8 h-8 mx-auto mb-2" />
                                <p>Click to upload banner</p>
                                <p className="text-xs mt-1">Best: 1500x500px (Twitter/X size)</p>
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all cursor-pointer">
                            <div className="text-white opacity-0 group-hover:opacity-100 font-medium flex items-center space-x-2">
                                <HiCamera className="w-5 h-5" />
                                <span>Change Banner</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="hidden"
                                disabled={saving}
                            />
                        </label>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500 space-y-1">
                            <p><strong>Recommended:</strong> 1500x500px</p>
                            <p className="text-xs">• Supported formats: JPG, PNG, or GIF</p>
                            <p className="text-xs">• Maximum file size: 5MB</p>
                        </div>
                        {formData.banner_url && (
                            <button
                                type="button"
                                onClick={() => setShowRepositioner(true)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            >
                                <HiAdjustments className="w-4 h-4" />
                                <span>Reposition Banner</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Avatar Upload */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
                    <div className="flex items-center space-x-6">
                        <div className="relative w-24 h-24">
                            {formData.avatar_url ? (
                                <img
                                    src={formData.avatar_url}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-2 border-blue-200">
                                    {formData.first_name?.[0] || session?.user?.email?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                                <HiCamera className="w-4 h-4 text-gray-600" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    disabled={saving}
                                />
                            </label>
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>Recommended: Square JPG, PNG, or GIF.</p>
                            <p>Max size: 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Username</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">@</span>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="username"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <HiSave className="w-5 h-5" />
                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </form>

            {/* Banner Repositioner Modal */}
            {showRepositioner && formData.banner_url && (
                <BannerRepositioner
                    imageUrl={formData.banner_url}
                    currentPosition={formData.banner_position}
                    onSave={handleSavePosition}
                    onClose={() => setShowRepositioner(false)}
                />
            )}
        </div>
    )
}
