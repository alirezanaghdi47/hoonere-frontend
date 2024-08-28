// libraries
import {useEffect, useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form";
import SelectBox from "@/modules/SelectBox";
import Button from "@/modules/Button";
import TimePicker from "@/modules/TimePicker";
import Textarea from "@/modules/Textarea";

// services
import {readAllProjectMemberByFoaService} from "@/services/projectService.ts";
import {readAllJobService} from "@/services/publicService.ts";

// types
import {IReadAllProjectMembersByFoa} from "@/types/serviceType.ts";

// utils
import {createProjectAfficheMemberSchema, createProjectAfficheUserSchema} from "@/utils/validations.ts";

const CreateMemberFormData = ({updateProjectAfficheP2Form, resetPart}) => {
    const params = useParams();

    const readAllProjectMembersByFoaAction = useMutation({
        mutationFn: (data: IReadAllProjectMembersByFoa) => readAllProjectMemberByFoaService(data),
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
            coming_time: "",
            description: "",
        },
        validationSchema: createProjectAfficheMemberSchema,
        onSubmit: async (result) => {
            const user = await readAllProjectMembersByFoaAction.data?.data?.members?.find(member => member.id.toString() === result.member_id.toString());

            updateProjectAfficheP2Form.setFieldValue("members", [
                ...updateProjectAfficheP2Form.values.members.filter(member => JSON.stringify(member) !== JSON.stringify(result)),
                {
                    ...result,
                    foa_id: createProjectAfficheUserForm.values.foa_parent_id,
                    foa_child_id: user?.foa_child_id,
                    full_name: user?.is_fake === 0 ? user?.user_type === "1" ? user.first_name + " " + user.last_name : user.company_name : user.first_name + " " + user.last_name,
                    is_fake: user?.is_fake
                }
            ]);

            resetPart();
        },
        onReset: async () => {
            resetPart();
        }
    });

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    useEffect(() => {
        if (createProjectAfficheUserForm.values.foa_parent_id) {
            readAllProjectMembersByFoaAction.mutate({
                foa_parent_id: createProjectAfficheUserForm.values.foa_parent_id,
                foa_id: createProjectAfficheUserForm.values.foa_id,
                project_id: params.id
            });
        }
    }, [createProjectAfficheUserForm.values]);

    useEffect(() => {
        if (createProjectAfficheUserForm.values.foa_parent_id) {
            createProjectAfficheUserForm.setFieldValue("foa_id", "");
            createProjectAfficheMemberForm.setFieldValue("member_id", "");
        }
    }, [createProjectAfficheUserForm.values.foa_parent_id]);

    useEffect(() => {
        if (createProjectAfficheUserForm.values.foa_id) {
            createProjectAfficheMemberForm.setFieldValue("member_id", "");
        }
    }, [createProjectAfficheUserForm.values.foa_id]);

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
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null && ![25, 26, 159].includes(foa.parent_id) && ![25, 26, 159].includes(foa.id)).map(item => ({
                                    label: item.title,
                                    value: item.id.toString()
                                }))}
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
                                    const name = member?.is_fake === 0 ? member?.user_type === "1" ? member.first_name + " " + member.last_name : member.company_name : member.first_name + " " + member.last_name;

                                    return {
                                        label: name,
                                        value: member.id.toString(),
                                    }
                                })}
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
                            label="ساعت حضور"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TimePicker
                                id="coming_time"
                                name="coming_time"
                                value={createProjectAfficheMemberForm.values.coming_time}
                                onChange={(value) => createProjectAfficheMemberForm.setFieldValue("coming_time", value)}
                            />

                            <Form.Error
                                error={createProjectAfficheMemberForm.errors.coming_time}
                                touched={createProjectAfficheMemberForm.touched.coming_time}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="توضیحات"
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <Textarea
                                id="description"
                                name="description"
                                value={createProjectAfficheMemberForm.values.description}
                                onChange={(value) => createProjectAfficheMemberForm.setFieldValue("description", value)}
                            />

                            <Form.Error
                                error={createProjectAfficheMemberForm.errors.description}
                                touched={createProjectAfficheMemberForm.touched.description}
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
                            color="success"
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

export default CreateMemberFormData;