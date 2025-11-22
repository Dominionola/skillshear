"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UserAuth } from "@/app/context/ContextAuth"
import { getCourse, enrollInCourse, checkEnrollment } from '@/utils/supabase/courses'
import { HiArrowLeft, HiBookOpen, HiCheckCircle, HiLockClosed, HiPlay, HiUser, HiClock } from 'react-icons/hi'

export default function CourseDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const { session } = UserAuth()

    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [enrolled, setEnrolled] = useState(false)
    const [enrolling, setEnrolling] = useState(false)

    useEffect(() => {
        async function loadCourseData() {
            if (id) {
                // Fetch course details
                const { data: courseData, error: courseError } = await getCourse(id)
                if (courseData) {
                    setCourse(courseData)
                }

                // Check enrollment if user is logged in
                if (session?.user?.id) {
                    const { data: enrollmentData } = await checkEnrollment(session.user.id, id)
                    if (enrollmentData) {
                        setEnrolled(true)
                    }
                }

                setLoading(false)
            }
        }
        loadCourseData()
    }, [id, session])

    const handleEnroll = async () => {
        if (!session) {
            router.push('/auth/signin')
            return
        }

        setEnrolling(true)
        const { error } = await enrollInCourse(session.user.id, id)

        if (!error) {
            setEnrolled(true)
            // Optional: Show success message or redirect to first lesson
        }
        setEnrolling(false)
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900">Course not found</h2>
                <button
                    onClick={() => router.back()}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Go back
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header / Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
                <HiArrowLeft className="w-5 h-5 mr-2" />
                Back to Courses
            </button>

            {/* Course Hero Section */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Thumbnail */}
                    <div className="lg:col-span-1 h-64 lg:h-auto bg-gray-100 relative">
                        {course.thumbnail_url ? (
                            <img
                                src={course.thumbnail_url}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                <HiBookOpen className="w-20 h-20 text-blue-200" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <span className={`
                                    px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                    ${course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'}
                                `}>
                                    {course.level}
                                </span>
                                <span className="text-gray-500 text-sm flex items-center">
                                    <HiClock className="w-4 h-4 mr-1" />
                                    {course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0} Lessons
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                            <p className="text-gray-600 mb-6">{course.description}</p>

                            <div className="flex items-center space-x-3 mb-6">
                                {course.instructor?.avatar_url ? (
                                    <img
                                        src={course.instructor.avatar_url}
                                        alt="Instructor"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <HiUser className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-500">Instructor</p>
                                    <p className="font-medium text-gray-900">
                                        {course.instructor?.first_name} {course.instructor?.last_name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                            <div className="text-2xl font-bold text-gray-900">
                                {course.price > 0 ? `$${course.price}` : 'Free'}
                            </div>

                            {enrolled ? (
                                <button
                                    disabled
                                    className="bg-green-100 text-green-700 px-8 py-3 rounded-xl font-semibold flex items-center cursor-default"
                                >
                                    <HiCheckCircle className="w-5 h-5 mr-2" />
                                    Enrolled
                                </button>
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>

                {course.modules && course.modules.length > 0 ? (
                    <div className="space-y-6">
                        {course.modules.map((module, index) => (
                            <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <h3 className="font-bold text-gray-900">
                                        Module {index + 1}: {module.title}
                                    </h3>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {module.lessons && module.lessons.map((lesson, lIndex) => (
                                        <div key={lesson.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                                                    {lIndex + 1}
                                                </div>
                                                <div>
                                                    <p className="text-gray-900 font-medium">{lesson.title}</p>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{lesson.content_type}</p>
                                                </div>
                                            </div>

                                            {enrolled || lesson.is_free ? (
                                                <HiPlay className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <HiLockClosed className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No modules available for this course yet.
                    </div>
                )}
            </div>
        </div>
    )
}
