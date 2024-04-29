// libraries
import {useNavigate} from "react-router-dom";
import {useStep} from "usehooks-ts";
import {LuArrowLeft, LuArrowRight, LuShield, LuUser} from "react-icons/lu";

// components
import Captcha from "@/modules/Captcha.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Button from "@/modules/Button.tsx";
import CodeInput from "@/modules/CodeInput.tsx";
import Form from "@/modules/Form.tsx";

const Authentication = ({unSetMobileWay , goToNextStep}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xxl"
                isBold
                color="dark"
                className="mb-5"
            >
                ورود
            </Typography>

            <Form.Group>
                <NumberInput
                    name="phoneNumber"
                    placeholder="تلفن همراه"
                    value={null}
                    onChange={(e) => console.log(e.target.value)}
                />

                <Form.Error
                    error="متن خطا"
                    touched={true}
                />
            </Form.Group>

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
                    startIcon={
                        <LuUser
                            size={20}
                            color="currentColor"
                        />
                    }
                    onClick={unSetMobileWay}
                >
                    ورود با حساب کاربری
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    startIcon={
                        <LuShield
                            size={20}
                            color="currentColor"
                        />
                    }
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
                size="xxl"
                isBold
                color="dark"
                className="mb-5"
            >
                ورود
            </Typography>

            <Form.Group>
                <CodeInput
                    name="verifyCode"
                    placeholder="کد اعتبارسنجی"
                    value={null}
                    onChange={(e) => console.log(e.target.value)}
                    onResend={() => console.log("resend")}
                />

                <Form.Error
                    error="متن خطا"
                    touched={true}
                />
            </Form.Group>

            <div className='d-flex justify-content-center align-items-center gap-5 w-100'>
                <Button
                    textColor="danger"
                    direction="start"
                    isDense
                    fullWidth
                    startIcon={
                        <LuArrowRight
                            size={20}
                            color="currentColor"
                        />
                    }
                    onClick={goToPrevStep}
                >
                    بازگشت
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    endIcon={
                        <LuArrowLeft
                            size={20}
                            color="currentColor"
                        />
                    }
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