// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import FileInput from "@/modules/FileInput.tsx";
import DatePicker from "@/modules/DatePicker.tsx";
import Form from "@/modules/Form.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import Textarea from "@/modules/Textarea.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import AvatarInput from "@/modules/AvatarInput.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {updateIdentityService} from "@/services/profileService.ts";

// utils
import {profileIdentitySchema} from "@/utils/validations.ts";
import {toEnglishDigits} from "@/utils/functions.ts";

const Identify = ({me}) => {
    const {mutate, isPending} = useMutation({
        mutationFn: (data) => updateIdentityService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
            } else {
                toast("error", data.message);
            }
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            profile_img: {},
            national_card: {},
            first_name: me?.data?.data?.userInfo?.first_name ? me?.data?.data?.userInfo?.first_name : "",
            last_name: me?.data?.data?.userInfo?.last_name ? me?.data?.data?.userInfo?.last_name : "",
            id_code: me?.data?.data?.userInfo?.id_code ? me?.data?.data?.userInfo?.id_code : "",
            national_code: me?.data?.data?.userInfo?.national_code ? me?.data?.data?.userInfo?.national_code : "",
            birthdate: me?.data?.data?.userInfo?.birthdate ? me?.data?.data?.userInfo?.birthdate : "",
            email: me?.data?.data?.userInfo?.email ? me?.data?.data?.userInfo?.email : "",
            address: me?.data?.data?.userInfo?.address ? me?.data?.data?.userInfo?.address : "",
        },
        validationSchema: profileIdentitySchema,
        onSubmit: async (result) => {
            mutate({
                ...result,
                id_code: toEnglishDigits(result.id_code),
                national_code: toEnglishDigits(result.national_code)
            });
        }
    });

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column gap-5">
                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="عکس پروفایل"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <AvatarInput
                                    name="profile_img"
                                    // preview={avatar}
                                    value={formik.values.profile_img}
                                    onChange={(value) => formik.setFieldValue("profile_img", value)}
                                />

                                <Form.Error
                                    error={formik.errors.profile_img}
                                    touched={formik.touched.profile_img}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="تصویر جلو کارت ملی"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <FileInput
                                    name="national_card"
                                    // preview={avatar}
                                    value={formik.values.national_card}
                                    onChange={(value) => formik.setFieldValue("national_card", value)}
                                />

                                <Form.Error
                                    error={formik.errors.national_card}
                                    touched={formik.touched.national_card}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="نام"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={(value) => formik.setFieldValue("first_name", value)}
                                />

                                <Form.Error
                                    error={formik.errors.first_name}
                                    touched={formik.touched.first_name}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="نام خانوادگی"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={(value) => formik.setFieldValue("last_name", value)}
                                />

                                <Form.Error
                                    error={formik.errors.last_name}
                                    touched={formik.touched.last_name}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="کد ملی"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <NumberInput
                                    name="id_code"
                                    options={{
                                        numericOnly: true,
                                        delimiter: '',
                                    }}
                                    value={formik.values.id_code}
                                    onChange={(value) => formik.setFieldValue("id_code", value)}
                                />

                                <Form.Error
                                    error={formik.errors.id_code}
                                    touched={formik.touched.id_code}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="شماره شناسنامه"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <NumberInput
                                    name="national_code"
                                    options={{
                                        numericOnly: true,
                                        delimiter: '',
                                    }}
                                    value={formik.values.national_code}
                                    onChange={(value) => formik.setFieldValue("national_code", value)}
                                />

                                <Form.Error
                                    error={formik.errors.national_code}
                                    touched={formik.touched.national_code}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="تاریخ تولد"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <DatePicker
                                    name="birthdate"
                                    value={formik.values.birthdate}
                                    onChange={(value) => formik.setFieldValue("birthdate", value)}
                                />

                                <Form.Error
                                    error={formik.errors.birthdate}
                                    touched={formik.touched.birthdate}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="ایمیل"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    name="email"
                                    value={formik.values.email}
                                    onChange={(value) => formik.setFieldValue("email", value)}
                                />

                                <Form.Error
                                    error={formik.errors.email}
                                    touched={formik.touched.email}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="آدرس"
                                size="sm"
                                color="dark"
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <Textarea
                                    name="address"
                                    value={formik.values.address}
                                    onChange={(value) => formik.setFieldValue("address", value)}
                                />

                                <Form.Error
                                    error={formik.errors.address}
                                    touched={formik.touched.address}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="primary"
                    onClick={formik.handleSubmit}
                    disabled={isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default Identify;