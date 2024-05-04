// libraries
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuArrowLeft} from "react-icons/lu";

// hooks
import useId from "@/hooks/useId.tsx";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Captcha from "@/modules/Captcha.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {doLoginWithStaticPasswordService, getCaptchaService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {loginWithAccountSchema} from "@/utils/validations.ts";
import {generateRandomNumber, toEnglishDigits} from "@/utils/functions.ts";

const uniqueCode = Date.now() + "_" + generateRandomNumber(1, 1000);

const LoginForm = () => {
    const navigate = useNavigate();
    const {login} = useAuthStore();
    const {uuid, regenerateUUID} = useId();

    const {mutate, isPending} = useMutation({
        mutationFn: (data) => doLoginWithStaticPasswordService(data),
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

    const captcha = useQuery({
        queryKey: ['captcha'],
        queryFn: () => getCaptchaService({id: uuid, code: uniqueCode}),
        enabled: Boolean(uuid)
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
            captcha: "",
            captcha_id: uniqueCode
        },
        validationSchema: loginWithAccountSchema,
        onSubmit: async (result) => {
            mutate({...result , captcha: toEnglishDigits(result.captcha)});
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            regenerateUUID();
            captcha.refetch();
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
                    value={formik.values.username}
                    onChange={(value) => formik.setFieldValue("username", value)}
                />

                <Form.Error
                    error={formik.errors.username}
                    touched={formik.touched.username}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="password"
                    placeholder="رمز عبور"
                    value={formik.values.password}
                    onChange={(value) => formik.setFieldValue("password", value)}
                />

                <Form.Error
                    error={formik.errors.password}
                    touched={formik.touched.password}
                />
            </Form.Group>

            <Form.Group>
                <Captcha
                    name="captcha"
                    value={formik.values.captcha}
                    placeholder="کد امنیتی"
                    preview={captcha.data}
                    isLoading={captcha.isFetching || captcha.isError}
                    onChange={(value) => formik.setFieldValue("captcha", value)}
                    onResend={() => {
                        regenerateUUID();
                        captcha.refetch();
                    }}
                />

                <Form.Error
                    error={formik.errors.captcha}
                    touched={formik.touched.captcha}
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
                onClick={formik.handleSubmit}
                disabled={isPending}
            >
                ادامه
            </Button>
        </div>
    )
}

export default LoginForm;