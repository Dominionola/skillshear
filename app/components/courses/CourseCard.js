"use client"

import { HiUser, HiClock, HiBookOpen } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

export default function CourseCard({ course }) {
    const router = useRouter()

    const {
        id,
        title,
        description,
        thumbnail_url,
        level,
        instructor,
        price
    } = course

    const instructorName = instructor
        ? `${instructor.first_name || ''} ${instructor.last_name || ''}`.trim() || 'Unknown Instructor'
        : 'Unknown Instructor'

    return (
        <div
            onClick={() => router.push(`/dashboard/courses/${id}`)}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            {/* Thumbnail */}
            <div className="h-48 bg-gray-200 relative overflow-hidden">
                {thumbnail_url ? (
                    <img
                        src={thumbnail_url}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50">
                        <HiBookOpen className="w-12 h-12 text-blue-200" />
                    </div>
                )}

                {/* Level Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`
                        px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${level === 'beginner' ? 'bg-green-100 text-green-700' :
                            level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'}
                    `}>
                        {level}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {description || 'No description available.'}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        {instructor?.avatar_url ? (
                            <img
                                src={instructor.avatar_url}
                                alt={instructorName}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <HiUser className="w-3 h-3 text-gray-400" />
                            </div>
                        )}
                        <span className="truncate max-w-[100px]">{instructorName}</span>
                    </div>

                    <div className="font-semibold text-gray-900">
                        {price > 0 ? `$${price}` : 'Free'}
                    </div>
                </div>
            </div>
        </div>
    )
}
