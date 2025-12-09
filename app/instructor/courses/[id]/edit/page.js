"use client"

import { useParams } from 'next/navigation'
import { UserAuth } from "@/app/context/ContextAuth"
import CourseCreationWizard from "@/app/components/instructor/CourseCreationWizard"

export default function EditCoursePage() {
    const params = useParams()
    const { session } = UserAuth()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
                <p className="text-gray-500">Update your course content and settings.</p>
            </div>

            <CourseCreationWizard userId={session?.user?.id} courseId={params.id} />
        </div>
    )
}
