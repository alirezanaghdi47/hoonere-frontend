// libraries
import {LuPhone} from "react-icons/lu";

// components
import LoginForm from "@/components/widgets/auth/sign-in/LoginForm.tsx";

// modules
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";

const LoginWithAccount = ({setOtpWay}) => {
    return (
        <>
            <LoginForm/>

            <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100">
                <Button
                    textColor="gray-700"
                    isDense
                    fullWidth
                    startIcon={
                        <LuPhone
                            size={20}
                            color="currentColor"
                        />
                    }
                    onClick={setOtpWay}
                >
                    ورود با شماره همراه
                </Button>

                <div className='d-flex justify-content-center align-items-center gap-5 w-100'>
                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                    >
                        اگر حساب کاربری ندارید
                    </Typography>

                    <Button
                        href="/auth/sign-up"
                        textColor="primary"
                        isDense
                        isBold
                    >
                        عضو شوید
                    </Button>
                </div>
            </div>
        </>
    )
}

export default LoginWithAccount;