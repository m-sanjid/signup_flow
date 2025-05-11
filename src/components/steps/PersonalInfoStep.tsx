import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, PersonalInfoFormData } from '../../forms/schemas';
import { FormField } from '../ui/FormField';
import { StepContainer } from '../StepContainer';
import { useOnboardingStore } from '../../store/onboardingStore';

export const PersonalInfoStep: React.FC = () => {
  const { data, updateData } = useOnboardingStore();
  
  const methods = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      password: data.password || '',
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, formState: { isValid } } = methods;
  
  const onSubmit = (formData: PersonalInfoFormData) => {
    updateData(formData);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepContainer isValid={isValid} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="firstName"
              label="First Name"
              placeholder="John"
              required
            />
            <FormField
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>
          
          <FormField
            name="email"
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            required
          />
          
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Create a secure password"
            required
          />
        </StepContainer>
      </form>
    </FormProvider>
  );
};