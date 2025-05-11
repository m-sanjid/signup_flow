import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingData, OnboardingStore } from '../types/onboarding';

// Mock API call
const mockSubmitData = async (data: Partial<OnboardingData>): Promise<void> => {
  console.log('Submitting data:', data);
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      data: {},
      currentStepIndex: 0,
      isSubmitting: false,
      isSuccess: false,
      updateData: (newData) => {
        set((state) => ({
          data: {
            ...state.data,
            ...newData,
          },
        }));
      },
      nextStep: () => {
        set((state) => ({
          currentStepIndex: Math.min(state.currentStepIndex + 1, 4),
        }));
      },
      prevStep: () => {
        set((state) => ({
          currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
        }));
      },
      goToStep: (index) => {
        set({ currentStepIndex: index });
      },
      reset: () => {
        set({ data: {}, currentStepIndex: 0, isSubmitting: false, isSuccess: false });
      },
      submitData: async () => {
        set({ isSubmitting: true });
        try {
          await mockSubmitData(get().data);
          set({ isSuccess: true, isSubmitting: false });
        } catch (error) {
          console.error('Failed to submit data:', error);
          set({ isSubmitting: false });
        }
      },
    }),
    {
      name: 'onboarding-storage',
    }
  )
);