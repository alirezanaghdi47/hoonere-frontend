// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form";
import SelectBox from "@/modules/SelectBox";
import TextInput from "@/modules/TextInput";
import Textarea from "@/modules/Textarea";
import NumberInput from "@/modules/NumberInput";
import Button from "@/modules/Button";
import ImageInput from "@/modules/ImageInput";
import Alert from "@/modules/Alert";

// services
import {readAllProjectTypeService, readUserInquiryService} from "@/services/publicService";

// stores
import useAuthStore from "@/stores/authStore";

// types
import {IReadUserInquiry} from "@/types/serviceType.ts";

// utils
import {readUserInquirySchema} from "@/utils/validations.ts";

const FormData = ({readProjectAction, updateProjectForm, updateProjectAction}) => {
    const {auth} = useAuthStore();

    const readUserInquiryAction = useMutation({
        mutationFn: (data: IReadUserInquiry) => readUserInquiryService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                updateProjectForm.setFieldValue("producer", data?.data?.user_info?.id.toString());
            }
        }
    });

    const readAllProjectTypeAction = useMutation({
        mutationFn: () => readAllProjectTypeService(),
    });

    const readUserInquiryForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: readProjectAction.data?.data?.project_info?.producer_info?.username ? readProjectAction.data?.data?.project_info?.producer_info.username : "",
            foa_id: "44",
            foa_parent_id: "43",
        },
        validationSchema: readUserInquirySchema,
        onSubmit: async (result) => {
            readUserInquiryAction.mutate(result);
        }
    });

    useLayoutEffect(() => {
        if (!readProjectAction.isPending && readProjectAction.data?.data?.project_info?.producer_info?.username) {
            readUserInquiryAction.mutate({
                username: readProjectAction.data?.data?.project_info?.producer_info?.username,
                foa_id: "44",
                foa_parent_id: "43",
            });
        }
    }, [readProjectAction.isPending]);

    useLayoutEffect(() => {
        readAllProjectTypeAction.mutate();
    }, []);

    return (
        <div className="row gy-5 w-100">
            <div className="col-12 col-md-6 d-flex flex-column justify-content-start align-items-center gap-5">
                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="لوگو"
                                        color="dark"
                                        size="sm"
                                    />

                                    <ImageInput
                                        id="logo"
                                        name="logo"
                                        preview={readProjectAction.data?.data?.project_info?.logo}
                                        value={updateProjectForm.values.logo}
                                        onChange={(value) => updateProjectForm.setFieldValue("logo", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.logo}
                                        touched={updateProjectForm.touched.logo}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="نوع"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <SelectBox
                                        id="type_id"
                                        name="type_id"
                                        value={updateProjectForm.values.type_id}
                                        options={(!readAllProjectTypeAction.isPending && readAllProjectTypeAction.data) ? readAllProjectTypeAction.data?.data?.projectTypes?.map(projectType => ({
                                            label: projectType.title,
                                            value: projectType.id.toString()
                                        })) : []}
                                        isSearchable
                                        onChange={(value) => updateProjectForm.setFieldValue("type_id", value)}
                                        isLoading={readAllProjectTypeAction.isPending}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.type_id}
                                        touched={updateProjectForm.touched.type_id}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 d-flex flex-column justify-content-start align-items-center gap-5">
                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="عنوان"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={updateProjectForm.values.title}
                                        onChange={(value) => updateProjectForm.setFieldValue("title", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.title}
                                        touched={updateProjectForm.touched.title}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="توضیحات"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={updateProjectForm.values.description}
                                        onChange={(value) => updateProjectForm.setFieldValue("description", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.description}
                                        touched={updateProjectForm.touched.description}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12 col-sm-6 col-md-12">
                                <Form.Group>
                                    <Form.Label
                                        label="تعداد قسمت ها"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <NumberInput
                                        id="count_of_parts"
                                        name="count_of_parts"
                                        options={{
                                            numericOnly: true,
                                            blocks: [3],
                                            delimiter: '',
                                        }}
                                        value={updateProjectForm.values.count_of_parts}
                                        onChange={(value) => updateProjectForm.setFieldValue("count_of_parts", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.count_of_parts}
                                        touched={updateProjectForm.touched.count_of_parts}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-sm-6 col-md-12">
                                <Form.Group>
                                    <Form.Label
                                        label="زمان هر قسمت ( دقیقه )"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <NumberInput
                                        id="time_of_parts"
                                        name="time_of_parts"
                                        options={{
                                            numericOnly: true,
                                            blocks: [3],
                                            delimiter: '',
                                        }}
                                        value={updateProjectForm.values.time_of_parts}
                                        onChange={(value) => updateProjectForm.setFieldValue("time_of_parts", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.time_of_parts}
                                        touched={updateProjectForm.touched.time_of_parts}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12 d-flex flex-column justify-content-center align-items-start gap-5">
                                <Form.Group>
                                    <Form.Label
                                        label="تهیه کننده"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <TextInput
                                        id="username"
                                        name="username"
                                        value={readUserInquiryForm.values.username}
                                        disabled={readUserInquiryAction.isPending}
                                        onChange={(value) => readUserInquiryForm.setFieldValue("username", value)}
                                        onBlur={() => readUserInquiryForm.handleSubmit()}
                                        isLoading={readUserInquiryAction.isPending}
                                    />

                                    <Form.Error
                                        error={readUserInquiryForm.errors.username || updateProjectForm.errors.producer}
                                        touched={readUserInquiryForm.touched.username || updateProjectForm.touched.producer}
                                    />
                                </Form.Group>

                                {
                                    (!readUserInquiryAction.isPending && readUserInquiryAction.data) && (
                                        <Alert
                                            color={readUserInquiryAction.data?.error ? "danger" : "success"}
                                            size="sm"
                                            message={readUserInquiryAction?.data?.data?.user_info ? readUserInquiryAction?.data?.data?.user_info?.user_type === "1" ? `${readUserInquiryAction.data?.data?.user_info?.first_name} ${readUserInquiryAction.data?.data?.user_info?.last_name}` : `${readUserInquiryAction.data?.data?.user_info?.company_name}` : "کاربری با این مشخصات یافت نشد"}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="محل فیلم برداری"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <Textarea
                                        id="location"
                                        name="location"
                                        value={updateProjectForm.values.location}
                                        onChange={(value) => updateProjectForm.setFieldValue("location", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectForm.errors.location}
                                        touched={updateProjectForm.touched.location}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + "projects"}
                        color="light-danger"
                    >
                        انصراف
                    </Button>

                    <Button
                        color="warning"
                        onClick={updateProjectForm.handleSubmit}
                        isLoading={updateProjectAction.isPending}
                    >
                        ویراش پروژه
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormData;