// components
import Authentication from "@/components/widgets/auth/sign-in/Authentication.tsx";
import VerifyCode from "@/components/widgets/auth/sign-in/VerifyCode.tsx";
import RegisterForm from "@/components/widgets/auth/sign-in/RegisterForm.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";

const LoginWithMobile = ({unSetOtpWay}) => {
    const {step, currentStep,resetStep, nextStep, changeStep} = useStep();
    console.log(step)
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