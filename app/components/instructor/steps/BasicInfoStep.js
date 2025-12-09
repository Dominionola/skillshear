"use client"

import { useState, useEffect } from 'react'
import { createCourse, updateCourse, getCourse, uploadCourseThumbnail } from '@/utils/supabase/courses'
import { HiUpload, HiPhotograph } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function BasicInfoStep({ userId, courseId, onComplete }) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Development',
        level: 'beginner',
        price: '0',
        published: false
    })
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thumbnailPreview, setThumbnailPreview] = useState(null)

    useEffect(() => {
        if (courseId) {
            fetchCourseData()
        }
    }, [courseId])

    const fetchCourseData = async () => {
        setLoading(true)
        const { data, error } = await getCourse(courseId)
        if (data) {
            setFormData({
                title: data.title || '',
                description: data.description || '',
                category: data.category || 'Development',
                level: data.level || 'beginner',
                price: data.price?.toString() || '0',
                published: data.published || false
            })
            if (data.thumbnail_url) {
                setThumbnailPreview(data.thumbnail_url)
            }
        } else {
            toast.error('Failed to fetch course data')
        }
        setLoading(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setThumbnailFile(file)
            setThumbnailPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!formData.title || !formData.description) {
            toast.error('Please fill in all required fields')
            setLoading(false)
            return
        }

        try {
            let course
            const coursePayload = {
                ...formData,
                instructor_id: userId,
                price: parseFloat(formData.price) || 0,
            }

            if (courseId) {
                // Update existing course
                const { data, error } = await updateCourse(courseId, coursePayload)
                if (error) throw error
                course = data
                toast.success('Course updated!')
            } else {
                // Create new course
                const { data, error } = await createCourse(coursePayload)
                if (error) throw error
                course = data
                toast.success('Course draft created!')
            }
            // 2. Upload Thumbnail (if selected)
            if (thumbnailFile && course) {
                const { error: uploadError } = await uploadCourseThumbnail(course.id, thumbnailFile)
                if (uploadError) {
                    toast.error('Course saved but thumbnail upload failed')
                    console.error(uploadError)
                }
            }

            // Move to next step
            onComplete(course)

        } catch (error) {
            console.error('Error saving course:', error)
            toast.error('Failed to save course')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                <p className="text-gray-500 text-sm">
                    Let's start with the basics. You can always change this later.
                </p>
            </div>

            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Advanced React Patterns"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What will students learn in this course?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Development">Development</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>

                {/* Level */}
                <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                        Level
                    </label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Set to 0 for a free course.</p>
            </div>

            {/* Thumbnail */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Thumbnail
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors relative">
                    <div className="space-y-1 text-center">
                        {thumbnailPreview ? (
                            <div className="relative h-48 w-full mx-auto">
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="h-full w-full object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setThumbnailFile(null)
                                        setThumbnailPreview(null)
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <HiUpload className="w-4 h-4 transform rotate-45" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <HiPhotograph className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="thumbnail-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="thumbnail-upload"
                                            name="thumbnail-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Creating...
                        </>
                    ) : (
                        'Save & Continue'
                    )}
                </button>
            </div>
        </form>
    )
}
