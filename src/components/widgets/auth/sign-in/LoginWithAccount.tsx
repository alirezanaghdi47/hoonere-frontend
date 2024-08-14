// components
import LoginForm from "@/components/widgets/auth/sign-in/LoginForm.tsx";

// modules
import Button from "@/modules/Button";
import Typography from "@/modules/Typography";

const LoginWithAccount = ({setOtpWay}) => {
    return (
        <>
            <LoginForm/>

            <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100">
                <Button
                    textColor="muted"
                    isDense
                    fullWidth
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
                        textColor="success"
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