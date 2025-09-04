'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getLessonById } from '../../../../../../data/hsk-vocabulary'
import { HSKLesson, HSKWord } from '../../../../../../types/chinese-app/hsk'
import { AudioService } from '../../../../../../lib/chinese-app/audio'

export default function HSKLessonPage() {
  const { data: session } = useSession()
  const params = useParams()
  const levelNumber = parseInt(params.level as string)
  const lessonId = params.lessonId as string
  
  const [lesson, setLesson] = useState<HSKLesson | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showPinyin, setShowPinyin] = useState(true)
  const [showEnglish, setShowEnglish] = useState(false)
  const [studyMode, setStudyMode] = useState<'learn' | 'review'>('learn')
  const [audioService, setAudioService] = useState<AudioService | null>(null)

  useEffect(() => {
    const foundLesson = getLessonById(lessonId)
    setLesson(foundLesson || null)

    const service = AudioService.getInstance()
    setAudioService(service)
    service.preloadVoices()
  }, [lessonId])

  const currentWord = lesson?.words[currentWordIndex]

  const nextWord = () => {
    if (lesson && currentWordIndex < lesson.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setShowEnglish(false)
    }
  }

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
      setShowEnglish(false)
    }
  }

  const toggleEnglish = () => {
    setShowEnglish(!showEnglish)
  }

  const playAudio = async () => {
    if (currentWord && audioService) {
      try {
        await audioService.playPronunciation(currentWord.chinese, 'zh-CN')
      } catch (error) {
        console.error('Audio playback failed:', error)
        audioService.generateBeepSound()
      }
    }
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href={`/dashboard/hsk/${levelNumber}`} className="text-primary-600 hover:underline">
            Back to HSK Level {levelNumber}
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = ((currentWordIndex + 1) / lesson.words.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary-600 mr-6">
                Learn Chinese Easy
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/dashboard/hsk" className="hover:text-gray-800">HSK Courses</Link>
                <span>›</span>
                <Link href={`/dashboard/hsk/${levelNumber}`} className="hover:text-gray-800">Level {levelNumber}</Link>
                <span>›</span>
                <span className="text-primary-600 font-medium">{lesson.title}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentWordIndex + 1} of {lesson.words.length}
              </div>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {session?.user?.name?.[0] || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Learning Interface */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {currentWord && (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              {/* Chinese Character */}
              <div className="mb-8">
                <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
                  {currentWord.chinese}
                </div>
                
                {/* Pinyin */}
                {showPinyin && (
                  <div className="text-3xl text-gray-600 mb-4">
                    {currentWord.pinyin}
                  </div>
                )}
                
                {/* Audio Button */}
                <button
                  onClick={playAudio}
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-2xl transition-colors duration-200 mb-6"
                >
                  🔊
                </button>
              </div>

              {/* English Translation */}
              <div className="mb-8 h-16 flex items-center justify-center">
                {showEnglish ? (
                  <div className="text-2xl text-gray-700 font-medium">
                    {currentWord.english}
                  </div>
                ) : (
                  <button
                    onClick={toggleEnglish}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Show Meaning
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <button
                  onClick={previousWord}
                  disabled={currentWordIndex === 0}
                  className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-lg font-medium transition-colors duration-200"
                >
                  ← Previous
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPinyin(!showPinyin)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      showPinyin 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Pinyin
                  </button>
                  
                  <Link
                    href={`/dashboard/hsk/${levelNumber}/lesson/${lessonId}/test`}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Test This Lesson
                  </Link>
                </div>

                {currentWordIndex < lesson.words.length - 1 ? (
                  <button
                    onClick={nextWord}
                    className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Next →
                  </button>
                ) : (
                  <Link
                    href={`/dashboard/hsk/${levelNumber}/lesson/${lessonId}/test`}
                    className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Complete Lesson →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Word Grid Overview */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lesson Progress</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {lesson.words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => {setCurrentWordIndex(index); setShowEnglish(false);}}
                  className={`aspect-square rounded-lg text-sm font-medium transition-colors duration-200 ${
                    index === currentWordIndex
                      ? 'bg-primary-600 text-white'
                      : index < currentWordIndex
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={`${word.chinese} - ${word.english}`}
                >
                  {word.chinese}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}