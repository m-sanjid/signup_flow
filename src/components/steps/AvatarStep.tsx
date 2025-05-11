import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { avatarSchema, AvatarFormData } from '../../forms/schemas';
import { StepContainer } from '../StepContainer';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Button } from '../ui/Button';

export const AvatarStep: React.FC = () => {
  const { data, updateData } = useOnboardingStore();
  const [isDragging, setIsDragging] = useState(false);
  
  // For demo, we'll use a placeholder image
  const defaultAvatarUrl = data.avatarUrl || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg';
  
  const methods = useForm<AvatarFormData>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatarUrl: data.avatarUrl || '',
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, formState: { isValid }, setValue, watch } = methods;
  const avatarUrl = watch('avatarUrl');
  
  const onSubmit = (formData: AvatarFormData) => {
    updateData(formData);
  };
  
  const handleFileUpload = () => {
    // In a real app, this would handle file upload to a server
    // For demo purposes, we'll just use the default avatar
    setValue('avatarUrl', defaultAvatarUrl, { shouldValidate: true });
  };
  
  const handleClear = () => {
    setValue('avatarUrl', '', { shouldValidate: true });
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // In a real app, this would handle the dropped file
    // For demo purposes, we'll just use the default avatar
    setValue('avatarUrl', defaultAvatarUrl, { shouldValidate: true });
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepContainer isValid={isValid} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
            {avatarUrl ? (
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4"
                >
                  <img 
                    src={avatarUrl} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  onClick={handleClear}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <Upload size={48} className="text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 text-center mb-4">
                  Drag & drop your photo here, or click to select
                </p>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleFileUpload}
                >
                  Select Image
                </Button>
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-4">
              For best results, use an image at least 200x200 pixels in .jpg or .png format
            </p>
          </div>
        </StepContainer>
      </form>
    </FormProvider>
  );
};