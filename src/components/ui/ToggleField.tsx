import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

interface ToggleFieldProps {
  name: string;
  label: string;
  description?: string;
  className?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  name,
  label,
  description,
  className = '',
}) => {
  const { register, watch } = useFormContext();
  const value = watch(name);

  return (
    <div className={`flex items-start mb-4 ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={name}
          type="checkbox"
          className="hidden"
          {...register(name)}
        />
        <motion.div 
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            value ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          onClick={() => {}} // The register handles this
          whileTap={{ scale: 0.9 }}
        >
          <motion.div 
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              value ? 'translate-x-5' : 'translate-x-0'
            }`}
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          />
        </motion.div>
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};