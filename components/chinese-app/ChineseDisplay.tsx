'use client'

import { useState } from 'react'
import { TranslationResponse, ChineseWord } from '../../types/chinese-app'

interface ChineseDisplayProps {
  translation: TranslationResponse;
  onPlayAudio?: () => void;
}

export default function ChineseDisplay({ translation, onPlayAudio }: ChineseDisplayProps) {
  const [selectedWord, setSelectedWord] = useState<ChineseWord | null>(null)

  const handleWordClick = (word: ChineseWord) => {
    setSelectedWord(selectedWord?.chinese === word.chinese ? null : word)
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <div className="text-6xl font-bold text-gray-800 leading-tight">
            {translation.chinese}
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="text-2xl text-gray-600 font-medium">
              {translation.pinyin}
            </div>
            
            {onPlayAudio && (
              <button
                onClick={onPlayAudio}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
              >
                🔊
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Word Breakdown
          </h3>
          
          <div className="flex flex-wrap justify-center gap-2">
            {translation.words.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordClick(word)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                  selectedWord?.chinese === word.chinese
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{word.chinese}</span>
                  <span className="font-medium text-sm">{word.pinyin}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedWord && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-center space-x-4">
              {selectedWord.imageUrl ? (
                <img 
                  src={selectedWord.imageUrl} 
                  alt={selectedWord.meaning}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔤</span>
                </div>
              )}
              <div className="text-left flex-1">
                <div className="text-2xl font-bold text-blue-800 mb-1">
                  {selectedWord.chinese}
                </div>
                <div className="text-lg text-blue-600 mb-1">
                  {selectedWord.pinyin}
                </div>
                <div className="text-blue-700">
                  means "{selectedWord.meaning}"
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}