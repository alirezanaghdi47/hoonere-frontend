// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import MoonLoader from "react-spinners/MoonLoader";
import {LuInfo} from "react-icons/lu";

// modules
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import Alert from "@/modules/Alert.tsx";
import SwitchBox from "@/modules/SwitchBox.tsx";
import Typography from "@/modules/Typography.tsx";
import Tooltip from "@/modules/Tooltip.tsx";

// services
import {readAllJobService, readUserInquiryService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {readUserInquirySchema} from "@/utils/validations.ts";

const FormData = ({createProjectMemberForm, createProjectMemberAction, isFullName, setIsFullName}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const readUserInquiryAction = useMutation({
        mutationFn: (data) => readUserInquiryService(data),
        onSuccess: async (data) => {
            if (!data?.error) {
                createProjectMemberForm.setFieldValue("user_id", data?.data?.user_info?.id.toString());
            }
        }
    });

    const readUserInquiryForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            foa_id: createProjectMemberForm.values.foa_child_id,
            foa_parent_id: createProjectMemberForm.values.foa_parent_id,
        },
        validationSchema: readUserInquirySchema,
        onSubmit: async (result) => {
            readUserInquiryAction.mutate(result);
        }
    });

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    return (
        <>
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
                                    name="foa_parent_id"
                                    value={createProjectMemberForm.values.foa_parent_id}
                                    options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                                        label: item.title,
                                        value: item.id.toString()
                                    }))}
                                    placeholder=""
                                    isSearchable
                                    onChange={(value) => createProjectMemberForm.setFieldValue("foa_parent_id", value)}
                                />

                                <Form.Error
                                    error={createProjectMemberForm.errors.foa_parent_id}
                                    touched={createProjectMemberForm.touched.foa_parent_id}
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
                                    name="foa_child_id"
                                    value={createProjectMemberForm.values.foa_child_id}
                                    options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && parseInt(foa.parent_id) === parseInt(createProjectMemberForm.values.foa_parent_id))?.map(item => ({
                                        label: item.title,
                                        value: item.id.toString()
                                    }))}
                                    placeholder=""
                                    isSearchable
                                    disabled={!createProjectMemberForm.values.foa_parent_id}
                                    onChange={(value) => createProjectMemberForm.setFieldValue("foa_child_id", value)}
                                />

                                <Form.Error
                                    error={createProjectMemberForm.errors.foa_child_id}
                                    touched={createProjectMemberForm.touched.foa_child_id}
                                />
                            </Form.Group>
                        </div>

                        {
                            isFullName ? (
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
                                            name="name"
                                            placeholder=""
                                            value={createProjectMemberForm.values.name}
                                            onChange={(value) => createProjectMemberForm.setFieldValue("name", value)}
                                        />

                                        <Form.Error
                                            error={createProjectMemberForm.errors.name}
                                            touched={createProjectMemberForm.touched.name}
                                        />
                                    </Form.Group>
                                </div>
                            ) : (
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
                                            name="username"
                                            placeholder=""
                                            value={readUserInquiryForm.values.username}
                                            disabled={!readUserInquiryForm.values.foa_id}
                                            onChange={(value) => readUserInquiryForm.setFieldValue("username", value)}
                                            onBlur={() => readUserInquiryForm.handleSubmit()}
                                            endAdornment={
                                                readUserInquiryAction.isPending && (
                                                    <MoonLoader
                                                        size={20}
                                                        color="currentColor"
                                                        className="m-1"
                                                    />
                                                )
                                            }
                                        />

                                        <Form.Error
                                            error={readUserInquiryForm.errors.username || createProjectMemberForm.errors.user_id}
                                            touched={readUserInquiryForm.touched.username || createProjectMemberForm.touched.user_id}
                                        />
                                    </Form.Group>

                                    {
                                        (!readUserInquiryAction.isPending && readUserInquiryAction.data) && (
                                            <Alert
                                                color={readUserInquiryAction.data?.error ? "danger" : "success"}
                                                size="sm"
                                                message={readUserInquiryAction?.data?.data?.user_info ? `${readUserInquiryAction.data?.data?.user_info?.first_name} ${readUserInquiryAction.data?.data?.user_info?.last_name}` : "کاربری با این مشخصات یافت نشد"}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column justify-content-between align-items-center w-100">
                <div className="d-flex justify-content-start align-items-center gap-5 w-100">
                    <SwitchBox
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
                        onClick={createProjectMemberForm.handleSubmit}
                        isLoading={createProjectMemberAction.isPending}
                    >
                        افزودن عضو
                    </Button>
                </div>
            </div>

            <Tooltip/>
        </>
    )
}

export default FormData;