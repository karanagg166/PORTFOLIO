import { create } from "zustand";

interface PortfolioState {
    // Theme state
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    // Loading state
    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    // Active section for scroll spy
    activeSection: string;
    setActiveSection: (section: string) => void;

    // Contact form state
    contactFormOpen: boolean;
    openContactForm: () => void;
    closeContactForm: () => void;

    // Project filter
    projectFilter: string;
    setProjectFilter: (filter: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    // Theme
    isDarkMode: true,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    // Loading
    isLoading: true,
    setLoading: (loading) => set({ isLoading: loading }),

    // Active section
    activeSection: "home",
    setActiveSection: (section) => set({ activeSection: section }),

    // Contact form
    contactFormOpen: false,
    openContactForm: () => set({ contactFormOpen: true }),
    closeContactForm: () => set({ contactFormOpen: false }),

    // Project filter
    projectFilter: "all",
    setProjectFilter: (filter) => set({ projectFilter: filter }),
}));
