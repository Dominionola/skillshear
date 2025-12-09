"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BasicInfoStep from './steps/BasicInfoStep'
import CurriculumStep from './steps/CurriculumStep'
import PublishStep from './steps/PublishStep'
import { HiCheck, HiTrash } from 'react-icons/hi'
import { deleteCourse } from '@/utils/supabase/instructor'
import toast from 'react-hot-toast'

const steps = [
    { id: 1, name: 'Basic Information' },
    { id: 2, name: 'Curriculum' },
    { id: 3, name: 'Publish' },
]

export default function CourseCreationWizard({ userId, courseId: initialCourseId }) {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [courseId, setCourseId] = useState(initialCourseId || null)

    const handleStepComplete = (step, data) => {
        if (step === 1 && data?.id) {
            setCourseId(data.id)
            setCurrentStep(2)
        } else if (step === 2) {
            if (data === 'back') {
                setCurrentStep(1)
            } else {
                setCurrentStep(3)
            }
        } else if (step === 3) {
            if (data === 'back') {
                setCurrentStep(2)
            }
            // Publishing redirects to instructor dashboard from within PublishStep
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return

        const { error } = await deleteCourse(courseId)
        if (error) {
            toast.error('Failed to delete course')
        } else {
            toast.success('Course deleted')
            router.push('/dashboard/instructor')
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center bg-gray-50 px-2">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors
                                ${step.id < currentStep
                                    ? 'bg-green-500 text-white'
                                    : step.id === currentStep
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-500'}
                            `}>
                                {step.id < currentStep ? <HiCheck className="w-5 h-5" /> : step.id}
                            </div>
                            <span className={`text-xs font-medium ${step.id === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>


            {/* Course Actions (Delete) */}
            {
                courseId && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleDelete}
                            className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                            <HiTrash className="w-4 h-4 mr-1" />
                            Delete Course
                        </button>
                    </div>
                )
            }

            {/* Step Content */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                {currentStep === 1 && (
                    <BasicInfoStep
                        userId={userId}
                        courseId={courseId}
                        onComplete={(data) => handleStepComplete(1, data)}
                    />
                )}
                {currentStep === 2 && courseId && (
                    <CurriculumStep
                        courseId={courseId}
                        onComplete={(action) => handleStepComplete(2, action)}
                    />
                )}
                {currentStep === 3 && courseId && (
                    <PublishStep
                        courseId={courseId}
                        onComplete={(action) => handleStepComplete(3, action)}
                    />
                )}
            </div>
        </div >
    )
}

