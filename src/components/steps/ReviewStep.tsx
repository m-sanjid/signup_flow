import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '../../store/onboardingStore';
import { StepContainer } from '../StepContainer';

export const ReviewStep: React.FC = () => {
  const { data, submitData } = useOnboardingStore();
  
  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Name', value: `${data.firstName} ${data.lastName}` },
        { label: 'Email', value: data.email },
      ],
    },
    {
      title: 'Company Details',
      fields: [
        { label: 'Company', value: data.companyName },
        { label: 'Size', value: data.companySize },
        { label: 'Role', value: data.jobRole },
        { label: 'Industry', value: data.industry },
      ],
    },
    {
      title: 'Preferences',
      fields: [
        { label: 'Theme', value: data.theme },
        { label: 'Email Notifications', value: data.emailNotifications ? 'Enabled' : 'Disabled' },
        { label: 'Product Updates', value: data.productUpdates ? 'Enabled' : 'Disabled' },
        { label: 'Marketing Emails', value: data.marketingEmails ? 'Enabled' : 'Disabled' },
      ],
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      } 
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
  };
  
  return (
    <StepContainer onSubmit={submitData}>
      <div className="space-y-6">
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Please review your information before submitting.
        </motion.p>
        
        {data.avatarUrl && (
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                src={data.avatarUrl} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          {sections.map((section) => (
            <motion.div 
              key={section.title}
              variants={itemVariants}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">{section.title}</h3>
              </div>
              <div className="px-4 py-3 divide-y divide-gray-200">
                {section.fields.map((field) => (
                  <div key={field.label} className="py-2 flex justify-between">
                    <span className="text-gray-600">{field.label}</span>
                    <span className="font-medium text-gray-900">{field.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </StepContainer>
  );
};