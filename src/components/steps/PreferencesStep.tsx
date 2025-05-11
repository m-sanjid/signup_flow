import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Moon, Sun, Monitor } from 'lucide-react';
import { preferencesSchema, PreferencesFormData } from '../../forms/schemas';
import { ToggleField } from '../ui/ToggleField';
import { StepContainer } from '../StepContainer';
import { useOnboardingStore } from '../../store/onboardingStore';

export const PreferencesStep: React.FC = () => {
  const { data, updateData } = useOnboardingStore();
  
  const methods = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      theme: data.theme || 'system',
      emailNotifications: data.emailNotifications ?? true,
      productUpdates: data.productUpdates ?? true,
      marketingEmails: data.marketingEmails ?? false,
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, formState: { isValid }, watch, setValue } = methods;
  const currentTheme = watch('theme');
  
  const onSubmit = (formData: PreferencesFormData) => {
    updateData(formData);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepContainer isValid={isValid} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Theme
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentTheme === 'light' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setValue('theme', 'light', { shouldValidate: true })}
              >
                <Sun size={24} className="text-orange-500 mb-2" />
                <span className="text-sm font-medium">Light</span>
              </div>
              
              <div 
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentTheme === 'dark' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setValue('theme', 'dark', { shouldValidate: true })}
              >
                <Moon size={24} className="text-indigo-500 mb-2" />
                <span className="text-sm font-medium">Dark</span>
              </div>
              
              <div 
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentTheme === 'system' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setValue('theme', 'system', { shouldValidate: true })}
              >
                <Monitor size={24} className="text-gray-500 mb-2" />
                <span className="text-sm font-medium">System</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Notification Preferences
            </label>
            
            <ToggleField
              name="emailNotifications"
              label="Email Notifications"
              description="Receive notifications about your account activity"
            />
            
            <ToggleField
              name="productUpdates"
              label="Product Updates"
              description="Get informed about new features and improvements"
            />
            
            <ToggleField
              name="marketingEmails"
              label="Marketing Emails"
              description="Receive offers, promotions and related marketing materials"
            />
          </div>
        </StepContainer>
      </form>
    </FormProvider>
  );
};