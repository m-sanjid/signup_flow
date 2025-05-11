import { z } from 'zod';

// Personal Info Schema
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be less than 50 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be less than 50 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

// Company Info Schema
export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(100, { message: 'Company name must be less than 100 characters' }),
  companySize: z.string().min(1, { message: 'Please select a company size' }),
  jobRole: z.string().min(1, { message: 'Please select a job role' }),
  industry: z.string().min(1, { message: 'Please select an industry' }),
});

// Preferences Schema
export const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  emailNotifications: z.boolean(),
  productUpdates: z.boolean(),
  marketingEmails: z.boolean(),
});

// Avatar Schema
export const avatarSchema = z.object({
  avatarUrl: z.string().min(1, { message: 'Please upload a profile picture' }),
});

// Combined schema for the entire form
export const onboardingSchema = z.object({
  ...personalInfoSchema.shape,
  ...companyInfoSchema.shape,
  ...preferencesSchema.shape,
  ...avatarSchema.shape,
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type AvatarFormData = z.infer<typeof avatarSchema>;
export type OnboardingFormData = z.infer<typeof onboardingSchema>;