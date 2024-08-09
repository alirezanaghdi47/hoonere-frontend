// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuInfo} from "react-icons/lu";

// modules
import Form from "@/modules/Form";
import SelectBox from "@/modules/SelectBox";
import TextInput from "@/modules/TextInput";
import Button from "@/modules/Button";
import Alert from "@/modules/Alert";
import SwitchBox from "@/modules/SwitchBox";
import Typography from "@/modules/Typography";

// services
import {readAllJobService, readUserInquiryService} from "@/services/publicService";

// stores
import useAuthStore from "@/stores/authStore";

// types
import {IReadUserInquiry} from "@/types/serviceType.ts";

// utils
import {readUserInquirySchema} from "@/utils/validations.ts";

const FormDataWithUserName = ({readAllJobAction, createProjectMemberFormWithUserName}) => {
    const readUserInquiryAction = useMutation({
        mutationFn: (data: IReadUserInquiry) => readUserInquiryService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                createProjectMemberFormWithUserName.setFieldValue("user_id", data?.data?.user_info?.id.toString());
            }
        }
    });

    const readUserInquiryForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            foa_id: createProjectMemberFormWithUserName.values.foa_child_id,
            foa_parent_id: createProjectMemberFormWithUserName.values.foa_parent_id,
        },
        validationSchema: readUserInquirySchema,
        onSubmit: async (result) => {
            readUserInquiryAction.mutate(result);
        }
    });

    return (
        <div className="card w-100">
            <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="گروه شغلی"
                                color="dark"
                                size="sm"
                                required
                            />

                            <SelectBox
                                id="foa_parent_id"
                                name="foa_parent_id"
                                value={createProjectMemberFormWithUserName.values.foa_parent_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                isSearchable
                                onChange={(value) => createProjectMemberFormWithUserName.setFieldValue("foa_parent_id", value)}
                                isLoading={readAllJobAction.isPending}
                            />

                            <Form.Error
                                error={createProjectMemberFormWithUserName.errors.foa_parent_id}
                                touched={createProjectMemberFormWithUserName.touched.foa_parent_id}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="عنوان شغلی"
                                color="dark"
                                size="sm"
                                required
                            />

                            <SelectBox
                                id="foa_child_id"
                                name="foa_child_id"
                                value={createProjectMemberFormWithUserName.values.foa_child_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && Number(foa.parent_id) === Number(createProjectMemberFormWithUserName.values.foa_parent_id))?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                isSearchable
                                disabled={!createProjectMemberFormWithUserName.values.foa_parent_id}
                                onChange={(value) => createProjectMemberFormWithUserName.setFieldValue("foa_child_id", value)}
                                isLoading={readAllJobAction.isPending}
                            />

                            <Form.Error
                                error={createProjectMemberFormWithUserName.errors.foa_child_id}
                                touched={createProjectMemberFormWithUserName.touched.foa_child_id}
                            />
                        </Form.Group>
                    </div>

                    <div
                        className="col-12 d-flex flex-column justify-content-center align-items-start gap-5">
                        <Form.Group>
                            <Form.Label
                                label="نام کاربری"
                                color="dark"
                                size="sm"
                                required
                            />

                            <TextInput
                                id="username"
                                name="username"
                                value={readUserInquiryForm.values.username}
                                onChange={(value) => readUserInquiryForm.setFieldValue("username", value)}
                                onBlur={() => readUserInquiryForm.handleSubmit()}
                                isLoading={readUserInquiryAction.isPending}
                                disabled={!createProjectMemberFormWithUserName.values.foa_child_id}
                            />

                            <Form.Error
                                error={readUserInquiryForm.errors.username || createProjectMemberFormWithUserName.errors.user_id}
                                touched={readUserInquiryForm.touched.username || createProjectMemberFormWithUserName.touched.user_id}
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
    )
}

const FormDataWithFullName = ({readAllJobAction, createProjectMemberFormWithFullName}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="گروه شغلی"
                                color="dark"
                                size="sm"
                                required
                            />

                            <SelectBox
                                id="foa_parent_id"
                                name="foa_parent_id"
                                value={createProjectMemberFormWithFullName.values.foa_parent_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                isSearchable
                                onChange={(value) => createProjectMemberFormWithFullName.setFieldValue("foa_parent_id", value)}
                            />

                            <Form.Error
                                error={createProjectMemberFormWithFullName.errors.foa_parent_id}
                                touched={createProjectMemberFormWithFullName.touched.foa_parent_id}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="عنوان شغلی"
                                color="dark"
                                size="sm"
                                required
                            />

                            <SelectBox
                                id="foa_child_id"
                                name="foa_child_id"
                                value={createProjectMemberFormWithFullName.values.foa_child_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && Number(foa.parent_id) === Number(createProjectMemberFormWithFullName.values.foa_parent_id))?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                isSearchable
                                disabled={!createProjectMemberFormWithFullName.values.foa_parent_id}
                                onChange={(value) => createProjectMemberFormWithFullName.setFieldValue("foa_child_id", value)}
                            />

                            <Form.Error
                                error={createProjectMemberFormWithFullName.errors.foa_child_id}
                                touched={createProjectMemberFormWithFullName.touched.foa_child_id}
                            />
                        </Form.Group>
                    </div>

                    <div
                        className="col-12 d-flex flex-column justify-content-center align-items-start gap-5">
                        <Form.Group>
                            <Form.Label
                                label="نام و نام خانوادگی"
                                color="dark"
                                size="sm"
                                required
                            />

                            <TextInput
                                id="name"
                                name="name"
                                value={createProjectMemberFormWithFullName.values.name}
                                onChange={(value) => createProjectMemberFormWithFullName.setFieldValue("name", value)}
                                disabled={!createProjectMemberFormWithFullName.values.foa_child_id}
                            />

                            <Form.Error
                                error={createProjectMemberFormWithFullName.errors.name}
                                touched={createProjectMemberFormWithFullName.touched.name}
                            />
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FormData = ({
                      createProjectMemberFormWithUserName,
                      createProjectMemberFormWithFullName,
                      createProjectMemberAction,
                      isFullName,
                      setIsFullName
                  }) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    return (
        <>
            {
                isFullName ? (
                    <FormDataWithFullName
                        readAllJobAction={readAllJobAction}
                        createProjectMemberFormWithFullName={createProjectMemberFormWithFullName}
                    />
                ) : (
                    <FormDataWithUserName
                        readAllJobAction={readAllJobAction}
                        createProjectMemberFormWithUserName={createProjectMemberFormWithUserName}
                    />
                )
            }

            <div className="d-flex flex-column justify-content-between align-items-center gap-5 w-100">
                <div className="d-flex justify-content-start align-items-center gap-5 w-100">
                    <SwitchBox
                        id="isFullName"
                        name="isFullName"
                        value={isFullName}
                        checked={isFullName}
                        onChange={(value) => setIsFullName(value)}
                    />

                    <Typography
                        size="xs"
                        color="dark"
                        isBold
                    >
                        افزودن با نام و نام خانوادگی
                    </Typography>

                    <span
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="اگر شخص مورد نظر شما در سایت عضویت ندارد با فعال کردن این گزینه فرم جدید را تکمیل نمایید"
                    >
                        <LuInfo
                            size={20}
                            color="currentColor"
                            className="text-info"
                        />
                    </span>
                </div>

                <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + "projects/" + params.id + "/members"}
                        color="light-danger"
                    >
                        انصراف
                    </Button>

                    <Button
                        color="success"
                        onClick={() => isFullName ? createProjectMemberFormWithFullName.handleSubmit() : createProjectMemberFormWithUserName.handleSubmit()}
                        isLoading={createProjectMemberAction.isPending}
                    >
                        افزودن عضو
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FormData;