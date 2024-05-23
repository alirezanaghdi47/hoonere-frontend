// modules
import Button from "@/modules/Button.tsx";
import Form from "@/modules/Form.tsx";
import FileInput from "@/modules/FileInput.tsx";
import Textarea from "@/modules/Textarea.tsx";

const ResumeForm = ({readMyProfileAction , updateOccupationForm}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="رزومه ( عکس یا pdf )"
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <FileInput
                                name="resume_file"
                                preview={readMyProfileAction.data?.data?.userInfo?.resume_file}
                                value={updateOccupationForm.values.resume_file}
                                onChange={(value) => updateOccupationForm.setFieldValue("resume_file", value)}
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
    )
}

const FormData = ({readMyProfileAction ,updateOccupationForm , updateOccupationAction}) => {
    return (
        <>
            <ResumeForm
                readMyProfileAction={readMyProfileAction}
                updateOccupationForm={updateOccupationForm}
            />

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="primary"
                    onClick={updateOccupationForm.handleSubmit}
                    isLoading={updateOccupationAction.isPending}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </>
    )
}

export default FormData;