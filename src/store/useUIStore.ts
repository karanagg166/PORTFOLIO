import { create } from 'zustand';

interface UIState {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  cursorVariant: 'default' | 'hover' | 'typing';
  setCursorVariant: (variant: 'default' | 'hover' | 'typing') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  setLoading: (val) => set({ isLoading: val }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
