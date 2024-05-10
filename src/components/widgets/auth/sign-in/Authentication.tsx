// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuShield, LuUser} from "react-icons/lu";

// modules
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {authService} from "@/services/authService.ts";

// utils
import {authSchema} from "@/utils/validations.ts";
import {toEnglishDigits} from "@/utils/functions.ts";

const Authentication = ({unSetOtpWay, nextStep, changeStep}) => {
    const authAction = useMutation({
        mutationFn: (data) => authService(data),
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
            authAction.mutate({...result, mobile: toEnglishDigits(result.mobile)});
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
                    textColor="gray-700"
                    direction="start"
                    isDense
                    fullWidth
                    startIcon={
                        <LuUser
                            size={20}
                            color="currentColor"
                        />
                    }
                    onClick={unSetOtpWay}
                >
                    ورود با حساب کاربری
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    startIcon={
                        <LuShield
                            size={20}
                            color="currentColor"
                        />
                    }
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