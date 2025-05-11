import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  className = '',
  required = false,
  children,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {children || (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errorMessage ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
      
      {errorMessage && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
};