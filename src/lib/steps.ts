import { Step } from '../types/onboarding';

export const steps: Step[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us a bit about yourself',
  },
  {
    id: 'company',
    title: 'Company Details',
    description: 'Information about your organization',
  },
  {
    id: 'preferences',
    title: 'Your Preferences',
    description: 'Customize your experience',
  },
  {
    id: 'avatar',
    title: 'Profile Picture',
    description: 'Add a photo to personalize your account',
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Confirm your information',
  },
];