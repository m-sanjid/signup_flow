import React from 'react';
import { ProgressBar } from './components/ProgressBar';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { CompanyInfoStep } from './components/steps/CompanyInfoStep';
import { PreferencesStep } from './components/steps/PreferencesStep';
import { AvatarStep } from './components/steps/AvatarStep';
import { ReviewStep } from './components/steps/ReviewStep';
import { SuccessScreen } from './components/SuccessScreen';
import { useOnboardingStore } from './store/onboardingStore';
import { steps } from './lib/steps';

function App() {
  const { currentStepIndex, isSuccess } = useOnboardingStore();

  // Reset to default title
  React.useEffect(() => {
    document.title = 'Multi-Step Onboarding Flow';
  }, []);

  // Show appropriate step based on the current index
  const renderCurrentStep = () => {
    if (isSuccess) {
      return <SuccessScreen />;
    }

    switch (currentStepIndex) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <CompanyInfoStep />;
      case 2:
        return <PreferencesStep />;
      case 3:
        return <AvatarStep />;
      case 4:
        return <ReviewStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Create Your Account
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Complete the steps below to set up your account and preferences.
          </p>
        </div>

        <ProgressBar />
        
        {renderCurrentStep()}
      </div>
    </div>
  );
}

export default App;