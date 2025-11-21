import Link from "next/link";

export default function EmailInUsePage() {
    return (
        <div className="pt-16 flex justify-center items-center min-h-screen">
            <div className="w-full px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                                This email has been used
                            </h1>

                            <p className="text-gray-600">
                                An account with this email address already exists using a different sign-in method.
                                Please sign in using your original authentication method.
                            </p>

                            <div className="pt-4">
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors"
                                >
                                    Go to Sign In
                                </Link>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/"
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
