"use client"

import { useState, useEffect } from 'react'
import { getCourse, createModule, createLesson, deleteModule, deleteLesson } from '@/utils/supabase/courses'
import { HiPlus, HiTrash, HiPencil, HiChevronDown, HiChevronRight, HiCheck, HiX } from 'react-icons/hi'
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
    const [newLessonDescription, setNewLessonDescription] = useState('')

    // Quiz Builder State
    const [quizQuestions, setQuizQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentOptions, setCurrentOptions] = useState(['', '', '', ''])
    const [correctOptionIndex, setCorrectOptionIndex] = useState(0)

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

    const handleAddQuestionToQuiz = () => {
        if (!currentQuestion.trim()) {
            toast.error('Please enter a question')
            return
        }
        if (currentOptions.some(opt => !opt.trim())) {
            toast.error('Please fill in all options')
            return
        }

        const newQuestion = {
            id: Date.now(),
            question: currentQuestion,
            options: currentOptions,
            correctAnswer: correctOptionIndex
        }

        setQuizQuestions([...quizQuestions, newQuestion])
        setCurrentQuestion('')
        setCurrentOptions(['', '', '', ''])
        setCorrectOptionIndex(0)
    }

    const removeQuestion = (id) => {
        setQuizQuestions(quizQuestions.filter(q => q.id !== id))
    }

    const handleAddLesson = async (e, moduleId) => {
        e.preventDefault()
        if (!newLessonTitle.trim()) return

        // Quiz Validation
        if (newLessonContentType === 'quiz' && quizQuestions.length === 0) {
            toast.error('Please add at least one question to the quiz')
            return
        }

        const module = modules.find(m => m.id === moduleId)
        const orderIndex = module.lessons ? module.lessons.length : 0

        const quizData = newLessonContentType === 'quiz' ? quizQuestions : null

        // Pass quizData to createLesson
        const { data, error } = await createLesson(
            moduleId,
            newLessonTitle,
            orderIndex,
            newLessonContentType,
            newLessonUrl,
            newLessonDescription,
            quizData
        )

        if (error) {
            console.error('Create Lesson Error:', error)
            toast.error(`Failed to create lesson: ${error.message}`)
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
            // Reset form
            setNewLessonTitle('')
            setNewLessonUrl('')
            setNewLessonDescription('')
            setQuizQuestions([])
            setCurrentQuestion('')
            setCurrentOptions(['', '', '', ''])
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
                    className="flex items-center text-blue-600 font-medium hover:text-blue-700"
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
                        className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${lesson.content_type === 'quiz' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {lesson.content_type.toUpperCase()}
                                                </span>
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

                                        {/* Video Content */}
                                        {lesson.content_type === 'video' && lesson.content_url && (
                                            <div className="mt-3">
                                                {extractYouTubeId(lesson.content_url) ? (
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
                                                    <video
                                                        width="100%"
                                                        height="200"
                                                        controls
                                                        className="rounded-lg"
                                                    >
                                                        <source src={lesson.content_url} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        )}

                                        {/* Quiz Preview */}
                                        {lesson.content_type === 'quiz' && lesson.quiz_data && (
                                            <div className="mt-3 pl-4 border-l-2 border-purple-200 space-y-2">
                                                <p className="text-sm text-gray-600 italic">
                                                    {lesson.quiz_data.length} Question{lesson.quiz_data.length !== 1 ? 's' : ''}
                                                </p>
                                                {lesson.quiz_data.slice(0, 1).map((q, idx) => (
                                                    <div key={idx} className="text-sm">
                                                        <p className="font-medium text-gray-800">Q1: {q.question}</p>
                                                        <p className="text-gray-500 text-xs ml-2">• {q.options.length} options</p>
                                                    </div>
                                                ))}
                                                {lesson.quiz_data.length > 1 && (
                                                    <p className="text-xs text-gray-400">...and {lesson.quiz_data.length - 1} more</p>
                                                )}
                                            </div>
                                        )}

                                        {lesson.description && (
                                            <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded border border-gray-100">
                                                <p className="font-semibold text-gray-800 mb-1">Keynotes / Summary:</p>
                                                {lesson.description}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Add Lesson Form/Button */}
                                {addingLessonToModuleId === module.id ? (
                                    <form onSubmit={(e) => handleAddLesson(e, module.id)} className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-gray-700">New Lesson</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAddingLessonToModuleId(null)
                                                    setNewLessonTitle('')
                                                    setNewLessonUrl('')
                                                    setNewLessonDescription('')
                                                    setQuizQuestions([])
                                                }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <HiX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            value={newLessonTitle}
                                            onChange={(e) => setNewLessonTitle(e.target.value)}
                                            placeholder="Enter lesson title"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                            autoFocus
                                        />

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Content Type</label>
                                            <select
                                                value={newLessonContentType}
                                                onChange={(e) => setNewLessonContentType(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="video">Video Lesson</option>
                                                <option value="quiz">Quiz Assessment</option>
                                                {/* <option value="text">Text Only</option> */}
                                            </select>
                                        </div>

                                        {/* Video URL Input */}
                                        {newLessonContentType === 'video' && (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={newLessonUrl}
                                                    onChange={(e) => setNewLessonUrl(e.target.value)}
                                                    placeholder="Video URL (YouTube or direct link)"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Paste a YouTube link or a direct URL to a video file.
                                                </p>
                                            </div>
                                        )}

                                        {/* Quiz Builder */}
                                        {newLessonContentType === 'quiz' && (
                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                <h5 className="font-medium text-gray-700 mb-3 text-sm">Quiz Questions ({quizQuestions.length})</h5>

                                                {/* List of added questions */}
                                                <div className="space-y-2 mb-4">
                                                    {quizQuestions.map((q, idx) => (
                                                        <div key={q.id} className="bg-white p-2 rounded border border-gray-200 text-sm flex justify-between items-start">
                                                            <div>
                                                                <span className="font-bold text-gray-500 mr-2">Q{idx + 1}:</span>
                                                                {q.question}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeQuestion(q.id)}
                                                                className="text-red-400 hover:text-red-600"
                                                            >
                                                                <HiTrash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Add new question form */}
                                                <div className="bg-white p-3 rounded border border-blue-100">
                                                    <input
                                                        type="text"
                                                        value={currentQuestion}
                                                        onChange={(e) => setCurrentQuestion(e.target.value)}
                                                        placeholder="Question text?"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                    <div className="mb-2 flex items-center justify-between">
                                                        <label className="text-xs font-semibold text-gray-600">Options</label>
                                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                            Select the radio button for the correct answer
                                                        </span>
                                                    </div>

                                                    <div className="space-y-2 mb-3">
                                                        {currentOptions.map((opt, idx) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    name="correctOption"
                                                                    checked={correctOptionIndex === idx}
                                                                    onChange={() => setCorrectOptionIndex(idx)}
                                                                    className="text-blue-600 focus:ring-blue-500"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={opt}
                                                                    onChange={(e) => {
                                                                        const newOpts = [...currentOptions]
                                                                        newOpts[idx] = e.target.value
                                                                        setCurrentOptions(newOpts)
                                                                    }}
                                                                    placeholder={`Option ${idx + 1}`}
                                                                    className={`flex-1 px-3 py-2 border rounded-lg text-sm outline-none transition-colors ${correctOptionIndex === idx
                                                                            ? 'border-blue-500 bg-blue-50/50'
                                                                            : 'border-gray-200 focus:border-blue-500'
                                                                        }`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={handleAddQuestionToQuiz}
                                                        className="w-full py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                                                    >
                                                        + Add Question
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <textarea
                                            value={newLessonDescription}
                                            onChange={(e) => setNewLessonDescription(e.target.value)}
                                            placeholder={newLessonContentType === 'quiz' ? "Instructions for the quiz (Optional)" : "Summary / Keynotes (Optional)"}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                        />

                                        <div className="flex justify-end gap-2 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAddingLessonToModuleId(null)
                                                    setNewLessonTitle('')
                                                    setNewLessonUrl('')
                                                    setNewLessonDescription('')
                                                    setQuizQuestions([])
                                                }}
                                                className="text-gray-500 px-4 py-2 hover:text-gray-700 text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                                            >
                                                Add Lesson
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setAddingLessonToModuleId(module.id)}
                                        className="flex items-center text-blue-600 font-medium hover:text-blue-700 text-sm mt-2 ml-1"
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
                    className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Continue to Publish
                </button>
            </div>
        </div>
    )
}
