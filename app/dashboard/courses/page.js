"use client"

import { useState, useEffect } from 'react'
import { getCourses } from '@/utils/supabase/courses'
import CourseCard from '@/app/components/courses/CourseCard'
import { HiSearch, HiFilter } from 'react-icons/hi'

export default function CoursesPage() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterLevel, setFilterLevel] = useState('all')

    useEffect(() => {
        async function loadCourses() {
            const { data, error } = await getCourses()
            if (!error && data) {
                setCourses(data)
            }
            setLoading(false)
        }
        loadCourses()
    }, [])

    // Filter courses
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesLevel = filterLevel === 'all' || course.level === filterLevel

        return matchesSearch && matchesLevel
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Browse Courses</h1>
                    <p className="text-gray-600 mt-1">Discover new skills and advance your career</p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                        />
                    </div>
                    <div className="relative">
                        <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                        >
                            <option value="all">All Levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                    <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setFilterLevel('all') }}
                        className="mt-4 text-blue-600 hover:underline font-medium"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    )
}
