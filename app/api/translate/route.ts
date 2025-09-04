import { NextRequest, NextResponse } from 'next/server'
import { TranslationResponse } from '../../../types/chinese-app'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const response = await translateWithLLM(text)
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    )
  }
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
})

async function translateWithLLM(englishText: string): Promise<TranslationResponse> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key-for-build') {
    // Fallback to mock responses for development
    return getMockTranslation(englishText)
  }

  const prompt = `Translate the following English text to Mandarin Chinese and provide detailed linguistic information:

English: "${englishText}"

Please respond with a JSON object containing:
1. "chinese": The Chinese characters translation
2. "pinyin": The complete Pinyin with proper word spacing (group syllables by word boundaries)
3. "words": Array of word objects with:
   - "chinese": Chinese characters for this word
   - "pinyin": Pinyin for this word (grouped syllables)
   - "meaning": English meaning of this word

Make sure the translation is natural and contextually appropriate for a language learning app. Group pinyin by word boundaries, not individual syllables.

Example format:
{
  "chinese": "今天是星期二",
  "pinyin": "Jīntiān shì xīngqí'èr",
  "words": [
    {
      "chinese": "今天",
      "pinyin": "jīntiān",
      "meaning": "today"
    },
    {
      "chinese": "是",
      "pinyin": "shì",
      "meaning": "is/am/are"
    },
    {
      "chinese": "星期二",
      "pinyin": "xīngqí'èr",
      "meaning": "Tuesday"
    }
  ]
}`

  try {
    // Get translation from GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Chinese language expert. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    })

    const responseText = completion.choices[0].message.content
    if (!responseText) {
      throw new Error('No response from OpenAI')
    }

    const translationData = JSON.parse(responseText) as TranslationResponse

    return translationData

  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // Fallback to mock response if OpenAI fails
    return getMockTranslation(englishText)
  }
}

function getMockTranslation(englishText: string): TranslationResponse {
  const mockTranslations: { [key: string]: TranslationResponse } = {
    'hello': {
      chinese: '你好',
      pinyin: 'Nǐ hǎo',
      words: [
        { chinese: '你', pinyin: 'nǐ', meaning: 'you' },
        { chinese: '好', pinyin: 'hǎo', meaning: 'good/well' }
      ]
    },
    'thank you': {
      chinese: '谢谢',
      pinyin: 'Xiè xiè',
      words: [
        { chinese: '谢谢', pinyin: 'xiè xiè', meaning: 'thank you' }
      ]
    },
    'good morning': {
      chinese: '早上好',
      pinyin: 'Zǎoshang hǎo',
      words: [
        { chinese: '早上', pinyin: 'zǎoshang', meaning: 'morning' },
        { chinese: '好', pinyin: 'hǎo', meaning: 'good' }
      ]
    },
    'how are you': {
      chinese: '你好吗',
      pinyin: 'Nǐ hǎo ma',
      words: [
        { chinese: '你', pinyin: 'nǐ', meaning: 'you' },
        { chinese: '好', pinyin: 'hǎo', meaning: 'good/well' },
        { chinese: '吗', pinyin: 'ma', meaning: 'question particle' }
      ]
    }
  }

  const lowerText = englishText.toLowerCase()
  return mockTranslations[lowerText] || {
    chinese: '未知',
    pinyin: 'Wèi zhī',
    words: [
      { chinese: '未知', pinyin: 'wèi zhī', meaning: 'unknown' }
    ]
  }
}