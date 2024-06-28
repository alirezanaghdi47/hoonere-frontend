// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// helpers
import toast from "@/helpers/toast.tsx";

// modules
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import CodeInput from "@/modules/CodeInput.tsx";
import Form from "@/modules/Form.tsx";

// services
import {verifyService, authService} from "@/services/authService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IAuth, IVerify} from "@/types/serviceType.ts";

// utils
import {verifySchema} from "@/utils/validations.ts";
import {toEnglishDigits} from "@/utils/functions.ts";

const VerifyCode = ({nextStep, resetStep, step}) => {
    const navigate = useNavigate();
    const {login} = useAuthStore();

    const verifyAction = useMutation({
        mutationFn: (data: IVerify) => verifyService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                login({
                    token: data.data.token,
                    username: data.data.username,
                    panel_url: data.data.panel_url,
                    status_id: data.data.status_id,
                });

                if (parseInt(data.data.status_id) > 1) {
                    navigate(data.data.panel_url + "dashboard");
                } else {
                    nextStep();
                }
            } else {
                toast("error", data.message);
            }
        }
    });

    const authAction = useMutation({
        mutationFn: (data: IAuth) => authService(data),
        onSuccess: async (data) => {
            console.log(data.data)
            if (!data.error) {
                toast("success", data.message);
            } else {
                toast("error", data.message);
            }
        }
    });

    const verifyForm = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: verifySchema,
        onSubmit: async (result) => {
            verifyAction.mutate({
                code: toEnglishDigits(result.code),
                mobile: step.mobile
            });
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
                ورود
            </Typography>

            <Form.Group>
                <CodeInput
                    id="code"
                    name="code"
                    placeholder="کد اعتبارسنجی"
                    value={verifyForm.values.code}
                    onChange={(value) => verifyForm.setFieldValue("code", value)}
                    onResend={() => authAction.mutate({mobile: step.mobile})}
                />

                <Form.Error
                    error={verifyForm.errors.code}
                    touched={verifyForm.touched.code}
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
                    بازگشت
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    onClick={verifyForm.handleSubmit}
                    isLoading={verifyAction.isPending}
                >
                    بعدی
                </Button>
            </div>
        </div>
    )
}

export default VerifyCode;