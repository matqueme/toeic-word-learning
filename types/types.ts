export interface Word {
  type: string;
  en: { word: string; otherAnswers?: string[] };
  fr: { word: string; otherAnswers?: string[] };
  _isFromEnglish?: boolean;
}

export interface Category {
  id: string;
  nameFr: string;
  nameEn: string;
  words: Word[];
}
