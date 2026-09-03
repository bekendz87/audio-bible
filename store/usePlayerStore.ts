import { Chapter } from '@/types/bible';
import { create } from 'zustand';

interface PlayerState {
  currentChapter: Chapter | null;
  isPlaying: boolean;
  setCurrentChapter: (chapter: Chapter) => void;
  setIsPlaying: (playing: boolean, chapter?: Chapter) => void;
  togglePlay: () => void;
  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentChapter: null,
  isPlaying: false,
  setCurrentChapter: (chapter) => set({ currentChapter: chapter, isPlaying: true }),
  setIsPlaying: (playing, chapter) =>
    set((state) => ({
      isPlaying: playing,
      currentChapter: chapter !== undefined ? chapter : state.currentChapter,
    })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  resetPlayer: () => set({ currentChapter: null, isPlaying: false }),
}));