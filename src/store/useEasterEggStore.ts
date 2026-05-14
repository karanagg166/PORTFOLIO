import { create } from 'zustand';

interface EasterEggState {
  isDiscoMode: boolean;
  toggleDiscoMode: () => void;
  isMatrixRain: boolean;
  toggleMatrixRain: () => void;
  isScreensaver: boolean;
  setScreensaver: (val: boolean) => void;
  konamiCount: number;
  increaseKonamiScore: () => void;
  resetKonamiScore: () => void;
}

export const useEasterEggStore = create<EasterEggState>((set) => ({
  isDiscoMode: false,
  toggleDiscoMode: () => set((state) => ({ isDiscoMode: !state.isDiscoMode })),
  isMatrixRain: false,
  toggleMatrixRain: () => set((state) => ({ isMatrixRain: !state.isMatrixRain })),
  isScreensaver: false,
  setScreensaver: (val) => set({ isScreensaver: val }),
  konamiCount: 0,
  increaseKonamiScore: () => set((state) => ({ konamiCount: state.konamiCount + 1 })),
  resetKonamiScore: () => set({ konamiCount: 0 }),
}));
