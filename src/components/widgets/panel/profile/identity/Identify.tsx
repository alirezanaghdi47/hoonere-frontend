// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// helpers
import toast from "@/helpers/toast.tsx";

// modules
import DatePicker from "@/modules/DatePicker.tsx";
import Form from "@/modules/Form.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import Textarea from "@/modules/Textarea.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import ImageInput from "@/modules/ImageInput.tsx";

// services
import {updateProfileIdentityService} from "@/services/profileService.ts";

// types
import {IUpdateProfileIdentity} from "@/types/serviceType.ts";

// utils
import {updateProfileIdentitySchema} from "@/utils/validations.ts";

const Identify = ({readMyProfileAction}) => {
    const updateProfileIdentityAction = useMutation({
        mutationFn: (data: IUpdateProfileIdentity) => updateProfileIdentityService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProfileIdentityForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            profile_img: {},
            national_card: {},
            username: readMyProfileAction.data?.data?.user_info?.username ? readMyProfileAction.data?.data?.user_info.username : "",
            first_name: readMyProfileAction.data?.data?.user_info?.first_name ? readMyProfileAction.data?.data?.user_info.first_name : "",
            last_name: readMyProfileAction.data?.data?.user_info?.last_name ? readMyProfileAction.data?.data?.user_info.last_name : "",
            national_code: readMyProfileAction.data?.data?.user_info?.national_code ? readMyProfileAction.data?.data?.user_info.national_code : "",
            id_code: readMyProfileAction.data?.data?.user_info?.id_code ? readMyProfileAction.data?.data?.user_info.id_code : "",
            birthdate: readMyProfileAction.data?.data?.user_info?.birthdate ? readMyProfileAction.data?.data?.user_info.birthdate : "",
            email: readMyProfileAction.data?.data?.user_info?.email ? readMyProfileAction.data?.data?.user_info.email : "",
            address: readMyProfileAction.data?.data?.user_info?.address ? readMyProfileAction.data?.data?.user_info.address : "",
        },
        validationSchema: updateProfileIdentitySchema,
        onSubmit: async (result) => {
            updateProfileIdentityAction.mutate(result);
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
                                <ImageInput
                                    id="profile_img"
                                    name="profile_img"
                                    isCircle
                                    preview={readMyProfileAction.data?.data?.user_info.profile_img}
                                    value={updateProfileIdentityForm.values.profile_img}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("profile_img", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.profile_img}
                                    touched={updateProfileIdentityForm.touched.profile_img}
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
                                <ImageInput
                                    id="national_card"
                                    name="national_card"
                                    preview={readMyProfileAction.data?.data?.user_info.national_card}
                                    value={updateProfileIdentityForm.values.national_card}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("national_card", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.national_card}
                                    touched={updateProfileIdentityForm.touched.national_card}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="نام کاربری"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <TextInput
                                    id="username"
                                    name="username"
                                    value={updateProfileIdentityForm.values.username}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("username", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.username}
                                    touched={updateProfileIdentityForm.touched.username}
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
                                    id="first_name"
                                    name="first_name"
                                    value={updateProfileIdentityForm.values.first_name}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("first_name", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.first_name}
                                    touched={updateProfileIdentityForm.touched.first_name}
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
                                    id="last_name"
                                    name="last_name"
                                    value={updateProfileIdentityForm.values.last_name}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("last_name", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.last_name}
                                    touched={updateProfileIdentityForm.touched.last_name}
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
                                    id="id_code"
                                    name="id_code"
                                    options={{
                                        numericOnly: true,
                                        delimiter: '',
                                    }}
                                    value={updateProfileIdentityForm.values.id_code}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("id_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.id_code}
                                    touched={updateProfileIdentityForm.touched.id_code}
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
                                    id="national_code"
                                    name="national_code"
                                    options={{
                                        numericOnly: true,
                                        delimiter: '',
                                    }}
                                    value={updateProfileIdentityForm.values.national_code}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("national_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.national_code}
                                    touched={updateProfileIdentityForm.touched.national_code}
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
                                    id="birthdate"
                                    name="birthdate"
                                    value={updateProfileIdentityForm.values.birthdate}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("birthdate", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.birthdate}
                                    touched={updateProfileIdentityForm.touched.birthdate}
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
                                    id="email"
                                    name="email"
                                    value={updateProfileIdentityForm.values.email}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("email", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.email}
                                    touched={updateProfileIdentityForm.touched.email}
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
                                    id="address"
                                    name="address"
                                    value={updateProfileIdentityForm.values.address}
                                    onChange={(value) => updateProfileIdentityForm.setFieldValue("address", value)}
                                />

                                <Form.Error
                                    error={updateProfileIdentityForm.errors.address}
                                    touched={updateProfileIdentityForm.touched.address}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="success"
                    onClick={updateProfileIdentityForm.handleSubmit}
                    isLoading={updateProfileIdentityAction.isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default Identify;