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

    // Generate images for each word using DALL-E
    console.log('Starting image generation for words:', translationData.words.map(w => w.meaning))
    
    const imagePromises = translationData.words.map(async (word, index) => {
      try {
        console.log(`Generating image ${index + 1}/${translationData.words.length} for word: "${word.meaning}"`)
        
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: `Create a simple, clear illustration representing the English word: "${word.meaning}". The image should be a clean, minimalist icon or illustration that clearly shows what "${word.meaning}" means. Use bright colors and make it suitable for language learning. Focus on the main concept without text or labels.`,
          size: "1024x1024",
          quality: "standard",
          n: 1,
        })

        const imageUrl = imageResponse.data?.[0]?.url
        
        if (!imageUrl) {
          console.error(`No image URL generated for word "${word.meaning}"`)
          return word
        }
        
        console.log(`Successfully generated image for "${word.meaning}"`)

        return {
          ...word,
          imageUrl: imageUrl
        }
      } catch (error) {
        console.error(`Failed to generate image for word "${word.chinese}" (${word.meaning}):`, error)
        return word // Return without imageUrl if generation fails
      }
    })

    const wordsWithImages = await Promise.all(imagePromises)
    
    console.log('Image generation complete. Results:', wordsWithImages.map(w => ({
      word: w.meaning,
      hasImage: !!w.imageUrl
    })))

    return {
      ...translationData,
      words: wordsWithImages
    }

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
        { 
          chinese: '你', 
          pinyin: 'nǐ', 
          meaning: 'you',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        },
        { 
          chinese: '好', 
          pinyin: 'hǎo', 
          meaning: 'good/well',
          imageUrl: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=400&fit=crop'
        }
      ]
    },
    'thank you': {
      chinese: '谢谢',
      pinyin: 'Xiè xiè',
      words: [
        { 
          chinese: '谢谢', 
          pinyin: 'xiè xiè', 
          meaning: 'thank you',
          imageUrl: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop'
        }
      ]
    },
    'good morning': {
      chinese: '早上好',
      pinyin: 'Zǎoshang hǎo',
      words: [
        { 
          chinese: '早上', 
          pinyin: 'zǎoshang', 
          meaning: 'morning',
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
        },
        { 
          chinese: '好', 
          pinyin: 'hǎo', 
          meaning: 'good',
          imageUrl: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=400&fit=crop'
        }
      ]
    },
    'how are you': {
      chinese: '你好吗',
      pinyin: 'Nǐ hǎo ma',
      words: [
        { 
          chinese: '你', 
          pinyin: 'nǐ', 
          meaning: 'you',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        },
        { 
          chinese: '好', 
          pinyin: 'hǎo', 
          meaning: 'good/well',
          imageUrl: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=400&fit=crop'
        },
        { 
          chinese: '吗', 
          pinyin: 'ma', 
          meaning: 'question particle',
          imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop'
        }
      ]
    },
    'cat': {
      chinese: '猫',
      pinyin: 'Māo',
      words: [
        { 
          chinese: '猫', 
          pinyin: 'māo', 
          meaning: 'cat',
          imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop'
        }
      ]
    },
    'dog': {
      chinese: '狗',
      pinyin: 'Gǒu',
      words: [
        { 
          chinese: '狗', 
          pinyin: 'gǒu', 
          meaning: 'dog',
          imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop'
        }
      ]
    },
    'water': {
      chinese: '水',
      pinyin: 'Shuǐ',
      words: [
        { 
          chinese: '水', 
          pinyin: 'shuǐ', 
          meaning: 'water',
          imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop'
        }
      ]
    }
  }

  const lowerText = englishText.toLowerCase()
  return mockTranslations[lowerText] || {
    chinese: '未知',
    pinyin: 'Wèi zhī',
    words: [
      { 
        chinese: '未知', 
        pinyin: 'wèi zhī', 
        meaning: 'unknown',
        imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop'
      }
    ]
  }
}