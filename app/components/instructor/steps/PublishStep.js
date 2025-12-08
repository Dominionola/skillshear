"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCourse, publishCourse } from '@/utils/supabase/courses'
import toast from 'react-hot-toast'
import { HiCheck, HiX, HiBookOpen, HiCollection, HiPlay, HiArrowLeft } from 'react-icons/hi'

export default function PublishStep({ courseId, onComplete }) {
    const router = useRouter()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [publishing, setPublishing] = useState(false)

    useEffect(() => {
        async function fetchCourse() {
            if (!courseId) return
            setLoading(true)
            const { data, error } = await getCourse(courseId)
            if (error) {
                toast.error('Failed to load course details')
                console.error(error)
            } else {
                setCourse(data)
            }
            setLoading(false)
        }
        fetchCourse()
    }, [courseId])

    const handlePublish = async () => {
        setPublishing(true)
        const toastId = toast.loading('Publishing course...')

        const { data, error } = await publishCourse(courseId)

        if (error) {
            toast.error('Failed to publish course', { id: toastId })
            console.error(error)
        } else {
            toast.success('Course published successfully!', { id: toastId })
            router.push('/instructor')
        }
        setPublishing(false)
    }

    // Validation checks
    const hasTitle = course?.title?.trim().length > 0
    const hasDescription = course?.description?.trim().length > 0
    const hasModules = course?.modules?.length > 0
    const hasLessons = course?.modules?.some(m => m.lessons?.length > 0)
    const allChecksPass = hasTitle && hasDescription && hasModules && hasLessons

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Course not found.</p>
            </div>
        )
    }

    const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Review & Publish</h2>
                <p className="text-gray-500 mt-1">Review your course details before publishing.</p>
            </div>

            {/* Course Summary Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-6">
                    {course.thumbnail_url ? (
                        <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-32 h-20 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <HiBookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                    )}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{course.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <HiCollection className="w-4 h-4" />
                                {course.modules?.length || 0} Modules
                            </span>
                            <span className="flex items-center gap-1">
                                <HiPlay className="w-4 h-4" />
                                {totalLessons} Lessons
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                {course.level || 'Beginner'}
                            </span>
                            <span className="font-semibold text-green-600">
                                {course.price > 0 ? `$${course.price}` : 'Free'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Validation Checklist */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Publishing Checklist</h4>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                        {hasTitle ? (
                            <HiCheck className="w-5 h-5 text-green-500" />
                        ) : (
                            <HiX className="w-5 h-5 text-red-500" />
                        )}
                        <span className={hasTitle ? 'text-gray-700' : 'text-red-600'}>
                            Course has a title
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        {hasDescription ? (
                            <HiCheck className="w-5 h-5 text-green-500" />
                        ) : (
                            <HiX className="w-5 h-5 text-red-500" />
                        )}
                        <span className={hasDescription ? 'text-gray-700' : 'text-red-600'}>
                            Course has a description
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        {hasModules ? (
                            <HiCheck className="w-5 h-5 text-green-500" />
                        ) : (
                            <HiX className="w-5 h-5 text-red-500" />
                        )}
                        <span className={hasModules ? 'text-gray-700' : 'text-red-600'}>
                            At least one module added
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        {hasLessons ? (
                            <HiCheck className="w-5 h-5 text-green-500" />
                        ) : (
                            <HiX className="w-5 h-5 text-red-500" />
                        )}
                        <span className={hasLessons ? 'text-gray-700' : 'text-red-600'}>
                            At least one lesson added
                        </span>
                    </li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={() => onComplete('back')}
                    className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
                >
                    <HiArrowLeft className="w-5 h-5 mr-1" />
                    Back to Curriculum
                </button>

                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={!allChecksPass || publishing}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {publishing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                            Publishing...
                        </>
                    ) : (
                        'Publish Course'
                    )}
                </button>
            </div>
        </div>
    )
}
