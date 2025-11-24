"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserAuth } from "@/app/context/ContextAuth"
import { getStudentEnrollments } from '@/utils/supabase/courses'
import { HiStar, HiBookOpen, HiUser, HiArrowRight } from 'react-icons/hi'

export default function DashboardPage() {
    const router = useRouter()
    const { session } = UserAuth()
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadEnrollments() {
            if (session?.user?.id) {
                const { data } = await getStudentEnrollments(session.user.id)
                if (data) {
                    setEnrollments(data)
                }
            }
            setLoading(false)
        }
        loadEnrollments()
    }, [session])

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-blue-100">Continue your learning journey</p>
            </div>

            {/* My Courses Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                    <button
                        onClick={() => router.push('/dashboard/courses')}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                    >
                        Browse All Courses
                        <HiArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {enrollments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.map(enrollment => (
                            <div
                                key={enrollment.id}
                                onClick={() => router.push(`/dashboard/courses/${enrollment.course.id}`)}
                                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                            >
                                {/* Thumbnail */}
                                <div className="h-40 bg-gray-100 relative overflow-hidden">
                                    {enrollment.course.thumbnail_url ? (
                                        <img
                                            src={enrollment.course.thumbnail_url}
                                            alt={enrollment.course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                            <HiBookOpen className="w-12 h-12 text-blue-200" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {enrollment.course.title}
                                    </h3>

                                    {/* Instructor */}
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        {enrollment.course.instructor?.avatar_url ? (
                                            <img
                                                src={enrollment.course.instructor.avatar_url}
                                                alt="Instructor"
                                                className="w-5 h-5 rounded-full object-cover mr-2"
                                            />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                                <HiUser className="w-3 h-3 text-gray-400" />
                                            </div>
                                        )}
                                        <span className="truncate">
                                            {enrollment.course.instructor?.first_name} {enrollment.course.instructor?.last_name}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>Progress</span>
                                            <span>{enrollment.progress || 0}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: `${enrollment.progress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HiBookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                        <button
                            onClick={() => router.push('/dashboard/courses')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>

            {/* Recommendations Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiStar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Check back soon for personalized recommendations</p>
                </div>
            </div>
        </div>
    )
}