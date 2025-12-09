import { create } from 'zustand';

// Global state management with Zustand
export const useStore = create((set) => ({
  // Mobile menu state
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Active section for navigation
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  // Testimonial carousel state
  currentTestimonial: 0,
  setCurrentTestimonial: (index) => set({ currentTestimonial: index }),
  nextTestimonial: (maxIndex) =>
    set((state) => ({
      currentTestimonial:
        state.currentTestimonial >= maxIndex ? 0 : state.currentTestimonial + 1,
    })),
  prevTestimonial: (maxIndex) =>
    set((state) => ({
      currentTestimonial:
        state.currentTestimonial <= 0 ? maxIndex : state.currentTestimonial - 1,
    })),

  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Modal state (for future use)
  isModalOpen: false,
  modalContent: null,
  openModal: (content) =>
    set({
      isModalOpen: true,
      modalContent: content,
    }),
  closeModal: () =>
    set({
      isModalOpen: false,
      modalContent: null,
    }),
}));
