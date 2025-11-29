"use client"

import { useState, useEffect } from 'react'
import { UserAuth } from "@/app/context/ContextAuth"
import { useRouter } from "next/navigation"
import { HiPencil, HiStar, HiBadgeCheck, HiCalendar, HiMail } from 'react-icons/hi'
import { getProfile } from '@/utils/supabase/profile'

export default function ProfilePage() {
    const { session } = UserAuth()
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [daysActive, setDaysActive] = useState(0)

    // Get user data
    const firstName = session?.user?.user_metadata?.first_name || ''
    const lastName = session?.user?.user_metadata?.last_name || ''
    const userName = firstName || session?.user?.email?.split('@')[0] || 'User'
    const userEmail = session?.user?.email
    const joinDate = new Date(session?.user?.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })

    // Load profile data and calculate stats
    useEffect(() => {
        async function loadProfile() {
            if (session?.user?.id) {
                const { data, error } = await getProfile(session.user.id)
                if (!error && data) {
                    setProfile(data)
                }

                // Calculate days active
                if (session?.user?.created_at) {
                    const created = new Date(session.user.created_at)
                    const now = new Date()
                    const diffTime = Math.abs(now - created)
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                    setDaysActive(diffDays)
                }

                setLoading(false)
            }
        }
        loadProfile()
    }, [session])

    // Stats with real data where available
    const userStats = [
        { icon: HiStar, label: 'Total Points', value: '0', color: 'text-yellow-500' }, // Placeholder until gamification
        { icon: HiBadgeCheck, label: 'Achievements', value: '0', color: 'text-blue-600' }, // Placeholder until gamification
        { icon: HiCalendar, label: 'Days Active', value: daysActive.toString(), color: 'text-green-600' },
    ]

    if (loading) {
        return <div className="p-6 text-center">Loading profile...</div>
    }

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                {/* Cover Image */}
                <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                    {profile?.banner_url && (
                        <img
                            src={profile.banner_url}
                            alt="Profile Banner"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: `center ${profile.banner_position || 50}%` }}
                        />
                    )}
                </div>

                {/* Profile Info */}
                <div className="px-6 pb-6">
                    {/* Avatar */}
                    <div className="flex items-end justify-between -mt-16 mb-4">
                        <div className="relative">
                            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-bold text-4xl">
                                        {userName.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            {/* Level badge */}
                            <div className="absolute bottom-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">
                                Level 1
                            </div>
                        </div>

                        {/* Edit button */}
                        <button
                            onClick={() => router.push('/dashboard/profile/edit')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <HiPencil className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    {/* Name and bio */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {profile?.first_name && profile?.last_name
                                ? `${profile.first_name} ${profile.last_name}`
                                : firstName && lastName
                                    ? `${firstName} ${lastName}`
                                    : userName}
                        </h1>
                        <div className="flex items-center space-x-2 text-gray-600 text-sm mb-3">
                            <HiMail className="w-4 h-4" />
                            <span>{userEmail}</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            {profile?.bio || "No bio yet. Click \"Edit Profile\" to add one!"}
                        </p>
                    </div>

                    {/* Social links */}
                    {(profile?.website || profile?.twitter || profile?.linkedin) && (
                        <div className="flex items-center space-x-4 text-sm mb-4">
                            {profile?.website && (
                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Website
                                </a>
                            )}
                            {profile?.twitter && (
                                <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Twitter
                                </a>
                            )}
                            {profile?.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    )}

                    {/* Join date */}
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <HiCalendar className="w-4 h-4" />
                        <span>Joined {joinDate}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiBadgeCheck className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">No achievements yet. Start learning to earn badges!</p>
                </div>
            </div>

            {/* Activity History */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiCalendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">No recent activity to show</p>
                </div>
            </div>
        </div>
    )
}
