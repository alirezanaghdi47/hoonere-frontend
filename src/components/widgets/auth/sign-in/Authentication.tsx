// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// modules
import Button from "@/modules/Button";
import Typography from "@/modules/Typography";
import NumberInput from "@/modules/NumberInput";
import Form from "@/modules/Form";
import Toast from "@/modules/Toast";

// services
import {authService , IAuth} from "@/services/authService.ts";

const authSchema = Yup.object().shape({
    mobile: Yup.string().trim().matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/, "فرمت شماره موبایل نادرست است").required("شماره موبایل الزامی است"),
});

const Authentication = ({unSetOtpWay, nextStep, changeStep}) => {
    const authAction = useMutation({
        mutationFn: (data: IAuth) => authService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                changeStep({
                    mobile: authForm.values.mobile,
                    code: data.data.code
                });

                nextStep();
            } else {
                Toast("error", data.message);
            }
        }
    });

    const authForm = useFormik({
        initialValues: {
            mobile: "",
        },
        validationSchema: authSchema,
        onSubmit: async (result) => {
            authAction.mutate(result);
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
                    textColor="muted"
                    direction="start"
                    isDense
                    fullWidth
                    onClick={unSetOtpWay}
                >
                    ورود با حساب کاربری
                </Button>

                <Button
                    color="success"
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