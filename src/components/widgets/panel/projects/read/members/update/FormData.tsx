// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// modules
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import Alert from "@/modules/Alert.tsx";

// services
import {readAllJobService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const FormDataWithUserName = ({readAllJobAction, readProjectMemberAction, updateProjectMemberFormWithUserName}) => {
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
                                value={updateProjectMemberFormWithUserName.values.foa_parent_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                onChange={(value) => updateProjectMemberFormWithUserName.setFieldValue("foa_parent_id", value)}
                            />

                            <Form.Error
                                error={updateProjectMemberFormWithUserName.errors.foa_parent_id}
                                touched={updateProjectMemberFormWithUserName.touched.foa_parent_id}
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
                                value={updateProjectMemberFormWithUserName.values.foa_child_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && Number(foa.parent_id) === Number(updateProjectMemberFormWithUserName.values.foa_parent_id))?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                disabled={!updateProjectMemberFormWithUserName.values.foa_parent_id}
                                onChange={(value) => updateProjectMemberFormWithUserName.setFieldValue("foa_child_id", value)}
                            />

                            <Form.Error
                                error={updateProjectMemberFormWithUserName.errors.foa_child_id}
                                touched={updateProjectMemberFormWithUserName.touched.foa_child_id}
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
                                value={readProjectMemberAction?.data?.data?.member_info?.user_info?.username}
                                disabled
                            />
                        </Form.Group>

                        <Alert
                            color="success"
                            size="sm"
                            message={`${readProjectMemberAction?.data?.data?.member_info?.user_info?.first_name} ${readProjectMemberAction?.data?.data?.member_info?.user_info?.last_name}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const FormDataWithFullName = ({readAllJobAction, updateProjectMemberFormWithFullName}) => {
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
                                value={updateProjectMemberFormWithFullName.values.foa_parent_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                onChange={(value) => updateProjectMemberFormWithFullName.setFieldValue("foa_parent_id", value)}
                            />

                            <Form.Error
                                error={updateProjectMemberFormWithFullName.errors.foa_parent_id}
                                touched={updateProjectMemberFormWithFullName.touched.foa_parent_id}
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
                                value={updateProjectMemberFormWithFullName.values.foa_child_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && Number(foa.parent_id) === Number(updateProjectMemberFormWithFullName.values.foa_parent_id))?.map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                disabled={!updateProjectMemberFormWithFullName.values.foa_parent_id}
                                onChange={(value) => updateProjectMemberFormWithFullName.setFieldValue("foa_child_id", value)}
                            />

                            <Form.Error
                                error={updateProjectMemberFormWithFullName.errors.foa_child_id}
                                touched={updateProjectMemberFormWithFullName.touched.foa_child_id}
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
                                value={updateProjectMemberFormWithFullName.values.name}
                                onChange={(value) => updateProjectMemberFormWithFullName.setFieldValue("name", value)}
                            />

                            <Form.Error
                                error={updateProjectMemberFormWithFullName.errors.name}
                                touched={updateProjectMemberFormWithFullName.touched.name}
                            />
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FormData = ({
                      readProjectMemberAction,
                      updateProjectMemberFormWithUserName,
                      updateProjectMemberFormWithFullName,
                      updateProjectMemberAction,
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
                (!readProjectMemberAction.isPending && !readProjectMemberAction.data?.data?.member_info?.user_info?.username) ? (
                    <FormDataWithFullName
                        readAllJobAction={readAllJobAction}
                        updateProjectMemberFormWithFullName={updateProjectMemberFormWithFullName}
                    />
                ) : (
                    <FormDataWithUserName
                        readAllJobAction={readAllJobAction}
                        readProjectMemberAction={readProjectMemberAction}
                        updateProjectMemberFormWithUserName={updateProjectMemberFormWithUserName}
                    />
                )
            }

            <div className="d-flex flex-column justify-content-between align-items-center gap-5 w-100">
                <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + "projects/" + params.id + "/members"}
                        color="light-danger"
                    >
                        انصراف
                    </Button>

                    <Button
                        color="warning"
                        onClick={() => (!readProjectMemberAction.isPending && !readProjectMemberAction.data?.data?.member_info?.user_info?.username) ? updateProjectMemberFormWithFullName.handleSubmit() : updateProjectMemberFormWithUserName.handleSubmit()}
                        isLoading={updateProjectMemberAction.isPending}
                    >
                        ویرایش عضو
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FormData;