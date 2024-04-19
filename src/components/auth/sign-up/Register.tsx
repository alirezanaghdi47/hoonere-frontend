// libraries
import {useNavigate} from "react-router-dom";
import {useStep} from "usehooks-ts";

// components
import Captcha from "@/components/auth/Captcha.tsx";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import CodeInput from "@/modules/CodeInput.tsx";

const Authentication = ({goToNextStep}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xl"
                isBold
                color="dark"
                className="mb-5"
            >
                عضویت
            </Typography>

            <NumberInput
                name="phoneNumber"
                placeholder="شماره موبایل"
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
                    href="/auth/sign-in"
                    textColor="danger"
                    direction="start"
                    isDense
                    fullWidth
                    startIcon="far fa-arrow-right"
                >
                    بازگشت
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

const VerifyCode = ({goToNextStep , goToPrevStep}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xl"
                isBold
                color="dark"
                className="mb-5"
            >
                عضویت
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
                    onClick={goToNextStep}
                >
                    بعدی
                </Button>
            </div>
        </div>
    )
}

const Form = ({goToPrevStep}) => {
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xl"
                isBold
                color="dark"
                className="mb-5"
            >
                عضویت
            </Typography>

            <TextInput
                name="username"
                placeholder="نام کاربری"
                value={null}
                onChange={(e) => console.log(e.target.value)}
            />

            <PasswordInput
                name="password"
                placeholder="رمز عبور"
                value={null}
                onChange={(e) => console.log(e.target.value)}
            />

            <PasswordInput
                name="passwordRepeat"
                placeholder="تکرار رمز عبور"
                value={null}
                onChange={(e) => console.log(e.target.value)}
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
                    startIcon="far fa-user-plus"
                    onClick={() => navigate("/auth/sign-in")}
                >
                    عضویت
                </Button>
            </div>
        </div>
    )
}

const Register = () => {
    const [currentStep, {
        goToNextStep,
        goToPrevStep,
    }] = useStep(3);

    return (
        <>
            {
                currentStep === 1 && (
                    <Authentication goToNextStep={goToNextStep}/>
                )
            }

            {
                currentStep === 2 && (
                    <VerifyCode
                        goToPrevStep={goToPrevStep}
                        goToNextStep={goToNextStep}
                    />
                )
            }

            {
                currentStep === 3 && (
                    <Form goToPrevStep={goToPrevStep}/>
                )
            }
        </>
    )
}

export default Register;