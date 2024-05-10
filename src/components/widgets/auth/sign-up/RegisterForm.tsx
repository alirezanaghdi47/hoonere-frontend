// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuUserPlus, LuX} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {registerService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {registerSchema} from "@/utils/validations.ts";

const RegisterForm = ({resetStep}) => {
    const navigate = useNavigate();
    const {auth , changeStatusId} = useAuthStore();

    const registerAction = useMutation({
        mutationFn: (data) => registerService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                changeStatusId(data.data.status_id);

                navigate(auth.panel_url + "dashboard");
            } else {
                toast("error", data.message);
            }
        }
    });

    const registerForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: auth.username ? auth.username : "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (result) => {
            registerAction.mutate(result);
        }
    });

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
                    value={registerForm.values.username}
                    onChange={(value) => registerForm.setFieldValue("username" , value)}
                />

                <Form.Error
                    error={registerForm.errors.username}
                    touched={registerForm.touched.username}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="password"
                    placeholder="رمز عبور"
                    value={registerForm.values.password}
                    onChange={(value) => registerForm.setFieldValue("password" , value)}
                />

                <Form.Error
                    error={registerForm.errors.password}
                    touched={registerForm.touched.password}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="password_confirmation"
                    placeholder="تکرار رمز عبور"
                    value={registerForm.values.password_confirmation}
                    onChange={(value) => registerForm.setFieldValue("password_confirmation" , value)}
                />

                <Form.Error
                    error={registerForm.errors.password_confirmation}
                    touched={registerForm.touched.password_confirmation}
                />
            </Form.Group>

            <div className='d-flex justify-content-center align-items-center gap-5 w-100'>
                <Button
                    textColor="danger"
                    direction="start"
                    isDense
                    fullWidth
                    startIcon={
                        <LuX
                            size={20}
                            color="currentColor"
                        />
                    }
                    onClick={resetStep}
                >
                    انصراف
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
                    onClick={registerForm.handleSubmit}
                    isLoading={registerAction.isPending}
                >
                    عضویت
                </Button>
            </div>
        </div>
    )
}

export default RegisterForm;