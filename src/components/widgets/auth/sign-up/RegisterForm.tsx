// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// helpers
import toast from "@/helpers/toast.tsx";

// modules
import TextInput from "@/modules/TextInput.tsx";
import PasswordInput from "@/modules/PasswordInput.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";

// services
import {registerService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IRegister} from "@/types/serviceType.ts";

// utils
import {registerSchema} from "@/utils/validations.ts";

const RegisterForm = ({resetStep}) => {
    const navigate = useNavigate();
    const {auth , changeStatusId} = useAuthStore();

    const registerAction = useMutation({
        mutationFn: (data: IRegister) => registerService(data),
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
                    id="username"
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
                    id="password"
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
                    id="password_confirmation"
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
                    onClick={resetStep}
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    fullWidth
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