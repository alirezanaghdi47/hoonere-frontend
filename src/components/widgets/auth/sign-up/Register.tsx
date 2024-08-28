// libraries
import Loadable from "@loadable/component";

// components
const VerifyCode = Loadable(() => import("@/components/widgets/auth/sign-up/VerifyCode.tsx"));
const RegisterForm = Loadable(() => import("@/components/widgets/auth/sign-up/RegisterForm.tsx"));

import Authentication from "@/components/widgets/auth/sign-up/Authentication.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";

const Register = () => {
    const {step, currentStep,resetStep, nextStep, changeStep} = useStep();
    // console.log(step)
    return (
        <>
            {
                currentStep === 1 && (
                    <Authentication
                        nextStep={nextStep}
                        changeStep={changeStep}
                    />
                )
            }

            {
                currentStep === 2 && (
                    <VerifyCode
                        nextStep={nextStep}
                        resetStep={resetStep}
                        step={step}
                    />
                )
            }

            {
                currentStep === 3 && (
                    <RegisterForm resetStep={resetStep}/>
                )
            }
        </>
    )
}

export default Register;