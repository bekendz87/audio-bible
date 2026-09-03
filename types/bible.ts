export interface Chapter {
  id: string;
  bookName: string;
  chapterNum: number;
  duration: string;
  audioUrl: string;
  reader: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface BibleVerse {
  id: string;
  verseNum: number;
  text: string;
  startTime: number;
}

export interface ChapterDetail extends Chapter {
  verses: BibleVerse[];
}