import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = 'Select an option',
  className = '',
  required = false,
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
      
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className={`w-full px-4 py-2 border rounded-lg appearance-none pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            errorMessage ? 'border-red-500' : 'border-gray-300'
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>
      
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