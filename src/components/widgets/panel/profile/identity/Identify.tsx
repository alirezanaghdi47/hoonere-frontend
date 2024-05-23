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
import {updateProfileService} from "@/services/profileService.ts";

// utils
import {updateProfileSchema} from "@/utils/validations.ts";
import {convertGregorianToJalali, convertJalaliToGregorian, toEnglishDigits} from "@/utils/functions.ts";

const Identify = ({readMyProfileAction}) => {
    const updateProfileAction = useMutation({
        mutationFn: (data) => updateProfileService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProfileForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            profile_img: {},
            national_card: {},
            first_name: readMyProfileAction.data?.data?.userInfo?.first_name ? readMyProfileAction.data?.data?.userInfo.first_name : "",
            last_name: readMyProfileAction.data?.data?.userInfo?.last_name ? readMyProfileAction.data?.data?.userInfo.last_name : "",
            national_code: readMyProfileAction.data?.data?.userInfo?.national_code ? readMyProfileAction.data?.data?.userInfo.national_code : "",
            id_code: readMyProfileAction.data?.data?.userInfo?.id_code ? readMyProfileAction.data?.data?.userInfo.id_code : "",
            birthdate: readMyProfileAction.data?.data?.userInfo?.birthdate ? convertGregorianToJalali(readMyProfileAction.data?.data?.userInfo.birthdate) : "",
            email: readMyProfileAction.data?.data?.userInfo?.email ? readMyProfileAction.data?.data?.userInfo.email : "",
            address: readMyProfileAction.data?.data?.userInfo?.address ? readMyProfileAction.data?.data?.userInfo.address : "",
        },
        validationSchema: updateProfileSchema,
        onSubmit: async (result) => {
            updateProfileAction.mutate({
                ...result,
                national_code: toEnglishDigits(result.national_code),
                id_code: toEnglishDigits(result.id_code),
                birthdate: convertJalaliToGregorian(result.birthdate)
            });
        }
    });

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    <div className="row gy-5 w-100">
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
                                    preview={readMyProfileAction.data?.data?.userInfo.profile_img}
                                    value={updateProfileForm.values.profile_img}
                                    onChange={(value) => updateProfileForm.setFieldValue("profile_img", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.profile_img}
                                    touched={updateProfileForm.touched.profile_img}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
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
                                    preview={readMyProfileAction.data?.data?.userInfo.national_card}
                                    value={updateProfileForm.values.national_card}
                                    onChange={(value) => updateProfileForm.setFieldValue("national_card", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.national_card}
                                    touched={updateProfileForm.touched.national_card}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="نام"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    name="first_name"
                                    value={updateProfileForm.values.first_name}
                                    onChange={(value) => updateProfileForm.setFieldValue("first_name", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.first_name}
                                    touched={updateProfileForm.touched.first_name}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="نام خانوادگی"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    name="last_name"
                                    value={updateProfileForm.values.last_name}
                                    onChange={(value) => updateProfileForm.setFieldValue("last_name", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.last_name}
                                    touched={updateProfileForm.touched.last_name}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="شماره شناسنامه"
                                size="sm"
                                color="dark"
                                required
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
                                    value={updateProfileForm.values.id_code}
                                    onChange={(value) => updateProfileForm.setFieldValue("id_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.id_code}
                                    touched={updateProfileForm.touched.id_code}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="کد ملی"
                                size="sm"
                                color="dark"
                                required
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
                                    value={updateProfileForm.values.national_code}
                                    onChange={(value) => updateProfileForm.setFieldValue("national_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.national_code}
                                    touched={updateProfileForm.touched.national_code}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="تاریخ تولد"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <DatePicker
                                    name="birthdate"
                                    value={updateProfileForm.values.birthdate}
                                    onChange={(value) => updateProfileForm.setFieldValue("birthdate", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.birthdate}
                                    touched={updateProfileForm.touched.birthdate}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="ایمیل"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    name="email"
                                    value={updateProfileForm.values.email}
                                    onChange={(value) => updateProfileForm.setFieldValue("email", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.email}
                                    touched={updateProfileForm.touched.email}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="آدرس"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <Textarea
                                    name="address"
                                    value={updateProfileForm.values.address}
                                    onChange={(value) => updateProfileForm.setFieldValue("address", value)}
                                />

                                <Form.Error
                                    error={updateProfileForm.errors.address}
                                    touched={updateProfileForm.touched.address}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="primary"
                    onClick={updateProfileForm.handleSubmit}
                    isLoading={updateProfileAction.isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default Identify;