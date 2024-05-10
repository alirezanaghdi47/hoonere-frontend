// libraries
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuArrowLeft} from "react-icons/lu";

// components
import Captcha from "@/components/widgets/auth/sign-in/Captcha.tsx";

// hooks
import useId from "@/hooks/useId.tsx";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {loginService, captchaService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {loginSchema} from "@/utils/validations.ts";
import {generateRandomNumber, toEnglishDigits} from "@/utils/functions.ts";

const uniqueCode = Date.now() + "_" + generateRandomNumber(1, 1000);

const LoginForm = () => {
    const navigate = useNavigate();
    const {login} = useAuthStore();
    const {uuid, regenerateUUID} = useId();

    const loginAction = useMutation({
        mutationFn: (data) => loginService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                login({
                    token: data.data.token,
                    username: data.data.username,
                    panel_url: data.data.panel_url,
                    status_id: data.data.status_id,
                });

                navigate(data.data.panel_url + "dashboard");
            } else {
                toast("error", data.message);
            }
        }
    });

    const captchaAction = useQuery({
        queryKey: ['captcha'],
        queryFn: () => captchaService({id: uuid, code: uniqueCode}),
        enabled: Boolean(uuid)
    });

    const loginForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
            captcha: "",
            captcha_id: uniqueCode
        },
        validationSchema: loginSchema,
        onSubmit: async (result) => {
            loginAction.mutate({...result , captcha: toEnglishDigits(result.captcha)});
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            regenerateUUID();
            captchaAction.refetch();
        }, 6 * 10 * 1000);

        return () => clearInterval(interval);
    }, []);

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
                    value={loginForm.values.username}
                    onChange={(value) => loginForm.setFieldValue("username", value)}
                />

                <Form.Error
                    error={loginForm.errors.username}
                    touched={loginForm.touched.username}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="password"
                    placeholder="رمز عبور"
                    value={loginForm.values.password}
                    onChange={(value) => loginForm.setFieldValue("password", value)}
                />

                <Form.Error
                    error={loginForm.errors.password}
                    touched={loginForm.touched.password}
                />
            </Form.Group>

            <Form.Group>
                <Captcha
                    name="captcha"
                    value={loginForm.values.captcha}
                    placeholder="کد امنیتی"
                    preview={captchaAction.data}
                    isLoading={captchaAction.isFetching || captchaAction.isError}
                    onChange={(value) => loginForm.setFieldValue("captcha", value)}
                    onResend={() => {
                        regenerateUUID();
                        captchaAction.refetch();
                    }}
                />

                <Form.Error
                    error={loginForm.errors.captcha}
                    touched={loginForm.touched.captcha}
                />
            </Form.Group>

            <Button
                color="primary"
                fullWidth
                endIcon={
                    <LuArrowLeft
                        size={20}
                        color="currentColor"
                    />
                }
                onClick={loginForm.handleSubmit}
                isLoading={loginAction.isPending}
            >
                ادامه
            </Button>
        </div>
    )
}

export default LoginForm;