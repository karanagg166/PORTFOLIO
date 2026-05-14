import { create } from 'zustand';

interface PortfolioState {
  projectFilter: 'All' | 'Frontend' | 'Backend' | 'Full Stack';
  setProjectFilter: (filter: 'All' | 'Frontend' | 'Backend' | 'Full Stack') => void;
  activeTerminalTab: string;
  setActiveTerminalTab: (tab: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  projectFilter: 'All',
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  activeTerminalTab: 'whoami',
  setActiveTerminalTab: (tab) => set({ activeTerminalTab: tab }),
}));
