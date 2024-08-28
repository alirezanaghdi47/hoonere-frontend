// libraries
import {useMutation} from "@tanstack/react-query";
import {LuInfo} from "react-icons/lu";

// modules
import Button from "@/modules/Button";
import Form from "@/modules/Form";
import Textarea from "@/modules/Textarea";
import FileInput from "@/modules/FileInput";
import Dialog from "@/modules/Dialog";
import Toast from "@/modules/Toast";

// services
import {deleteProfileFileService} from "@/services/profileService.ts";

const ResumeFormData = ({readMyProfileAction ,updateOccupationForm , updateOccupationAction}) => {
    const deleteProfileFileAction = useMutation({
        mutationFn: (data) => deleteProfileFileService(data),
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
                <div className="card-body d-flex flex-column gap-5">
                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <div className='d-flex justify-content-start align-items-center w-100 gap-5'>
                                <Form.Label
                                    label="رزومه ( تصویر یا فایل pdf )"
                                    size="sm"
                                    color="dark"
                                />

                                <span
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="حداکثر حجم رزومه ارسالی 2 مگابایت و فرمت های (png , jpg , jpeg , pdf) قابل قبول است"
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
                                <FileInput
                                    id="resume_file"
                                    name="resume_file"
                                    value={updateOccupationForm.values.resume_file}
                                    preview={readMyProfileAction.data?.data?.user_info?.resume_file ? readMyProfileAction.data?.data?.user_info?.resume_file_asset : null}
                                    onChange={(value) => updateOccupationForm.setFieldValue("resume_file", value)}
                                    onRemove={() => Dialog(
                                        "حذف رزومه",
                                        "آیا میخواهید رزومه را حذف کنید ؟",
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
                                        async () => deleteProfileFileAction.mutate({file_type: "resume_file"})
                                    )}
                                />

                                <Form.Error
                                    error={updateOccupationForm.errors.resume_file}
                                    touched={updateOccupationForm.touched.resume_file}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row gy-2">
                        <div className="col-lg-4">
                            <Form.Label
                                label="رزومه متنی"
                                size="sm"
                                color="dark"
                                required
                            />
                        </div>

                        <div className="col-lg-8">
                            <Form.Group>
                                <Textarea
                                    id="resume_text"
                                    name="resume_text"
                                    value={updateOccupationForm.values.resume_text}
                                    onChange={(value) => updateOccupationForm.setFieldValue("resume_text", value)}
                                />

                                <Form.Error
                                    error={updateOccupationForm.errors.resume_text}
                                    touched={updateOccupationForm.touched.resume_text}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="success"
                    onClick={updateOccupationForm.handleSubmit}
                    isLoading={updateOccupationAction.isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default ResumeFormData;