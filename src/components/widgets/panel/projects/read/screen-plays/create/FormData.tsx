// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import Loadable from "@loadable/component";

// components
const CreateFieldFormData = Loadable(() => import("@/components/widgets/panel/projects/read/screen-plays/create/CreateFieldFormData.tsx"));

import Fields from "@/components/widgets/panel/projects/read/screen-plays/create/Fields.tsx";
import MoodBoardEditor from "@/components/widgets/panel/projects/read/screen-plays/create/MoodBoardEditor.tsx";

// hooks
import usePart from "@/hooks/usePart";
// modules
import Form from "@/modules/Form";
import SelectBox from "@/modules/SelectBox";
import Textarea from "@/modules/Textarea";
import NumberInput from "@/modules/NumberInput";
import Button from "@/modules/Button";

// services
import {readAllScreenPlayTimeTypeService, readAllScreenPlayLocationSideService} from "@/services/publicService";

// stores
import useAuthStore from "@/stores/authStore";

const FormData = ({createProjectScreenPlayForm, createProjectScreenPlayAction}) => {
    const params = useParams();
    const {auth} = useAuthStore();
    const {currentPart, resetPart, changeCurrentPart} = usePart(null, "read");

    const readAllScreenPlayTimeTypeAction = useMutation({
        mutationFn: () => readAllScreenPlayTimeTypeService(),
    });

    const readAllScreenPlayLocationSideAction = useMutation({
        mutationFn: () => readAllScreenPlayLocationSideService(),
    });

    useLayoutEffect(() => {
        readAllScreenPlayTimeTypeAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllScreenPlayLocationSideAction.mutate();
    }, []);

    return (
        <div className="row gy-5 w-100">
            <div className="col-12 col-md-7 d-flex flex-column justify-content-start align-items-center gap-5">
                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="متن"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <MoodBoardEditor
                                        id="description"
                                        name="description"
                                        value={createProjectScreenPlayForm.values.description}
                                        onChange={(value) => createProjectScreenPlayForm.setFieldValue("description", value)}
                                    />

                                    <Form.Error
                                        error={createProjectScreenPlayForm.errors.description}
                                        touched={createProjectScreenPlayForm.touched.description}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-12 col-md-5 d-flex flex-column justify-content-start align-items-center gap-5">
                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="آدرس"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={createProjectScreenPlayForm.values.address}
                                        onChange={(value) => createProjectScreenPlayForm.setFieldValue("address", value)}
                                    />

                                    <Form.Error
                                        error={createProjectScreenPlayForm.errors.address}
                                        touched={createProjectScreenPlayForm.touched.address}
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
                                        label="زمان اجرا"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <SelectBox
                                        id="time_type_id"
                                        name="time_type_id"
                                        value={createProjectScreenPlayForm.values.time_type_id}
                                        options={(!readAllScreenPlayTimeTypeAction.isPending && readAllScreenPlayTimeTypeAction.data) ? readAllScreenPlayTimeTypeAction.data?.data?.screenplay_time_types?.map(screenplay_time_type => ({
                                            label: screenplay_time_type.title,
                                            value: screenplay_time_type.id.toString()
                                        })) : []}
                                        isSearchable
                                        onChange={(value) => createProjectScreenPlayForm.setFieldValue("time_type_id", value)}
                                        isLoading={readAllScreenPlayTimeTypeAction.isPending}
                                    />

                                    <Form.Error
                                        error={createProjectScreenPlayForm.errors.time_type_id}
                                        touched={createProjectScreenPlayForm.touched.time_type_id}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="سمت مکان"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <SelectBox
                                        id="location_side_id"
                                        name="location_side_id"
                                        value={createProjectScreenPlayForm.values.location_side_id}
                                        options={(!readAllScreenPlayLocationSideAction.isPending && readAllScreenPlayLocationSideAction.data) ? readAllScreenPlayLocationSideAction.data?.data?.screenplay_location_sides?.map(screenplay_location_side => ({
                                            label: screenplay_location_side.title,
                                            value: screenplay_location_side.id.toString()
                                        })) : []}
                                        isSearchable
                                        onChange={(value) => createProjectScreenPlayForm.setFieldValue("location_side_id", value)}
                                        isLoading={readAllScreenPlayLocationSideAction.isPending}
                                    />

                                    <Form.Error
                                        error={createProjectScreenPlayForm.errors.location_side_id}
                                        touched={createProjectScreenPlayForm.touched.location_side_id}
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
                                        label="قسمت"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <NumberInput
                                        id="part"
                                        name="part"
                                        options={{
                                            numericOnly: true,
                                            blocks: [3],
                                            delimiter: '',
                                        }}
                                        value={createProjectScreenPlayForm.values.part}
                                        onChange={(value) => createProjectScreenPlayForm.setFieldValue("part", value)}
                                    />

                                    <Form.Error
                                        error={createProjectScreenPlayForm.errors.part}
                                        touched={createProjectScreenPlayForm.touched.part}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12 col-sm-6 col-md-12">
                                <Form.Group>
                                    <Form.Label
                                        label="سکانس"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <NumberInput
                                        id="sequence"
                                        name="sequence"
                                        options={{
                                            numericOnly: true,
                                            blocks: [3],
                                            delimiter: '',
                                        }}
                                        value={createProjectScreenPlayForm.values.sequence}
                                        onChange={(value) => createProjectScreenPlayForm.setFieldValue("sequence", value)}
                                    />

                                    <Form.Error
                                        error={createProjectScreenPlayForm.errors.sequence}
                                        touched={createProjectScreenPlayForm.touched.sequence}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    currentPart === "read" && (
                        <Fields
                            createProjectScreenPlayForm={createProjectScreenPlayForm}
                            changeCurrentPart={changeCurrentPart}
                        />
                    )
                }

                {
                    currentPart === "create" && (
                        <CreateFieldFormData
                            createProjectScreenPlayForm={createProjectScreenPlayForm}
                            resetPart={resetPart}
                        />
                    )
                }

                <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + `projects/${params.id}/screen-plays`}
                        color="light-danger"
                    >
                        انصراف
                    </Button>

                    <Button
                        color="success"
                        onClick={createProjectScreenPlayForm.handleSubmit}
                        isLoading={createProjectScreenPlayAction.isPending}
                    >
                        افزودن فیلم نامه
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormData;