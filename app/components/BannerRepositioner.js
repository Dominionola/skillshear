"use client"

import { useState, useRef, useEffect } from 'react'
import { HiX, HiCheck } from 'react-icons/hi'

/**
 * BannerRepositioner Component
 * Allows users to adjust the vertical position of their banner image
 */
export default function BannerRepositioner({ imageUrl, currentPosition = 50, onSave, onClose }) {
    const [position, setPosition] = useState(currentPosition)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef(null)
    const imageRef = useRef(null)

    // Handle mouse/touch drag
    const handleDragStart = (e) => {
        setIsDragging(true)
        e.preventDefault()
    }

    const handleDrag = (e) => {
        if (!isDragging || !containerRef.current || !imageRef.current) return

        const container = containerRef.current
        const image = imageRef.current
        const rect = container.getBoundingClientRect()

        // Get mouse/touch Y position relative to container
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
        const relativeY = clientY - rect.top

        // Calculate the image and container dimensions
        const containerHeight = rect.height
        const imageHeight = image.naturalHeight
        const imageWidth = image.naturalWidth
        const displayWidth = rect.width
        const displayHeight = (imageHeight / imageWidth) * displayWidth

        // If image is shorter than container, don't allow repositioning
        if (displayHeight <= containerHeight) {
            setPosition(50)
            return
        }

        // Calculate visible range
        const maxScroll = displayHeight - containerHeight
        const scrollableRange = maxScroll

        // Convert mouse position to percentage
        let percentage = (relativeY / containerHeight) * 100

        // Clamp between 0 and 100
        percentage = Math.max(0, Math.min(100, percentage))

        setPosition(percentage)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDrag)
            window.addEventListener('mouseup', handleDragEnd)
            window.addEventListener('touchmove', handleDrag)
            window.addEventListener('touchend', handleDragEnd)

            return () => {
                window.removeEventListener('mousemove', handleDrag)
                window.removeEventListener('mouseup', handleDragEnd)
                window.removeEventListener('touchmove', handleDrag)
                window.removeEventListener('touchend', handleDragEnd)
            }
        }
    }, [isDragging])

    const handleSliderChange = (e) => {
        setPosition(parseFloat(e.target.value))
    }

    const handleReset = () => {
        setPosition(50)
    }

    const handleSave = () => {
        onSave(position)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Reposition Banner</h2>
                        <p className="text-sm text-gray-600 mt-1">Drag the image or use the slider to adjust the visible area</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Preview Area */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="space-y-4">
                        {/* Draggable Preview */}
                        <div
                            ref={containerRef}
                            className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden cursor-move border-2 border-gray-300"
                            onMouseDown={handleDragStart}
                            onTouchStart={handleDragStart}
                        >
                            <img
                                ref={imageRef}
                                src={imageUrl}
                                alt="Banner preview"
                                className="w-full h-full object-cover transition-all duration-200"
                                style={{
                                    objectPosition: `center ${position}%`
                                }}
                                draggable={false}
                            />
                            {isDragging && (
                                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 pointer-events-none" />
                            )}
                        </div>

                        {/* Slider Control */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Top</span>
                                <span className="font-medium text-gray-900">Position: {position.toFixed(0)}%</span>
                                <span>Bottom</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="0.1"
                                value={position}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>

                        {/* Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                            <p className="font-medium mb-1">💡 Tips:</p>
                            <ul className="list-disc list-inside space-y-1 text-blue-700">
                                <li>Drag the image up or down to reposition</li>
                                <li>Use the slider for precise adjustments</li>
                                <li>The preview shows how your banner will appear on your profile</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Reset to Center
                    </button>
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            <HiCheck className="w-5 h-5" />
                            <span>Apply Position</span>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #2563eb;
                    cursor: pointer;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #2563eb;
                    cursor: pointer;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            `}</style>
        </div>
    )
}
