"use client"

import { UserAuth } from "@/app/context/ContextAuth"
import CourseCreationWizard from "@/app/components/instructor/CourseCreationWizard"

export default function NewCoursePage() {
    const { session } = UserAuth()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-500">Fill in the details below to get started.</p>
            </div>

            <CourseCreationWizard userId={session?.user?.id} />
        </div>
    )
}
