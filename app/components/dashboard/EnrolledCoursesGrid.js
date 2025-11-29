"use client"

import Link from 'next/link'
import { HiPlay, HiCheckCircle } from 'react-icons/hi'

export default function EnrolledCoursesGrid({ enrollments }) {
    if (!enrollments || enrollments.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiPlay className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Learning Today</h3>
                <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
                <Link
                    href="/dashboard/courses"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    Browse Courses
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
                const course = enrollment.course
                if (!course) return null

                return (
                    <div key={enrollment.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                        {/* Thumbnail */}
                        <div className="h-40 bg-gray-100 relative">
                            {course.thumbnail_url ? (
                                <img
                                    src={course.thumbnail_url}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                                    <HiPlay className="w-12 h-12" />
                                </div>
                            )}

                            {/* Progress Badge */}
                            <div className="absolute top-3 right-3">
                                {enrollment.progress === 100 ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                        <HiCheckCircle className="w-3 h-3 mr-1" />
                                        Completed
                                    </span>
                                ) : (
                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {enrollment.progress}% Complete
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                                {course.title}
                            </h3>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                <div
                                    className={`h-2 rounded-full ${enrollment.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                                    style={{ width: `${enrollment.progress}%` }}
                                ></div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center">
                                    {course.instructor?.avatar_url ? (
                                        <img
                                            src={course.instructor.avatar_url}
                                            alt="Instructor"
                                            className="w-6 h-6 rounded-full object-cover mr-2"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                                    )}
                                    <span className="text-xs text-gray-500 truncate max-w-[100px]">
                                        {course.instructor?.first_name} {course.instructor?.last_name}
                                    </span>
                                </div>

                                <Link
                                    href={`/dashboard/courses/${course.id}`}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    {enrollment.progress === 0 ? 'Start Course' : 'Continue'} &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
