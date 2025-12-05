"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from "@/utils/supabase/client"
import { HiPlus, HiPencil, HiEye } from 'react-icons/hi'

export default function CourseList({ userId }) {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchInstructorCourses() {
            if (!userId) return

            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('instructor_id', userId)
                .order('created_at', { ascending: false })

            if (data) {
                setCourses(data)
            }
            setLoading(false)
        }

        fetchInstructorCourses()
    }, [userId])

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Courses</h2>
                <Link
                    href="/instructor/courses/new"
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <HiPlus className="w-5 h-5 mr-2" />
                    Create New Course
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiPlus className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Create your first course</h3>
                    <p className="text-gray-500 mb-6">Share your knowledge with the world.</p>
                    <Link
                        href="/instructor/courses/new"
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Start Creating
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-40 bg-gray-100 relative">
                                {course.thumbnail_url ? (
                                    <img
                                        src={course.thumbnail_url}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                        No Thumbnail
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <span className={`
                                        px-2 py-1 rounded-full text-xs font-bold
                                        ${course.published
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'}
                                    `}>
                                        {course.published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                                    {course.title}
                                </h3>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/dashboard/courses/${course.id}`}
                                        className="text-gray-500 hover:text-gray-900 flex items-center text-sm"
                                    >
                                        <HiEye className="w-4 h-4 mr-1" />
                                        Preview
                                    </Link>
                                    <Link
                                        href={`/instructor/courses/${course.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                                    >
                                        <HiPencil className="w-4 h-4 mr-1" />
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
