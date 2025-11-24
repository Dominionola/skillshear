"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserAuth } from "@/app/context/ContextAuth"
import { getInstructorCourses } from '@/utils/supabase/instructor'
import { HiPlus, HiBookOpen, HiEye, HiPencil, HiUsers } from 'react-icons/hi'

export default function InstructorDashboard() {
    const router = useRouter()
    const { session } = UserAuth()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadCourses() {
            if (session?.user?.id) {
                const { data } = await getInstructorCourses(session.user.id)
                if (data) {
                    setCourses(data)
                }
            }
            setLoading(false)
        }
        loadCourses()
    }, [session])

    const publishedCourses = courses.filter(c => c.published)
    const draftCourses = courses.filter(c => !c.published)

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage your courses and content</p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/instructor/courses/new')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <HiPlus className="w-5 h-5" />
                    Create New Course
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Courses</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{courses.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <HiBookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Published</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{publishedCourses.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <HiEye className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm">Total Students</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <HiUsers className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Published Courses */}
            {publishedCourses.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Published Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {publishedCourses.map(course => (
                            <CourseCard key={course.id} course={course} router={router} />
                        ))}
                    </div>
                </div>
            )}

            {/* Draft Courses */}
            {draftCourses.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Drafts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {draftCourses.map(course => (
                            <CourseCard key={course.id} course={course} router={router} />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {courses.length === 0 && (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiBookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
                    <p className="text-gray-600 mb-4">Create your first course to get started</p>
                    <button
                        onClick={() => router.push('/dashboard/instructor/courses/new')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        <HiPlus className="w-5 h-5" />
                        Create Course
                    </button>
                </div>
            )}
        </div>
    )
}

function CourseCard({ course, router }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group">
            {/* Thumbnail */}
            <div className="h-32 bg-gray-100 relative">
                {course.thumbnail_url ? (
                    <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50">
                        <HiBookOpen className="w-10 h-10 text-blue-200" />
                    </div>
                )}
                {!course.published && (
                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                        Draft
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.moduleCount} modules</p>

                <button
                    onClick={() => router.push(`/dashboard/instructor/courses/${course.id}/edit`)}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                    <HiPencil className="w-4 h-4" />
                    Edit Course
                </button>
            </div>
        </div>
    )
}
