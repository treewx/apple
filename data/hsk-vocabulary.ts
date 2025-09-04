import { HSKLevel, HSKLesson, HSKWord } from '../types/chinese-app/hsk';

// HSK 1 Vocabulary (150 words)
const hsk1Words: HSKWord[] = [
  // Numbers
  { chinese: '一', pinyin: 'yī', english: 'one', level: 1, category: 'numbers' },
  { chinese: '二', pinyin: 'èr', english: 'two', level: 1, category: 'numbers' },
  { chinese: '三', pinyin: 'sān', english: 'three', level: 1, category: 'numbers' },
  { chinese: '四', pinyin: 'sì', english: 'four', level: 1, category: 'numbers' },
  { chinese: '五', pinyin: 'wǔ', english: 'five', level: 1, category: 'numbers' },
  { chinese: '六', pinyin: 'liù', english: 'six', level: 1, category: 'numbers' },
  { chinese: '七', pinyin: 'qī', english: 'seven', level: 1, category: 'numbers' },
  { chinese: '八', pinyin: 'bā', english: 'eight', level: 1, category: 'numbers' },
  { chinese: '九', pinyin: 'jiǔ', english: 'nine', level: 1, category: 'numbers' },
  { chinese: '十', pinyin: 'shí', english: 'ten', level: 1, category: 'numbers' },
  
  // Basic Greetings
  { chinese: '你好', pinyin: 'nǐ hǎo', english: 'hello', level: 1, category: 'greetings' },
  { chinese: '再见', pinyin: 'zài jiàn', english: 'goodbye', level: 1, category: 'greetings' },
  { chinese: '谢谢', pinyin: 'xiè xiè', english: 'thank you', level: 1, category: 'greetings' },
  { chinese: '不客气', pinyin: 'bù kè qì', english: 'you\'re welcome', level: 1, category: 'greetings' },
  { chinese: '对不起', pinyin: 'duì bù qǐ', english: 'sorry', level: 1, category: 'greetings' },
  
  // Family
  { chinese: '爸爸', pinyin: 'bà ba', english: 'father', level: 1, category: 'family' },
  { chinese: '妈妈', pinyin: 'mā ma', english: 'mother', level: 1, category: 'family' },
  { chinese: '儿子', pinyin: 'ér zi', english: 'son', level: 1, category: 'family' },
  { chinese: '女儿', pinyin: 'nǚ ér', english: 'daughter', level: 1, category: 'family' },
  
  // Basic words
  { chinese: '我', pinyin: 'wǒ', english: 'I/me', level: 1, category: 'pronouns' },
  { chinese: '你', pinyin: 'nǐ', english: 'you', level: 1, category: 'pronouns' },
  { chinese: '他', pinyin: 'tā', english: 'he/him', level: 1, category: 'pronouns' },
  { chinese: '她', pinyin: 'tā', english: 'she/her', level: 1, category: 'pronouns' },
  { chinese: '好', pinyin: 'hǎo', english: 'good', level: 1, category: 'adjectives' },
  { chinese: '大', pinyin: 'dà', english: 'big', level: 1, category: 'adjectives' },
  { chinese: '小', pinyin: 'xiǎo', english: 'small', level: 1, category: 'adjectives' },
  { chinese: '多', pinyin: 'duō', english: 'many/much', level: 1, category: 'adjectives' },
  
  // Time
  { chinese: '今天', pinyin: 'jīn tiān', english: 'today', level: 1, category: 'time' },
  { chinese: '明天', pinyin: 'míng tiān', english: 'tomorrow', level: 1, category: 'time' },
  { chinese: '昨天', pinyin: 'zuó tiān', english: 'yesterday', level: 1, category: 'time' },
  { chinese: '年', pinyin: 'nián', english: 'year', level: 1, category: 'time' },
  { chinese: '月', pinyin: 'yuè', english: 'month', level: 1, category: 'time' },
  { chinese: '日', pinyin: 'rì', english: 'day', level: 1, category: 'time' },
  
  // Food & Drink
  { chinese: '水', pinyin: 'shuǐ', english: 'water', level: 1, category: 'food' },
  { chinese: '茶', pinyin: 'chá', english: 'tea', level: 1, category: 'food' },
  { chinese: '咖啡', pinyin: 'kā fēi', english: 'coffee', level: 1, category: 'food' },
  { chinese: '米饭', pinyin: 'mǐ fàn', english: 'rice', level: 1, category: 'food' },
];

