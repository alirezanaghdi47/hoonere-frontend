// libraries
import {useMutation} from "@tanstack/react-query";
import {LuInfo} from "react-icons/lu";

// modules
import Form from "@/modules/Form";
import TextInput from "@/modules/TextInput";
import Textarea from "@/modules/Textarea";
import NumberInput from "@/modules/NumberInput";
import ImageInput from "@/modules/ImageInput";
import Button from "@/modules/Button";
import DatePicker from "@/modules/DatePicker";
import Dialog from "@/modules/Dialog";
import Toast from "@/modules/Toast";

// services
import {deleteProfileFileService , IDeleteProfileFile} from "@/services/profileService.ts";

const RealFormData = ({
                          changeCurrentPart,
                          readMyProfileAction,
                          updateProfileRealForm,
                          updateProfileIdentityAction
                      }) => {
    const deleteProfileFileAction = useMutation({
        mutationFn: (data: IDeleteProfileFile) => deleteProfileFileService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                Toast("error", data.message);
            }
        }
    });

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    {
                        readMyProfileAction.data?.data?.user_info?.status.id === 1 && (
                            <div className="row gy-5 w-100">
                                <div className="col-12">
                                    <Button
                                        color="light-info"
                                        size="sm"
                                        onClick={() => changeCurrentPart("legal")}
                                        className="ms-auto"
                                    >
                                        تغییر به شخصیت حقوقی
                                    </Button>
                                </div>
                            </div>
                        )
                    }

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <div className='d-flex justify-content-start align-items-center w-100 gap-5'>
                                <Form.Label
                                    label="تصویر پروفایل"
                                    size="sm"
                                    color="dark"
                                />

                                <span
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="حداکثر حجم تصویر پروفایل ارسالی 1 مگابایت و فرمت های (png , jpg , jpeg) قابل قبول است"
                                >
                                    <LuInfo
                                        size={20}
                                        color="currentColor"
                                        className="text-info"
                                    />
                                </span>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <ImageInput
                                    id="profile_img"
                                    name="profile_img"
                                    isCircle
                                    preview={readMyProfileAction.data?.data?.user_info?.profile_img ? readMyProfileAction.data?.data?.user_info?.profile_img_asset : null}
                                    value={updateProfileRealForm.values.profile_img}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("profile_img", value)}
                                    onRemove={() => Dialog(
                                        "حذف تصویر پروفایل",
                                        "آیا میخواهید تصویر پروفایل را حذف کنید ؟",
                                        "info",
                                        {
                                            show: true,
                                            text: "حذف",
                                            color: "danger",
                                        },
                                        {
                                            show: true,
                                            text: "انصراف",
                                            color: "light-dark",
                                        },
                                        async () => deleteProfileFileAction.mutate({file_type: "profile_img"})
                                    )}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.profile_img}
                                    touched={updateProfileRealForm.touched.profile_img}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <div className='d-flex justify-content-start align-items-center w-100 gap-5'>
                                <Form.Label
                                    label="تصویر جلو کارت ملی"
                                    size="sm"
                                    color="dark"
                                />

                                <span
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="حداکثر حجم تصویر جلو کارت ملی ارسالی 2 مگابایت و فرمت های (png , jpg , jpeg) قابل قبول است"
                                >
                                    <LuInfo
                                        size={20}
                                        color="currentColor"
                                        className="text-info"
                                    />
                                </span>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <ImageInput
                                    id="national_card"
                                    name="national_card"
                                    preview={readMyProfileAction.data?.data?.user_info?.national_card ? readMyProfileAction.data?.data?.user_info?.national_card_asset : null}
                                    value={updateProfileRealForm.values.national_card}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("national_card", value)}
                                    onRemove={() => Dialog(
                                        "حذف تصویر جلو کارت ملی",
                                        "آیا میخواهید تصویر جلو کارت ملی را حذف کنید ؟",
                                        "info",
                                        {
                                            show: true,
                                            text: "حذف",
                                            color: "danger",
                                        },
                                        {
                                            show: true,
                                            text: "انصراف",
                                            color: "light-dark",
                                        },
                                        async () => deleteProfileFileAction.mutate({file_type: "national_card"})
                                    )}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.national_card}
                                    touched={updateProfileRealForm.touched.national_card}
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
                                    value={updateProfileRealForm.values.username}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("username", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.username}
                                    touched={updateProfileRealForm.touched.username}
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
                                    value={updateProfileRealForm.values.first_name}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("first_name", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.first_name}
                                    touched={updateProfileRealForm.touched.first_name}
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
                                    value={updateProfileRealForm.values.last_name}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("last_name", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.last_name}
                                    touched={updateProfileRealForm.touched.last_name}
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
                                    value={updateProfileRealForm.values.id_code}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("id_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.id_code}
                                    touched={updateProfileRealForm.touched.id_code}
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
                                    value={updateProfileRealForm.values.national_code}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("national_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.national_code}
                                    touched={updateProfileRealForm.touched.national_code}
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
                                    value={updateProfileRealForm.values.birthdate}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("birthdate", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.birthdate}
                                    touched={updateProfileRealForm.touched.birthdate}
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
                                    value={updateProfileRealForm.values.email}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("email", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.email}
                                    touched={updateProfileRealForm.touched.email}
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
                                    value={updateProfileRealForm.values.address}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("address", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.address}
                                    touched={updateProfileRealForm.touched.address}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-5 w-100">
                        <div className="col-lg-4">
                            <Form.Label
                                label="کد پستی"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <NumberInput
                                    id="postal_code"
                                    name="postal_code"
                                    options={{
                                        numericOnly: true,
                                        delimiter: '',
                                    }}
                                    value={updateProfileRealForm.values.postal_code}
                                    onChange={(value) => updateProfileRealForm.setFieldValue("postal_code", value)}
                                />

                                <Form.Error
                                    error={updateProfileRealForm.errors.postal_code}
                                    touched={updateProfileRealForm.touched.postal_code}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="success"
                    onClick={updateProfileRealForm.handleSubmit}
                    isLoading={updateProfileIdentityAction.isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default RealFormData;