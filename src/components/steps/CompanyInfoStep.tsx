import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyInfoSchema, CompanyInfoFormData } from '../../forms/schemas';
import { FormField } from '../ui/FormField';
import { SelectField } from '../ui/SelectField';
import { StepContainer } from '../StepContainer';
import { useOnboardingStore } from '../../store/onboardingStore';

const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: 'More than 1000 employees' },
];

const jobRoles = [
  { value: 'executive', label: 'Executive / C-Level' },
  { value: 'director', label: 'Director' },
  { value: 'manager', label: 'Manager' },
  { value: 'individual', label: 'Individual Contributor' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'other', label: 'Other' },
];

const industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
];

export const CompanyInfoStep: React.FC = () => {
  const { data, updateData } = useOnboardingStore();
  
  const methods = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: data.companyName || '',
      companySize: data.companySize || '',
      jobRole: data.jobRole || '',
      industry: data.industry || '',
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, formState: { isValid } } = methods;
  
  const onSubmit = (formData: CompanyInfoFormData) => {
    updateData(formData);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepContainer isValid={isValid} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="companyName"
            label="Company Name"
            placeholder="Acme Inc."
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              name="companySize"
              label="Company Size"
              options={companySizes}
              required
            />
            
            <SelectField
              name="jobRole"
              label="Your Role"
              options={jobRoles}
              required
            />
          </div>
          
          <SelectField
            name="industry"
            label="Industry"
            options={industries}
            required
          />
        </StepContainer>
      </form>
    </FormProvider>
  );
};