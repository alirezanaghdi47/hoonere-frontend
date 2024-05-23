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

const FormData = ({readProjectMemberAction, updateProjectMemberForm, updateProjectMemberAction,}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const readUserInquiryAction = useMutation({
        mutationFn: (data) => readUserInquiryService(data),
        onSuccess: async (data) => {
            if (!data?.error) {
                updateProjectMemberForm.setFieldValue("user_id", data?.data?.user_info?.id.toString());
            }
        }
    });

    const readUserInquiryForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: readProjectMemberAction.data?.data?.member_info?.user_info?.username ? readProjectMemberAction.data?.data?.member_info?.user_info.username : "",
            foa_id: updateProjectMemberForm.values.foa_child_id,
            foa_parent_id: updateProjectMemberForm.values.foa_parent_id,
        },
        validationSchema: readUserInquirySchema,
        onSubmit: async (result) => {
            readUserInquiryAction.mutate(result);
        }
    });

    useLayoutEffect(() => {
        if (!readProjectMemberAction.isPending && readProjectMemberAction.data?.data?.member_info?.user_info?.username) {
            readUserInquiryAction.mutate({
                username: readProjectMemberAction.data?.data?.member_info?.user_info?.username,
                foa_id: readProjectMemberAction?.data?.data?.member_info.foa_child_id,
                foa_parent_id: readProjectMemberAction?.data?.data?.member_info.foa_parent_id,
            });
        }
    }, [readProjectMemberAction.isPending]);

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
                                    value={updateProjectMemberForm.values.foa_parent_id}
                                    options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                                        label: item.title,
                                        value: item.id.toString()
                                    }))}
                                    placeholder=""
                                    isSearchable
                                    onChange={(value) => updateProjectMemberForm.setFieldValue("foa_parent_id", value)}
                                />

                                <Form.Error
                                    error={updateProjectMemberForm.errors.foa_parent_id}
                                    touched={updateProjectMemberForm.touched.foa_parent_id}
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
                                    value={updateProjectMemberForm.values.foa_child_id}
                                    options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && parseInt(foa.parent_id) === parseInt(updateProjectMemberForm.values.foa_parent_id))?.map(item => ({
                                        label: item.title,
                                        value: item.id.toString()
                                    }))}
                                    placeholder=""
                                    isSearchable
                                    disabled={!updateProjectMemberForm.values.foa_parent_id}
                                    onChange={(value) => updateProjectMemberForm.setFieldValue("foa_child_id", value)}
                                />

                                <Form.Error
                                    error={updateProjectMemberForm.errors.foa_child_id}
                                    touched={updateProjectMemberForm.touched.foa_child_id}
                                />
                            </Form.Group>
                        </div>

                        {
                            !readProjectMemberAction.isPending && !readProjectMemberAction.data?.data?.member_info?.user_info?.username ? (
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
                                            value={updateProjectMemberForm.values.name}
                                            onChange={(value) => updateProjectMemberForm.setFieldValue("name", value)}
                                        />

                                        <Form.Error
                                            error={updateProjectMemberForm.errors.name}
                                            touched={updateProjectMemberForm.touched.name}
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
                                            disabled={!readUserInquiryForm.values.foa_id || readProjectMemberAction.data?.data?.member_info?.user_info?.username}
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
                                            error={readUserInquiryForm.errors.username || updateProjectMemberForm.errors.user_id}
                                            touched={readUserInquiryForm.touched.username || updateProjectMemberForm.touched.user_id}
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
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column justify-content-between align-items-center w-100">
                <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + "projects/" + params.id + "/members"}
                        color="light-danger"
                    >
                        انصراف
                    </Button>

                    <Button
                        color="warning"
                        onClick={updateProjectMemberForm.handleSubmit}
                        isLoading={updateProjectMemberAction.isPending}
                    >
                        ویرایش عضو
                    </Button>
                </div>
            </div>

            <Tooltip/>
        </>
    )
}

export default FormData;