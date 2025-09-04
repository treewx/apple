export interface ChinesePhrase {
  english: string;
  chinese: string;
  pinyin: string;
  audio?: string;
}

export interface ChineseWord {
  chinese: string;
  pinyin: string;
  meaning: string;
  imageUrl?: string;
}

export interface PinyinSyllable {
  syllable: string;
  meaning: string;
  image?: string;
  imageUrl?: string;
}

export interface TranslationResponse {
  chinese: string;
  pinyin: string;
  words: ChineseWord[];
  syllables?: PinyinSyllable[]; // Keep for backward compatibility
  audio_url?: string;
}