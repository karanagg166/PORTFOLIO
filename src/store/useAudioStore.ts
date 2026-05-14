import { create } from 'zustand';

interface AudioState {
  isPlaying: boolean;
  togglePlaying: () => void;
  setPlaying: (val: boolean) => void;
  volume: number;
  setVolume: (val: number) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (val) => set({ isPlaying: val }),
  volume: 0.5,
  setVolume: (val) => set({ volume: val }),
}));
