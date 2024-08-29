// libraries
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import Captcha from "@/components/widgets/auth/Captcha.tsx";

// hooks
import useId from "@/hooks/useId.tsx";

// modules
import TextInput from "@/modules/TextInput";
import PasswordInput from "@/modules/PasswordInput";
import Button from "@/modules/Button";
import Typography from "@/modules/Typography";
import Form from "@/modules/Form";
import Toast from "@/modules/Toast";

// services
import {loginService, captchaService , ILogin} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {generateRandomNumber} from "@/utils/functions.ts";

const loginSchema = Yup.object().shape({
    username: Yup.string().trim().matches(/^[a-zA-Z0-9_.\-@]+$/, "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8, "تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40, "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نام کاربری الزامی است"),
    password: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    captcha: Yup.string().trim().required("کد کپچا الزامی است"),
});

const uniqueCode = Date.now() + "_" + generateRandomNumber(1, 1000);

const LoginForm = () => {
    const navigate = useNavigate();
    const {login} = useAuthStore();
    const {uuid, regenerateUUID} = useId();

    const loginAction = useMutation({
        mutationFn: (data: ILogin) => loginService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                login({
                    token: data.data.token,
                    username: data.data.username,
                    panel_url: data.data.panel_url,
                    status_id: data.data.status_id,
                });

                navigate(data.data.panel_url + "dashboard");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const captchaAction = useQuery({
        queryKey: ['captcha'],
        queryFn: (data) => captchaService({id: uuid, code: uniqueCode}),
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
            loginAction.mutate(result);
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
                    id="username"
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
                    id="password"
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
                    id="captcha"
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
                color="success"
                fullWidth
                onClick={loginForm.handleSubmit}
                isLoading={loginAction.isPending}
            >
                ادامه
            </Button>
        </div>
    )
}

export default LoginForm;