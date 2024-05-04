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
import {completeRegisterService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {registerCreateAccountSchema} from "@/utils/validations.ts";

const RegisterForm = ({resetStep}) => {
    const navigate = useNavigate();
    const {auth , changeStatusId} = useAuthStore();

    const {mutate, isPending} = useMutation({
        mutationFn: (data) => completeRegisterService(data),
        onSuccess: async (data) => {
            console.log(data);
            if (!data.error) {
                toast("success", data.message);

                changeStatusId(data.data.status_id);

                navigate(auth.panel_url + "dashboard");
            } else {
                toast("error", data.message);
            }
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: auth.username ? auth.username : "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: registerCreateAccountSchema,
        onSubmit: async (result) => {
            mutate(result);
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
                    value={formik.values.username}
                    onChange={(value) => formik.setFieldValue("username" , value)}
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
                    onChange={(value) => formik.setFieldValue("password" , value)}
                />

                <Form.Error
                    error={formik.errors.password}
                    touched={formik.touched.password}
                />
            </Form.Group>

            <Form.Group>
                <PasswordInput
                    name="password_confirmation"
                    placeholder="تکرار رمز عبور"
                    value={formik.values.password_confirmation}
                    onChange={(value) => formik.setFieldValue("password_confirmation" , value)}
                />

                <Form.Error
                    error={formik.errors.password_confirmation}
                    touched={formik.touched.password_confirmation}
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
                    onClick={formik.handleSubmit}
                    disabled={isPending}
                >
                    عضویت
                </Button>
            </div>
        </div>
    )
}

export default RegisterForm;