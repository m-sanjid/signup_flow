import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { useOnboardingStore } from '../store/onboardingStore';
import { steps } from '../lib/steps';

interface StepContainerProps {
  children: React.ReactNode;
  isValid?: boolean;
  onSubmit?: () => void;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  isValid = true,
  onSubmit,
}) => {
  const { currentStepIndex, nextStep, prevStep, isSubmitting } = useOnboardingStore();
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  const handleNext = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">{currentStep.title}</h2>
          <p className="text-gray-600 mt-1">{currentStep.description}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            icon={<ArrowLeft size={16} />}
            iconPosition="left"
          >
            Back
          </Button>

          <Button
            variant={isLastStep ? 'secondary' : 'primary'}
            onClick={handleNext}
            disabled={!isValid}
            isLoading={isSubmitting}
            icon={isLastStep ? <Check size={16} /> : <ArrowRight size={16} />}
            iconPosition="right"
          >
            {isLastStep ? 'Submit' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};