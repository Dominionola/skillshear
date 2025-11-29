"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserAuth } from "@/app/context/ContextAuth"
import { getStudentEnrollments } from '@/utils/supabase/courses'
import DashboardStats from '@/app/components/dashboard/DashboardStats'
import EnrolledCoursesGrid from '@/app/components/dashboard/EnrolledCoursesGrid'
import { HiStar, HiArrowRight } from 'react-icons/hi'

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
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-blue-100 text-lg">Track your progress and continue learning.</p>
            </div>

            {/* Stats Section */}
            <DashboardStats enrollments={enrollments} />

            {/* My Courses Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                    <button
                        onClick={() => router.push('/dashboard/courses')}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
                    >
                        Browse All Courses
                        <HiArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <EnrolledCoursesGrid enrollments={enrollments} />
            </div>

            {/* Recommendations Section */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended for You</h2>
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiStar className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="text-gray-600">Complete more courses to get personalized recommendations!</p>
                </div>
            </div>
        </div>
    )
}