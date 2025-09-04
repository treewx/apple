'use client'

import { useState, KeyboardEvent } from 'react'

interface EnglishInputProps {
  onSubmit: (text: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function EnglishInput({ onSubmit, isLoading = false, placeholder = "What do you want to say in Chinese?" }: EnglishInputProps) {
  const [inputText, setInputText] = useState('')

  const handleSubmit = () => {
    if (inputText.trim() && !isLoading) {
      onSubmit(inputText.trim())
      setInputText('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-white/90 backdrop-blur-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={!inputText.trim() || isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>...</span>
            </div>
          ) : (
            '→'
          )}
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white/80 text-sm">
          Type what you want to say in English
        </p>
      </div>
    </div>
  )
}