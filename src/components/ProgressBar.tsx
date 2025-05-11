import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '../store/onboardingStore';
import { steps } from '../lib/steps';

export const ProgressBar: React.FC = () => {
  const { currentStepIndex } = useOnboardingStore();

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive
                      ? 'border-blue-600 bg-blue-50'
                      : isCompleted
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-gray-300 bg-white'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    transition: { type: 'spring', stiffness: 500, damping: 30 }
                  }}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <span className={`mt-2 text-xs font-medium ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-gray-500'
                } hidden sm:block`}>
                  {step.title}
                </span>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div className="h-1 bg-gray-200 rounded">
                    <motion.div
                      className="h-full bg-emerald-600 rounded"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: isCompleted ? "100%" : "0%",
                        transition: { duration: 0.5 }
                      }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};