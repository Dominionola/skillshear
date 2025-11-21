"use client"

import { HiBookOpen } from 'react-icons/hi'

export default function CoursesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <p className="text-gray-600 mt-1">View and manage your enrolled courses</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiBookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h2>
                    <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet. Start learning today!</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Browse Courses
                    </button>
                </div>
            </div>
        </div>
    )
}
