// libraries
import Loadable from "@loadable/component";

// components
const VerifyCode = Loadable(() => import("@/components/widgets/auth/sign-in/VerifyCode.tsx"));
const RegisterForm = Loadable(() => import("@/components/widgets/auth/sign-in/RegisterForm.tsx"));

import Authentication from "@/components/widgets/auth/sign-in/Authentication.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";

const LoginWithMobile = ({unSetOtpWay}) => {
    const {step, currentStep, resetStep, nextStep, changeStep} = useStep();
    // console.log(step)
    return (
        <>
            {
                currentStep === 1 && (
                    <Authentication
                        unSetOtpWay={unSetOtpWay}
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

export default LoginWithMobile;