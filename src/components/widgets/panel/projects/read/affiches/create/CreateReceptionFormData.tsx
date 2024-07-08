// libraries
import {useEffect, useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Button from "@/modules/Button.tsx";

// services
import {readAllProjectMemberByFoaService} from "@/services/projectService.ts";
import {readAllJobService, readAllReceptionTypeService} from "@/services/publicService.ts";

// types
import {IReadAllProjectMembersByFoa} from "@/types/serviceType.ts";

// utils
import {createProjectAfficheReceptionSchema, createProjectAfficheUserSchema} from "@/utils/validations.ts";

const CreateReceptionFormData = ({createProjectAfficheP2Form, resetPart}) => {
    const params = useParams();

    const readAllProjectMembersByFoaAction = useMutation({
        mutationFn: (data: IReadAllProjectMembersByFoa) => readAllProjectMemberByFoaService(data),
    });

    const readAllReceptionTypeAction = useMutation({
        mutationFn: () => readAllReceptionTypeService(),
    });

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const createProjectAfficheUserForm = useFormik({
        initialValues: {
            foa_parent_id: "",
            foa_id: "",
        },
        validationSchema: createProjectAfficheUserSchema,
        onSubmit: async (result) => {}
    });

    const createProjectAfficheMemberForm = useFormik({
        initialValues: {
            member_id: "",
            reception_type: "",
        },
        validationSchema: createProjectAfficheReceptionSchema,
        onSubmit: async (result) => {
            const user = await readAllProjectMembersByFoaAction.data?.data?.members?.find(member => member.id.toString() === result.member_id.toString());
            const reception = await readAllReceptionTypeAction.data?.data?.reception_types?.find(reception_type => reception_type.id.toString() === result.reception_type.toString());

            createProjectAfficheP2Form.setFieldValue("receptions", [
                ...createProjectAfficheP2Form.values.receptions.filter(reception => JSON.stringify(reception) !== JSON.stringify(result)),
                {
                    ...result,
                    foa_id: createProjectAfficheUserForm.values.foa_parent_id,
                    foa_child_id: user?.foa_child_id,
                    reception_name: reception?.title,
                    full_name: user?.first_name + " " + user?.last_name,
                    is_fake: user?.is_fake
                }
            ]);

            resetPart();
        },
        onReset: async () => {
            resetPart();
        }
    });

    useEffect(() => {
        if (createProjectAfficheUserForm.values.foa_parent_id) {
            readAllProjectMembersByFoaAction.mutate({
                foa_parent_id: createProjectAfficheUserForm.values.foa_parent_id,
                foa_id: createProjectAfficheUserForm.values.foa_id,
                project_id: params.id
            });
        }
    }, [createProjectAfficheUserForm.values]);

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllReceptionTypeAction.mutate()
    }, []);

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="گروه شغلی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                id="foa_parent_id"
                                name="foa_parent_id"
                                value={createProjectAfficheUserForm.values.foa_parent_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null).map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                onChange={(value) => createProjectAfficheUserForm.setFieldValue("foa_parent_id", value)}
                                isLoading={readAllJobAction.isPending}
                            />

                            <Form.Error
                                error={createProjectAfficheUserForm.errors.foa_parent_id}
                                touched={createProjectAfficheUserForm.touched.foa_parent_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عنوان شغلی"
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                id="foa_id"
                                name="foa_id"
                                value={createProjectAfficheUserForm.values.foa_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && foa.parent_id === parseInt(createProjectAfficheUserForm.values.foa_parent_id)).map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                disabled={!createProjectAfficheUserForm.values.foa_parent_id}
                                onChange={(value) => createProjectAfficheUserForm.setFieldValue("foa_id", value)}
                                isLoading={readAllJobAction.isPending}
                            />

                            <Form.Error
                                error={createProjectAfficheUserForm.errors.foa_id}
                                touched={createProjectAfficheUserForm.touched.foa_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عوامل"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                id="member_id"
                                name="member_id"
                                value={createProjectAfficheMemberForm.values.member_id}
                                options={readAllProjectMembersByFoaAction.data?.data?.members?.map(member => {
                                    const name = (member.first_name || member.last_name) ? member.first_name + " " + member.last_name : member.username

                                    return {
                                        label: name,
                                        value: member.id.toString(),
                                    }
                                })}
                                placeholder=""
                                isSearchable
                                disabled={!createProjectAfficheUserForm.values.foa_parent_id}
                                onChange={(value) => createProjectAfficheMemberForm.setFieldValue("member_id", value)}
                                isLoading={readAllProjectMembersByFoaAction.isPending}
                            />

                            <Form.Error
                                error={createProjectAfficheMemberForm.errors.member_id}
                                touched={createProjectAfficheMemberForm.touched.member_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نوع پذیرایی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                id="reception_type"
                                name="reception_type"
                                value={createProjectAfficheMemberForm.values.reception_type}
                                options={readAllReceptionTypeAction.data?.data?.reception_types?.map(reception_type => ({
                                    label: reception_type.title,
                                    value: reception_type.id.toString()
                                }))}
                                placeholder=""
                                isSearchable
                                onChange={(value) => createProjectAfficheMemberForm.setFieldValue("reception_type", value)}
                                isLoading={readAllReceptionTypeAction.isPending}
                            />

                            <Form.Error
                                error={createProjectAfficheMemberForm.errors.reception_type}
                                touched={createProjectAfficheMemberForm.touched.reception_type}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createProjectAfficheMemberForm.handleReset(createProjectAfficheMemberForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="primary"
                            onClick={() => {
                                createProjectAfficheUserForm.handleSubmit();
                                createProjectAfficheMemberForm.handleSubmit();
                            }}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateReceptionFormData;