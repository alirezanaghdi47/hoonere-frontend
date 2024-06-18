// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Textarea from "@/modules/Textarea.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Button from "@/modules/Button.tsx";
import FileInput from "@/modules/FileInput.tsx";
import Alert from "@/modules/Alert.tsx";

// services
import {readAllProjectTypeService, readUserInquiryService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IReadUserInquiry} from "@/types/serviceType.ts";

// utils
import {readUserInquirySchema} from "@/utils/validations.ts";

const FormData = ({createProjectForm, createProjectAction}) => {
    const {auth} = useAuthStore();

    const readUserInquiryAction = useMutation({
        mutationFn: (data: IReadUserInquiry) => readUserInquiryService(data),
        onSuccess: async (data) => {
            if (!data?.error) {
                createProjectForm.setFieldValue("producer", data?.data?.user_info?.id.toString());
            }
        }
    });

    const readAllProjectTypeAction = useMutation({
        mutationFn: () => readAllProjectTypeService(),
    });

    const readUserInquiryForm = useFormik({
        initialValues: {
            username: "",
            foa_id: "44",
            foa_parent_id: "43",
        },
        validationSchema: readUserInquirySchema,
        onSubmit: async (result) => {
            readUserInquiryAction.mutate(result);
        }
    });

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

                                    <FileInput
                                        id="logo"
                                        name="logo"
                                        preview={null}
                                        value={createProjectForm.values.logo}
                                        onChange={(value) => createProjectForm.setFieldValue("logo", value)}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.logo}
                                        touched={createProjectForm.touched.logo}
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
                                        value={createProjectForm.values.type_id}
                                        options={(!readAllProjectTypeAction.isPending && readAllProjectTypeAction.data) ? readAllProjectTypeAction.data?.data?.projectTypes?.map(projectType => ({
                                            label: projectType.title,
                                            value: projectType.id.toString()
                                        })) : []}
                                        placeholder=""
                                        isSearchable
                                        onChange={(value) => createProjectForm.setFieldValue("type_id", value)}
                                        isLoading={readAllProjectTypeAction.isPending}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.type_id}
                                        touched={createProjectForm.touched.type_id}
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
                                        value={createProjectForm.values.title}
                                        onChange={(value) => createProjectForm.setFieldValue("title", value)}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.title}
                                        touched={createProjectForm.touched.title}
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
                                        value={createProjectForm.values.description}
                                        onChange={(value) => createProjectForm.setFieldValue("description", value)}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.description}
                                        touched={createProjectForm.touched.description}
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
                                        value={createProjectForm.values.count_of_parts}
                                        onChange={(value) => createProjectForm.setFieldValue("count_of_parts", value)}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.count_of_parts}
                                        touched={createProjectForm.touched.count_of_parts}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-sm-6 col-md-12">
                                <Form.Group>
                                    <Form.Label
                                        label="مدت زمان هر قسمت ( دقیقه )"
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
                                        value={createProjectForm.values.time_of_parts}
                                        onChange={(value) => createProjectForm.setFieldValue("time_of_parts", value)}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.time_of_parts}
                                        touched={createProjectForm.touched.time_of_parts}
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
                                        label="نام کاربری تهیه کننده"
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
                                        error={readUserInquiryForm.errors.username}
                                        touched={readUserInquiryForm.touched.username}
                                    />
                                </Form.Group>

                                {
                                    (!readUserInquiryAction.isPending && readUserInquiryAction.data) && (
                                        <Alert
                                            color={readUserInquiryAction.data?.error ? "danger" : "success"}
                                            size="sm"
                                            message={readUserInquiryAction.data?.data?.user_info ? `${readUserInquiryAction.data?.data?.user_info?.first_name} ${readUserInquiryAction.data?.data?.user_info?.last_name}` : "کاربری با این مشخصات یافت نشد"}
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
                                        value={createProjectForm.values.location}
                                        onChange={(value) => createProjectForm.setFieldValue("location", value)}
                                    />

                                    <Form.Error
                                        error={createProjectForm.errors.location}
                                        touched={createProjectForm.touched.location}
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
                        color="success"
                        onClick={createProjectForm.handleSubmit}
                        isLoading={createProjectAction.isPending}
                    >
                        افزودن پروژه
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormData;