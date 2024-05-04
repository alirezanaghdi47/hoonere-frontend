// libraries
import {useState} from "react";

const useStep = (initialData = null, stepper = 1) => {
    const [step, setStep] = useState(initialData);
    const [currentStep, setCurrentStep] = useState(stepper);

    const changeStep = (value) => setStep(value);

    const nextStep = () => setCurrentStep(prev => prev + 1);

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const resetStep = () => {
        setStep(initialData);
        setCurrentStep(stepper);
    }

    return {step, changeStep, resetStep, currentStep, nextStep, prevStep}
}

export default useStep;