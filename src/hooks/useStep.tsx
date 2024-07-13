// libraries
import {useState} from "react";

const useStep = <T,>(initialData = null, activeStep = 1) => {
    const [step, setStep] = useState<T>(initialData);
    const [currentStep, setCurrentStep] = useState<number>(activeStep);

    const changeStep = (value: T) => setStep(value);

    const nextStep = () => setCurrentStep(prev => prev + 1);

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const resetStep = () => {
        setStep(initialData);
        setCurrentStep(activeStep);
    }

    return {step, changeStep, resetStep, currentStep, nextStep, prevStep}
}

export default useStep;