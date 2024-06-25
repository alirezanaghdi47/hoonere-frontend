// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import CreateFieldFormData from "@/components/widgets/panel/projects/read/screen-plays/update/CreateFieldFormData.tsx";
import Fields from "@/components/widgets/panel/projects/read/screen-plays/update/Fields.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Textarea from "@/modules/Textarea.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import TextEditor from "@/modules/TextEditor.tsx";
import Button from "@/modules/Button.tsx";

// services
import {readAllScreenPlayLocationSide, readAllScreenPlayTimeType} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const FormData = ({updateProjectScreenPlayForm, updateProjectScreenPlayAction}) => {
    const params = useParams();
    const {auth} = useAuthStore();
    const {currentPart, resetPart, changeCurrentPart} = usePart(null, "read");

    const readAllScreenPlayTimeTypeAction = useMutation({
        mutationFn: () => readAllScreenPlayTimeType(),
    });

    const readAllScreenPlayLocationSideAction = useMutation({
        mutationFn: () => readAllScreenPlayLocationSide(),
    });

    useLayoutEffect(() => {
        readAllScreenPlayTimeTypeAction.mutate();
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

                                    <TextEditor
                                        id="description"
                                        name="description"
                                        value={updateProjectScreenPlayForm.values.description}
                                        onChange={(value) => updateProjectScreenPlayForm.setFieldValue("description", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectScreenPlayForm.errors.description}
                                        touched={updateProjectScreenPlayForm.touched.description}
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
                                        value={updateProjectScreenPlayForm.values.address}
                                        onChange={(value) => updateProjectScreenPlayForm.setFieldValue("address", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectScreenPlayForm.errors.address}
                                        touched={updateProjectScreenPlayForm.touched.address}
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
                                        value={updateProjectScreenPlayForm.values.time_type_id}
                                        options={(!readAllScreenPlayTimeTypeAction.isPending && readAllScreenPlayTimeTypeAction.data) ? readAllScreenPlayTimeTypeAction.data?.data?.screenplay_time_types?.map(screenplay_time_type => ({
                                            label: screenplay_time_type.title,
                                            value: screenplay_time_type.id.toString()
                                        })) : []}
                                        placeholder=""
                                        isSearchable
                                        onChange={(value) => updateProjectScreenPlayForm.setFieldValue("time_type_id", value)}
                                        isLoading={readAllScreenPlayTimeTypeAction.isPending}
                                    />

                                    <Form.Error
                                        error={updateProjectScreenPlayForm.errors.time_type_id}
                                        touched={updateProjectScreenPlayForm.touched.time_type_id}
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
                                        value={updateProjectScreenPlayForm.values.location_side_id}
                                        options={(!readAllScreenPlayLocationSideAction.isPending && readAllScreenPlayLocationSideAction.data) ? readAllScreenPlayLocationSideAction.data?.data?.screenplay_location_sides?.map(screenplay_location_side => ({
                                            label: screenplay_location_side.title,
                                            value: screenplay_location_side.id.toString()
                                        })) : []}
                                        placeholder=""
                                        isSearchable
                                        onChange={(value) => updateProjectScreenPlayForm.setFieldValue("location_side_id", value)}
                                        isLoading={readAllScreenPlayLocationSideAction.isPending}
                                    />

                                    <Form.Error
                                        error={updateProjectScreenPlayForm.errors.location_side_id}
                                        touched={updateProjectScreenPlayForm.touched.location_side_id}
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
                                        label="بخش"
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
                                        value={updateProjectScreenPlayForm.values.part}
                                        onChange={(value) => updateProjectScreenPlayForm.setFieldValue("part", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectScreenPlayForm.errors.part}
                                        touched={updateProjectScreenPlayForm.touched.part}
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
                                        value={updateProjectScreenPlayForm.values.sequence}
                                        onChange={(value) => updateProjectScreenPlayForm.setFieldValue("sequence", value)}
                                    />

                                    <Form.Error
                                        error={updateProjectScreenPlayForm.errors.sequence}
                                        touched={updateProjectScreenPlayForm.touched.sequence}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    currentPart === "read" && (
                        <Fields
                            updateProjectScreenPlayForm={updateProjectScreenPlayForm}
                            changeCurrentPart={changeCurrentPart}
                        />
                    )
                }

                {
                    currentPart === "create" && (
                        <CreateFieldFormData
                            updateProjectScreenPlayForm={updateProjectScreenPlayForm}
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
                        color="warning"
                        onClick={updateProjectScreenPlayForm.handleSubmit}
                        isLoading={updateProjectScreenPlayAction.isPending}
                    >
                        ویرایش فیلم نامه
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormData;