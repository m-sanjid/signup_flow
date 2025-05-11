import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';
import { useOnboardingStore } from '../store/onboardingStore';

export const SuccessScreen: React.FC = () => {
  const { reset, data } = useOnboardingStore();
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
      >
        <CheckCircle size={80} className="mx-auto text-emerald-500 mb-6" />
      </motion.div>
      
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Welcome aboard, {data.firstName}!
      </motion.h2>
      
      <motion.p
        className="text-gray-600 mb-8 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Your account has been successfully created. We're excited to have you join us!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={reset}
          variant="outline"
          icon={<RefreshCw size={16} />}
          iconPosition="left"
        >
          Start Over
        </Button>
      </motion.div>
    </motion.div>
  );
};