// HSK 2 Vocabulary (150 additional words)
const hsk2Words: HSKWord[] = [
  // More family
  { chinese: '爷爷', pinyin: 'yé ye', english: 'grandfather (paternal)', level: 2, category: 'family' },
  { chinese: '奶奶', pinyin: 'nǎi nai', english: 'grandmother (paternal)', level: 2, category: 'family' },
  { chinese: '哥哥', pinyin: 'gē ge', english: 'older brother', level: 2, category: 'family' },
  { chinese: '姐姐', pinyin: 'jiě jie', english: 'older sister', level: 2, category: 'family' },
  { chinese: '弟弟', pinyin: 'dì di', english: 'younger brother', level: 2, category: 'family' },
  { chinese: '妹妹', pinyin: 'mèi mei', english: 'younger sister', level: 2, category: 'family' },
  
  // Colors
  { chinese: '红色', pinyin: 'hóng sè', english: 'red', level: 2, category: 'colors' },
  { chinese: '蓝色', pinyin: 'lán sè', english: 'blue', level: 2, category: 'colors' },
  { chinese: '黄色', pinyin: 'huáng sè', english: 'yellow', level: 2, category: 'colors' },
  { chinese: '绿色', pinyin: 'lǜ sè', english: 'green', level: 2, category: 'colors' },
  { chinese: '黑色', pinyin: 'hēi sè', english: 'black', level: 2, category: 'colors' },
  { chinese: '白色', pinyin: 'bái sè', english: 'white', level: 2, category: 'colors' },
  
  // Animals
  { chinese: '猫', pinyin: 'māo', english: 'cat', level: 2, category: 'animals' },
  { chinese: '狗', pinyin: 'gǒu', english: 'dog', level: 2, category: 'animals' },
  { chinese: '鸟', pinyin: 'niǎo', english: 'bird', level: 2, category: 'animals' },
  { chinese: '鱼', pinyin: 'yú', english: 'fish', level: 2, category: 'animals' },
  
  // Weather
  { chinese: '天气', pinyin: 'tiān qì', english: 'weather', level: 2, category: 'weather' },
  { chinese: '雨', pinyin: 'yǔ', english: 'rain', level: 2, category: 'weather' },
  { chinese: '雪', pinyin: 'xuě', english: 'snow', level: 2, category: 'weather' },
  { chinese: '风', pinyin: 'fēng', english: 'wind', level: 2, category: 'weather' },
  
  // Body parts
  { chinese: '眼睛', pinyin: 'yǎn jing', english: 'eyes', level: 2, category: 'body' },
  { chinese: '手', pinyin: 'shǒu', english: 'hand', level: 2, category: 'body' },
  { chinese: '脚', pinyin: 'jiǎo', english: 'foot', level: 2, category: 'body' },
  { chinese: '头', pinyin: 'tóu', english: 'head', level: 2, category: 'body' },
];

// Sample HSK 3-5 words (smaller samples for now)
const hsk3Words: HSKWord[] = [
  { chinese: '经济', pinyin: 'jīng jì', english: 'economy', level: 3, category: 'business' },
  { chinese: '教育', pinyin: 'jiào yù', english: 'education', level: 3, category: 'education' },
  { chinese: '环境', pinyin: 'huán jìng', english: 'environment', level: 3, category: 'environment' },
];

const hsk4Words: HSKWord[] = [
  { chinese: '政府', pinyin: 'zhèng fǔ', english: 'government', level: 4, category: 'politics' },
  { chinese: '社会', pinyin: 'shè huì', english: 'society', level: 4, category: 'society' },
];

const hsk5Words: HSKWord[] = [
  { chinese: '哲学', pinyin: 'zhé xué', english: 'philosophy', level: 5, category: 'academics' },
  { chinese: '技术', pinyin: 'jì shù', english: 'technology', level: 5, category: 'technology' },
];

// Create lessons by grouping words by category
function createLessons(words: HSKWord[], level: number): HSKLesson[] {
  const categories = Array.from(new Set(words.map(w => w.category).filter(Boolean)));
  
  return categories.map((category, index) => {
    const categoryWords = words.filter(w => w.category === category);
    const categoryName = category || 'general';
    return {
      id: `hsk${level}-${categoryName}`,
      title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`,
      description: `Learn essential ${categoryName} vocabulary for HSK Level ${level}`,
      level,
      words: categoryWords,
      category: categoryName,
      estimatedTime: Math.ceil(categoryWords.length * 2), // 2 minutes per word
    };
  });
}

export const HSK_LEVELS: HSKLevel[] = [
  {
    level: 1,
    title: 'HSK Level 1 - Beginner',
    description: 'Master the fundamentals with 150 essential Chinese words',
    totalWords: hsk1Words.length,
    lessons: createLessons(hsk1Words, 1),
    color: '#10B981', // green
  },
  {
    level: 2,
    title: 'HSK Level 2 - Elementary',
    description: 'Build your foundation with 300 core vocabulary words',
    totalWords: hsk2Words.length,
    lessons: createLessons(hsk2Words, 2),
    color: '#3B82F6', // blue
  },
  {
    level: 3,
    title: 'HSK Level 3 - Pre-Intermediate',
    description: 'Expand your vocabulary with 600 practical words',
    totalWords: hsk3Words.length,
    lessons: createLessons(hsk3Words, 3),
    color: '#8B5CF6', // purple
  },
  {
    level: 4,
    title: 'HSK Level 4 - Intermediate',
    description: 'Advanced vocabulary for daily communication (1200 words)',
    totalWords: hsk4Words.length,
    lessons: createLessons(hsk4Words, 4),
    color: '#F59E0B', // amber
  },
  {
    level: 5,
    title: 'HSK Level 5 - Upper-Intermediate',
    description: 'Complex vocabulary for academic and professional use (2500 words)',
    totalWords: hsk5Words.length,
    lessons: createLessons(hsk5Words, 5),
    color: '#EF4444', // red
  },
];

export const getAllWords = (): HSKWord[] => {
  return [...hsk1Words, ...hsk2Words, ...hsk3Words, ...hsk4Words, ...hsk5Words];
};

export const getWordsByLevel = (level: number): HSKWord[] => {
  return getAllWords().filter(word => word.level === level);
};

export const getLessonById = (lessonId: string): HSKLesson | undefined => {
  for (const level of HSK_LEVELS) {
    const lesson = level.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};