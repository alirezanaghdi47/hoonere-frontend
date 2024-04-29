// libraries
import {useNavigate} from "react-router-dom";
import {useStep} from "usehooks-ts";
import {LuArrowLeft, LuArrowRight, LuShield, LuUserPlus} from "react-icons/lu";

// components
import Captcha from "@/modules/Captcha.tsx";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import CodeInput from "@/modules/CodeInput.tsx";
import Form from "@/modules/Form.tsx";

const Authentication = ({goToNextStep}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xxl"
                isBold
                color="dark"
                className="mb-5"
            >
                عضویت
            </Typography>

            <Form.Group>
                <NumberInput
                    name="phoneNumber"
                    placeholder="شماره موبایل"
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
                    href="/auth/sign-in"
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
                >
                    بازگشت
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

const VerifyCode = ({goToNextStep , goToPrevStep}) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
            <Typography
                variant="h1"
                size="xxl"
                isBold
                color="dark"
                className="mb-5"
            >
                عضویت
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
                    onClick={goToNextStep}
                >
                    بعدی
                </Button>
            </div>
        </div>
    )
}

const Register = ({goToPrevStep}) => {
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
                عضویت
            </Typography>

            <Form.Group>
                <TextInput
                    name="username"
                    placeholder="نام کاربری"
                    value={null}
                    onChange={(e) => console.log(e.target.value)}
                />

                <Form.Error
                    error="متن خطا"
                    touched={true}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="password"
                    placeholder="رمز عبور"
                    value={null}
                    onChange={(e) => console.log(e.target.value)}
                />

                <Form.Error
                    error="متن خطا"
                    touched={true}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="passwordRepeat"
                    placeholder="تکرار رمز عبور"
                    value={null}
                    onChange={(e) => console.log(e.target.value)}
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
                    startIcon={
                        <LuUserPlus
                            size={20}
                            color="currentColor"
                        />
                    }
                    onClick={() => navigate("/auth/sign-in")}
                >
                    عضویت
                </Button>
            </div>
        </div>
    )
}

const RegisterWithMobile = () => {
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
                    <Register goToPrevStep={goToPrevStep}/>
                )
            }
        </>
    )
}

export default RegisterWithMobile;