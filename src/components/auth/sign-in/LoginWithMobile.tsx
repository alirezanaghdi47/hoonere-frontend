// libraries
import {useNavigate} from "react-router-dom";
import {useStep} from "usehooks-ts";

// components
import Captcha from "@/components/auth/Captcha.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Button from "@/modules/Button.tsx";
import CodeInput from "@/modules/CodeInput.tsx";

const Authentication = ({unSetMobileWay , goToNextStep}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xl"
                isBold
                color="dark"
                className="mb-4"
            >
                ورود
            </Typography>

            <NumberInput
                name="phoneNumber"
                placeholder="تلفن همراه"
                value={null}
                onChange={(e) => console.log(e.target.value)}
            />

            <Captcha
                value={null}
                onChange={(e) => console.log(e.target.value)}
                onResend={() => console.log("resend")}
            />

            <div className='d-flex justify-content-center align-items-center gap-5 w-100'>
                <Button
                    textColor="gray-700"
                    direction="start"
                    isDense
                    fullWidth
                    startIcon="far fa-user"
                    onClick={unSetMobileWay}
                >
                    ورود با حساب کاربری
                </Button>

                <Button
                    color="success"
                    fullWidth
                    startIcon="far fa-shield"
                    onClick={goToNextStep}
                >
                    اعتبارسنجی
                </Button>
            </div>
        </div>
    )
}

const VerifyCode = ({goToPrevStep}) => {
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xl"
                isBold
                color="dark"
                className="mb-4"
            >
                ورود
            </Typography>

            <CodeInput
                name="verifyCode"
                placeholder="کد اعتبارسنجی"
                value={null}
                onChange={(e) => console.log(e.target.value)}
                onResend={() => console.log("resend")}
            />

            <div className='d-flex justify-content-center align-items-center gap-5 w-100'>
                <Button
                    textColor="danger"
                    direction="start"
                    isDense
                    fullWidth
                    startIcon="far fa-arrow-right"
                    onClick={goToPrevStep}
                >
                    بازگشت
                </Button>

                <Button
                    color="success"
                    fullWidth
                    endIcon="far fa-arrow-left"
                    onClick={() => navigate(0)}
                >
                    ادامه
                </Button>
            </div>
        </div>
    )
}

const LoginWithMobile = ({unSetMobileWay}) => {
    const [currentStep, {
        goToNextStep,
        goToPrevStep,
    }] = useStep(3);

    return (
        <>
            {
                currentStep === 1 && (
                    <Authentication
                        unSetMobileWay={unSetMobileWay}
                        goToNextStep={goToNextStep}
                    />
                )
            }

            {
                currentStep === 2 && (
                    <VerifyCode goToPrevStep={goToPrevStep}/>
                )
            }
        </>
    )
}

export default LoginWithMobile;