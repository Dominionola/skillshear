"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BasicInfoStep from './steps/BasicInfoStep'
import CurriculumStep from './steps/CurriculumStep'
import PublishStep from './steps/PublishStep'
import { HiCheck } from 'react-icons/hi'

const steps = [
    { id: 1, name: 'Basic Information' },
    { id: 2, name: 'Curriculum' },
    { id: 3, name: 'Publish' },
]

export default function CourseCreationWizard({ userId }) {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [courseId, setCourseId] = useState(null)

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

            {/* Step Content */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                {currentStep === 1 && (
                    <BasicInfoStep
                        userId={userId}
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
        </div>
    )
}

