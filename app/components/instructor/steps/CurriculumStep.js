"use client"

import { useState, useEffect } from 'react'
import { getCourse, createModule, createLesson, deleteModule, deleteLesson } from '@/utils/supabase/courses'
import { HiPlus, HiTrash, HiPencil, HiChevronDown, HiChevronRight } from 'react-icons/hi'
import toast from 'react-hot-toast'

// Helper to extract YouTube video ID
function extractYouTubeId(url) {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
}

export default function CurriculumStep({ courseId, onComplete }) {
    const [loading, setLoading] = useState(true)
    const [modules, setModules] = useState([])
    const [newModuleTitle, setNewModuleTitle] = useState('')
    const [isAddingModule, setIsAddingModule] = useState(false)
    const [expandedModules, setExpandedModules] = useState({})

    // State for adding a lesson
    const [addingLessonToModuleId, setAddingLessonToModuleId] = useState(null)
    const [newLessonTitle, setNewLessonTitle] = useState('')
    const [newLessonContentType, setNewLessonContentType] = useState('video')
    const [newLessonUrl, setNewLessonUrl] = useState('')

    useEffect(() => {
        fetchCourseData()
    }, [courseId])

    const fetchCourseData = async () => {
        setLoading(true)
        const { data, error } = await getCourse(courseId)
        if (error) {
            toast.error('Failed to load course data')
        } else {
            setModules(data?.modules || [])
            // Expand all modules by default
            const initialExpanded = {}
            data?.modules?.forEach(m => initialExpanded[m.id] = true)
            setExpandedModules(initialExpanded)
        }
        setLoading(false)
    }

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }))
    }

    const handleAddModule = async (e) => {
        e.preventDefault()
        if (!newModuleTitle.trim()) return

        const orderIndex = modules.length
        const { data, error } = await createModule(courseId, newModuleTitle, orderIndex)

        if (error) {
            toast.error('Failed to create module')
        } else {
            toast.success('Module added')
            setModules([...modules, { ...data, lessons: [] }])
            setNewModuleTitle('')
            setIsAddingModule(false)
            setExpandedModules(prev => ({ ...prev, [data.id]: true }))
        }
    }

    const handleDeleteModule = async (moduleId) => {
        if (!confirm('Are you sure? This will delete all lessons in this module.')) return

        const { error } = await deleteModule(moduleId)
        if (error) {
            toast.error('Failed to delete module')
        } else {
            setModules(modules.filter(m => m.id !== moduleId))
            toast.success('Module deleted')
        }
    }

    const handleAddLesson = async (e, moduleId) => {
        e.preventDefault()
        if (!newLessonTitle.trim()) return

        const module = modules.find(m => m.id === moduleId)
        const orderIndex = module.lessons ? module.lessons.length : 0

        const { data, error } = await createLesson(moduleId, newLessonTitle, orderIndex, newLessonContentType, newLessonUrl)

        if (error) {
            toast.error('Failed to create lesson')
        } else {
            toast.success('Lesson added')

            // Update local state
            const updatedModules = modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: [...(m.lessons || []), data]
                    }
                }
                return m
            })

            setModules(updatedModules)
            setNewLessonTitle('')
            setNewLessonUrl('')
            setAddingLessonToModuleId(null)
        }
    }

    const handleDeleteLesson = async (lessonId, moduleId) => {
        if (!confirm('Delete this lesson?')) return

        const { error } = await deleteLesson(lessonId)
        if (error) {
            toast.error('Failed to delete lesson')
        } else {
            // Update local state
            const updatedModules = modules.map(m => {
                if (m.id === moduleId) {
                    return {
                        ...m,
                        lessons: m.lessons.filter(l => l.id !== lessonId)
                    }
                }
                return m
            })
            setModules(updatedModules)
            toast.success('Lesson deleted')
        }
    }

    if (loading) {
        return <div className="text-center py-12">Loading curriculum...</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Curriculum</h2>
                    <p className="text-gray-500 text-sm">
                        Build your course by creating modules and lessons.
                    </p>
                </div>
                <button
                    onClick={() => setIsAddingModule(true)}
                    className="flex items-center text-purple-600 font-medium hover:text-purple-700"
                >
                    <HiPlus className="w-5 h-5 mr-1" />
                    Add Module
                </button>
            </div>

            {/* Add Module Form */}
            {isAddingModule && (
                <form onSubmit={handleAddModule} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex gap-2">
                    <input
                        type="text"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        placeholder="Enter module title (e.g. Introduction)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAddingModule(false)}
                        className="text-gray-500 px-4 py-2 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {/* Modules List */}
            <div className="space-y-4">
                {modules.length === 0 && !isAddingModule && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500">No modules yet. Click "Add Module" to start.</p>
                    </div>
                )}

                {modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                        {/* Module Header */}
                        <div className="bg-gray-50 p-4 flex items-center justify-between group">
                            <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => toggleModule(module.id)}>
                                {expandedModules[module.id] ? (
                                    <HiChevronDown className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <HiChevronRight className="w-5 h-5 text-gray-400" />
                                )}
                                <h3 className="font-semibold text-gray-900">
                                    Module {module.order_index + 1}: {module.title}
                                </h3>
                                <span className="text-xs text-gray-500 ml-2">
                                    ({module.lessons?.length || 0} lessons)
                                </span>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDeleteModule(module.id)}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                    title="Delete Module"
                                >
                                    <HiTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Lessons List */}
                        {expandedModules[module.id] && (
                            <div className="p-4 space-y-3">
                                {module.lessons?.length === 0 && addingLessonToModuleId !== module.id && (
                                    <p className="text-gray-500 text-sm text-center py-4">No lessons yet. Add one below.</p>
                                )}

                                {module.lessons?.map((lesson) => (
                                    <div key={lesson.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {lesson.order_index + 1}. {lesson.title}
                                                </span>
                                                <span className="text-xs text-gray-500">({lesson.content_type})</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteLesson(lesson.id, module.id)}
                                                    className="text-gray-400 hover:text-red-500 p-1"
                                                    title="Delete Lesson"
                                                >
                                                    <HiTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Video Embed - YouTube or Direct Video */}
                                        {lesson.content_type === 'video' && lesson.content_url && (
                                            <div className="mt-3">
                                                {extractYouTubeId(lesson.content_url) ? (
                                                    // YouTube Embed
                                                    <iframe
                                                        width="100%"
                                                        height="200"
                                                        src={`https://www.youtube.com/embed/${extractYouTubeId(lesson.content_url)}`}
                                                        title={lesson.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    // Direct Video File
                                                    <video
                                                        width="100%"
                                                        height="200"
                                                        controls
                                                        className="rounded-lg"
                                                    >
                                                        <source src={lesson.content_url} type="video/mp4" />
                                                        <source src={lesson.content_url} type="video/webm" />
                                                        <source src={lesson.content_url} type="video/ogg" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Add Lesson Form/Button */}
                                {addingLessonToModuleId === module.id ? (
                                    <form onSubmit={(e) => handleAddLesson(e, module.id)} className="bg-white p-3 rounded-lg border border-gray-200 space-y-2">
                                        <input
                                            type="text"
                                            value={newLessonTitle}
                                            onChange={(e) => setNewLessonTitle(e.target.value)}
                                            placeholder="Enter lesson title"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <select
                                                value={newLessonContentType}
                                                onChange={(e) => setNewLessonContentType(e.target.value)}
                                                className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                <option value="video">Video</option>
                                                <option value="text">Text</option>
                                                <option value="quiz">Quiz</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={newLessonUrl}
                                                onChange={(e) => setNewLessonUrl(e.target.value)}
                                                placeholder="Video URL (YouTube or direct link)"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAddingLessonToModuleId(null)
                                                    setNewLessonTitle('')
                                                    setNewLessonUrl('')
                                                }}
                                                className="text-gray-500 px-3 py-1 hover:text-gray-700 text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 text-sm"
                                            >
                                                Add Lesson
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setAddingLessonToModuleId(module.id)}
                                        className="flex items-center text-purple-600 font-medium hover:text-purple-700 text-sm mt-2"
                                    >
                                        <HiPlus className="w-4 h-4 mr-1" />
                                        Add Lesson
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => onComplete('back')}
                    className="text-gray-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => onComplete('next')}
                    className="bg-purple-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                    Continue to Publish
                </button>
            </div>
        </div>
    )
}
