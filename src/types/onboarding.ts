export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CompanyInfo {
  companyName: string;
  companySize: string;
  jobRole: string;
  industry: string;
}

export interface Preferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  productUpdates: boolean;
  marketingEmails: boolean;
}

export interface AvatarInfo {
  avatarUrl: string;
}

export type OnboardingData = PersonalInfo & CompanyInfo & Preferences & AvatarInfo;

export type StepId = 'personal' | 'company' | 'preferences' | 'avatar' | 'review';

export interface Step {
  id: StepId;
  title: string;
  description: string;
}

export interface OnboardingStore {
  data: Partial<OnboardingData>;
  currentStepIndex: number;
  isSubmitting: boolean;
  isSuccess: boolean;
  updateData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  reset: () => void;
  submitData: () => Promise<void>;
}