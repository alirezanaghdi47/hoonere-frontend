// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// modules
import TextInput from "@/modules/TextInput";
import PasswordInput from "@/modules/PasswordInput";
import Button from "@/modules/Button";
import Typography from "@/modules/Typography";
import Form from "@/modules/Form";
import Toast from "@/modules/Toast";

// services
import {registerService , IRegister} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const registerSchema = Yup.object().shape({
    username: Yup.string().trim().matches(/^[a-zA-Z0-9_.\-@]+$/, "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8, "تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40, "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نامک کاربری الزامی است"),
    password: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    password_confirmation: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "تکرار رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").oneOf([Yup.ref('password'), null], "رمز عبور با تکرار آن یکسان نیست").required("تکرار رمز عبور الزامی است"),
});

const RegisterForm = ({resetStep}) => {
    const navigate = useNavigate();
    const {auth , changeStatusId} = useAuthStore();

    const registerAction = useMutation({
        mutationFn: (data: IRegister) => registerService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                changeStatusId(data.data.status_id);

                navigate(auth.panel_url ? auth.panel_url + "dashboard" : "/panel/dashboard");
            } else {
                Toast("error", data.message);
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