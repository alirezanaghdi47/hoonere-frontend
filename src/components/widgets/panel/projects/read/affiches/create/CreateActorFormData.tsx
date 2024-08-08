// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form";
import SelectBox from "@/modules/SelectBox";
import Button from "@/modules/Button";
import TimePicker from "@/modules/TimePicker";
import TextInput from "@/modules/TextInput";

// services
import {readAllProjectMemberByFoaService} from "@/services/projectService";

// types
import {IReadAllProjectMembersByFoa} from "@/types/serviceType.ts";

// utils
import {createProjectAfficheActorSchema} from "@/utils/validations.ts";

const CreateActorFormData = ({createProjectAfficheP2Form, resetPart}) => {
    const params = useParams();

    const readAllProjectMembersByFoaAction = useMutation({
        mutationFn: (data: IReadAllProjectMembersByFoa) => readAllProjectMemberByFoaService(data),
    });

    const createProjectAfficheActorForm = useFormik({
        initialValues: {
            actor_id: "",
            role: "",
            coming_time: "",
            makeup_time: "",
        },
        validationSchema: createProjectAfficheActorSchema,
        onSubmit: async (result) => {
            const user = await readAllProjectMembersByFoaAction.data?.data?.members?.find(member => member.id.toString() === result.actor_id.toString());

            createProjectAfficheP2Form.setFieldValue("actors", [
                ...createProjectAfficheP2Form.values.actors.filter(actor => JSON.stringify(actor) !== JSON.stringify(result)),
                {
                    ...result,
                    foa_parent_id: "159",
                    foa_id: "",
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

    useLayoutEffect(() => {
        readAllProjectMembersByFoaAction.mutate({
            foa_parent_id: "159",
            foa_id: "",
            project_id: params.id
        });
    }, []);

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="بازیگران"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                id="actor_id"
                                name="actor_id"
                                value={createProjectAfficheActorForm.values.actor_id}
                                options={readAllProjectMembersByFoaAction.data?.data?.members?.map(member => {
                                    const name = (member.first_name || member.last_name) ? member.first_name + " " + member.last_name: member.username

                                    return {
                                        label: name,
                                        value: member.id.toString(),
                                    }
                                })}
                                isSearchable
                                onChange={(value) => createProjectAfficheActorForm.setFieldValue("actor_id", value)}
                                isLoading={readAllProjectMembersByFoaAction.isPending}
                            />

                            <Form.Error
                                error={createProjectAfficheActorForm.errors.actor_id}
                                touched={createProjectAfficheActorForm.touched.actor_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نقش"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="role"
                                name="role"
                                value={createProjectAfficheActorForm.values.role}
                                onChange={(value) => createProjectAfficheActorForm.setFieldValue("role", value)}
                            />

                            <Form.Error
                                error={createProjectAfficheActorForm.errors.role}
                                touched={createProjectAfficheActorForm.touched.role}
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
                                value={createProjectAfficheActorForm.values.coming_time}
                                onChange={(value) => createProjectAfficheActorForm.setFieldValue("coming_time", value)}
                            />

                            <Form.Error
                                error={createProjectAfficheActorForm.errors.coming_time}
                                touched={createProjectAfficheActorForm.touched.coming_time}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="ساعت گریم"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TimePicker
                                id="makeup_time"
                                name="makeup_time"
                                value={createProjectAfficheActorForm.values.makeup_time}
                                onChange={(value) => createProjectAfficheActorForm.setFieldValue("makeup_time", value)}
                            />

                            <Form.Error
                                error={createProjectAfficheActorForm.errors.makeup_time}
                                touched={createProjectAfficheActorForm.touched.makeup_time}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createProjectAfficheActorForm.handleReset(createProjectAfficheActorForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="success"
                            onClick={createProjectAfficheActorForm.handleSubmit}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateActorFormData;