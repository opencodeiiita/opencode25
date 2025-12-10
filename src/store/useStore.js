import { create } from 'zustand';

export const useStore = create((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
