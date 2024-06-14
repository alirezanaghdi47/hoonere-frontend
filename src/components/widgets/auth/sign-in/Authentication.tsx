// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import toast from "@/helpers/Toast.tsx";

// services
import {authService} from "@/services/authService.ts";

// types
import {IAuth} from "@/types/services.ts";

// utils
import {authSchema} from "@/utils/validations.ts";
import {toEnglishDigits} from "@/utils/functions.ts";

const Authentication = ({unSetOtpWay, nextStep, changeStep}) => {
    const authAction = useMutation({
        mutationFn: (data: IAuth) => authService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                changeStep({
                    mobile: authForm.values.mobile,
                    code: data.data.code
                });

                nextStep();
            } else {
                toast("error", data.message);
            }
        }
    });

    const authForm = useFormik({
        initialValues: {
            mobile: "",
        },
        validationSchema: authSchema,
        onSubmit: async (result) => {
            authAction.mutate({
                mobile: toEnglishDigits(result.mobile)
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
                <NumberInput
                    id="mobile"
                    name="mobile"
                    placeholder="شماره موبایل"
                    value={authForm.values.mobile}
                    onChange={(value) => authForm.setFieldValue("mobile", value)}
                />

                <Form.Error
                    error={authForm.errors.mobile}
                    touched={authForm.touched.mobile}
                />
            </Form.Group>

            <div className='d-flex justify-content-center align-items-center gap-5 w-100'>
                <Button
                    textColor="gray-600"
                    direction="start"
                    isDense
                    fullWidth
                    onClick={unSetOtpWay}
                >
                    ورود با حساب کاربری
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    isLoading={authAction.isPending}
                    onClick={authForm.handleSubmit}
                >
                    اعتبارسنجی
                </Button>
            </div>
        </div>
    )
}

export default Authentication;