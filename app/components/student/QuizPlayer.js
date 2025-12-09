"use client"

import { useState } from 'react'
import { HiCheckCircle, HiXCircle, HiRefresh } from 'react-icons/hi'
import confetti from 'canvas-confetti'

export default function QuizPlayer({ quizData, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [answers, setAnswers] = useState({}) // Store user answers

    const currentQuestion = quizData[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === quizData.length - 1

    const handleOptionSelect = (optionIndex) => {
        if (showResult) return // Prevent changing answer after submission
        setSelectedOption(optionIndex)
    }

    const handleSubmitAnswer = () => {
        if (selectedOption === null) return

        const isCorrect = selectedOption === currentQuestion.correctAnswer

        setAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: {
                selected: selectedOption,
                isCorrect
            }
        }))

        if (isCorrect) {
            setScore(prev => prev + 1)
        }

        setShowResult(true)
    }

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            setQuizCompleted(true)
            onComplete && onComplete(score + (answers[currentQuestionIndex]?.isCorrect ? 0 : 0), quizData.length) // Trigger completion callback

            if (score / quizData.length >= 0.7) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                })
            }
        } else {
            setCurrentQuestionIndex(prev => prev + 1)
            setSelectedOption(null)
            setShowResult(false)
        }
    }

    const handleRetry = () => {
        setCurrentQuestionIndex(0)
        setSelectedOption(null)
        setShowResult(false)
        setScore(0)
        setQuizCompleted(false)
        setAnswers({})
    }

    if (quizCompleted) {
        const percentage = Math.round((score / quizData.length) * 100)
        return (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                <div className="mb-6">
                    <div className={`
                        w-24 h-24 rounded-full flex items-center justify-center mx-auto text-3xl font-bold mb-4
                        ${percentage >= 70 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                    `}>
                        {percentage}%
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                    <p className="text-gray-600">
                        You scored {score} out of {quizData.length} correct.
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleRetry}
                        className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
                    >
                        <HiRefresh className="w-5 h-5 mr-2" />
                        Retry Quiz
                    </button>
                    {onComplete && (
                        <button
                            onClick={() => window.location.reload()} // Or close modal
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Return to Course
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-100 h-2 w-full">
                <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex) / quizData.length) * 100}%` }}
                ></div>
            </div>

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-medium text-gray-500">
                        Question {currentQuestionIndex + 1} of {quizData.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                        Score: {score}
                    </span>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, idx) => {
                        let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all "

                        if (showResult) {
                            if (idx === currentQuestion.correctAnswer) {
                                optionClass += "border-green-500 bg-green-50 text-green-700"
                            } else if (idx === selectedOption) {
                                optionClass += "border-red-500 bg-red-50 text-red-700"
                            } else {
                                optionClass += "border-gray-200 opacity-50"
                            }
                        } else {
                            if (idx === selectedOption) {
                                optionClass += "border-blue-500 bg-blue-50 text-blue-700"
                            } else {
                                optionClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={showResult}
                                className={optionClass}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showResult && idx === currentQuestion.correctAnswer && (
                                        <HiCheckCircle className="w-6 h-6 text-green-500" />
                                    )}
                                    {showResult && idx === selectedOption && idx !== currentQuestion.correctAnswer && (
                                        <HiXCircle className="w-6 h-6 text-red-500" />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Footer Controls */}
                <div className="flex justify-end">
                    {!showResult ? (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={selectedOption === null}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center"
                        >
                            {isLastQuestion ? 'See Results' : 'Next Question'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
