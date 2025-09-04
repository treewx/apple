'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getLessonById } from '../../../../../../../data/hsk-vocabulary'
import { HSKLesson, HSKWord, QuizQuestion } from '../../../../../../../types/chinese-app/hsk'

interface TestQuestion extends QuizQuestion {
  userAnswer?: string;
  isCorrect?: boolean;
}

export default function HSKLessonTestPage() {
  const { data: session } = useSession()
  const params = useParams()
  const levelNumber = parseInt(params.level as string)
  const lessonId = params.lessonId as string
  
  const [lesson, setLesson] = useState<HSKLesson | null>(null)
  const [questions, setQuestions] = useState<TestQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    const foundLesson = getLessonById(lessonId)
    if (foundLesson) {
      setLesson(foundLesson)
      generateQuestions(foundLesson)
    }
  }, [lessonId])

  const generateQuestions = (lesson: HSKLesson) => {
    const questions: TestQuestion[] = []
    
    // Shuffle the words for variety
    const shuffledWords = [...lesson.words].sort(() => Math.random() - 0.5)
    
    shuffledWords.forEach((word, index) => {
      // Create different types of questions
      const questionTypes = ['chinese-to-english', 'english-to-chinese', 'pinyin-to-chinese']
      const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
      
      let question: TestQuestion
      
      if (randomType === 'chinese-to-english') {
        const wrongAnswers = getRandomWrongAnswers(word, lesson.words, 'english')
        question = {
          id: `${lesson.id}-${index}`,
          type: 'multiple-choice',
          word,
          question: `What does "${word.chinese}" mean?`,
          options: shuffleArray([word.english, ...wrongAnswers]),
          correctAnswer: word.english,
        }
      } else if (randomType === 'english-to-chinese') {
        const wrongAnswers = getRandomWrongAnswers(word, lesson.words, 'chinese')
        question = {
          id: `${lesson.id}-${index}`,
          type: 'multiple-choice',
          word,
          question: `How do you write "${word.english}" in Chinese?`,
          options: shuffleArray([word.chinese, ...wrongAnswers]),
          correctAnswer: word.chinese,
        }
      } else {
        const wrongAnswers = getRandomWrongAnswers(word, lesson.words, 'chinese')
        question = {
          id: `${lesson.id}-${index}`,
          type: 'multiple-choice',
          word,
          question: `Which Chinese character has the pronunciation "${word.pinyin}"?`,
          options: shuffleArray([word.chinese, ...wrongAnswers]),
          correctAnswer: word.chinese,
        }
      }
      
      questions.push(question)
    })
    
    setQuestions(questions)
  }

  const getRandomWrongAnswers = (correctWord: HSKWord, allWords: HSKWord[], type: 'chinese' | 'english'): string[] => {
    const otherWords = allWords.filter(w => w !== correctWord)
    const wrongAnswers: string[] = []
    
    while (wrongAnswers.length < 3 && otherWords.length > wrongAnswers.length) {
      const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)]
      const answer = type === 'chinese' ? randomWord.chinese : randomWord.english
      if (!wrongAnswers.includes(answer)) {
        wrongAnswers.push(answer)
      }
    }
    
    return wrongAnswers
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const startTest = () => {
    setTestStarted(true)
    setStartTime(new Date())
  }

  const answerQuestion = (answer: string) => {
    const updatedQuestions = [...questions]
    const currentQuestion = updatedQuestions[currentQuestionIndex]
    
    currentQuestion.userAnswer = answer
    currentQuestion.isCorrect = answer === currentQuestion.correctAnswer
    
    setQuestions(updatedQuestions)
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      completeTest()
    }
  }

  const completeTest = () => {
    const correctAnswers = questions.filter(q => q.isCorrect).length
    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    const endTime = new Date()
    const timeSpentSeconds = startTime ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) : 0
    
    setScore(finalScore)
    setTimeSpent(timeSpentSeconds)
    setTestCompleted(true)
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

  const currentQuestion = questions[currentQuestionIndex]
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
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
                <Link href={`/dashboard/hsk/${levelNumber}/lesson/${lessonId}`} className="hover:text-gray-800">{lesson.title}</Link>
                <span>›</span>
                <span className="text-purple-600 font-medium">Test</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {testStarted && !testCompleted && (
                <div className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              )}
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
      {testStarted && !testCompleted && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {!testStarted && (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Test: {lesson.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Test your knowledge of {lesson.words.length} vocabulary words
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{lesson.words.length}</div>
                    <div className="text-gray-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">~{Math.ceil(lesson.words.length * 0.5)}</div>
                    <div className="text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">80%</div>
                    <div className="text-gray-600">Pass Score</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startTest}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors duration-200"
              >
                Start Test
              </button>
            </div>
          )}

          {testStarted && !testCompleted && currentQuestion && (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentQuestion.question}
                </h2>
                
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => answerQuestion(option)}
                        className="p-6 text-xl border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 rounded-xl transition-colors duration-200 text-center"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {testCompleted && (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="mb-8">
                <div className={`text-6xl font-bold mb-4 ${score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                  {score}%
                </div>
                <h1 className={`text-3xl font-bold mb-4 ${score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                  {score >= 80 ? 'Congratulations!' : 'Keep Practicing!'}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  You got {questions.filter(q => q.isCorrect).length} out of {questions.length} questions correct
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{score}%</div>
                    <div className="text-gray-600">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</div>
                    <div className="text-gray-600">Time Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{questions.filter(q => q.isCorrect).length}/{questions.length}</div>
                    <div className="text-gray-600">Correct</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Link
                  href={`/dashboard/hsk/${levelNumber}/lesson/${lessonId}`}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Review Lesson
                </Link>
                <button
                  onClick={() => {
                    setTestStarted(false)
                    setTestCompleted(false)
                    setCurrentQuestionIndex(0)
                    generateQuestions(lesson)
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Retake Test
                </button>
                <Link
                  href={`/dashboard/hsk/${levelNumber}`}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Next Lesson
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}