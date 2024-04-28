// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {useMediaQuery} from 'usehooks-ts';

// components
import Captcha from "@/modules/Captcha.tsx";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Toast from "@/modules/Toast.tsx";

// services
import {loginService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {LoginSchema} from "@/utils/validations.ts";

const LoginWithAccount = ({setMobileWay}) => {
    const navigate = useNavigate();
    const {token, login, logout} = useAuthStore();
    const isMobile = useMediaQuery('(max-width: 576px)');

    const {mutate, isPending} = useMutation({
        mutationFn: (data) => loginService(data),
        onSuccess: async (data) => {
            if (data.status === "success") {
                toast.success(data.message);
                navigate("/auth/sign-in");
            } else {
                toast.error(data.message);
            }
        }
    });

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (result) => {
            mutate(result);
        }
    });

    const _handleLogin = () => {
        // login();
        // logout();
        Toast("success", "خوش آمدید");
    }

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
                <TextInput
                    name="username"
                    placeholder="نام کاربری"
                    value={null}
                    onChange={(e) => console.log(e.target.value)}
                />

                <Form.Error
                    error="متن خطا"
                    touched={false}
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
                    touched={false}
                />
            </Form.Group>

            <Captcha
                value={null}
                onChange={(e) => console.log(e.target.value)}
                onResend={() => console.log("resend")}
            />

            <Button
                color="success"
                fullWidth
                endIcon="far fa-arrow-left"
                onClick={_handleLogin}
            >
                ادامه
            </Button>

            <Button
                textColor="gray-700"
                isDense
                fullWidth
                startIcon="far fa-mobile"
                onClick={setMobileWay}
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
    )
}

export default LoginWithAccount;