// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import Loadable from "@loadable/component";

// components
const CreateAddressFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/create/CreateAddressFormData.tsx"));

import Addresses from "@/components/widgets/panel/projects/read/affiches/create/Addresses.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";
// modules
import Form from "@/modules/Form";
import TextInput from "@/modules/TextInput";
import Textarea from "@/modules/Textarea";
import DatePicker from "@/modules/DatePicker";
import TimePicker from "@/modules/TimePicker";
import SwitchBox from "@/modules/SwitchBox";
import SelectBox from "@/modules/SelectBox";
import Button from "@/modules/Button";

// services
import {
    readAllAfficheTypeService,
    readAllScreenPlayLocationSideService,
    readAllScreenPlayTimeTypeService
} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const FormDataP1 = ({createProjectAfficheP1Form}) => {
    const params = useParams();
    const {auth} = useAuthStore();
    const {currentPart, resetPart, changeCurrentPart} = usePart(null, "read");

    const readAllScreenPlayTimeTypeAction = useMutation({
        mutationFn: () => readAllScreenPlayTimeTypeService(),
    });

    const readAllScreenPlayLocationSideAction = useMutation({
        mutationFn: () => readAllScreenPlayLocationSideService(),
    });

    const readAllAfficheTypeAction = useMutation({
        mutationFn: () => readAllAfficheTypeService(),
    });

    useLayoutEffect(() => {
        readAllAfficheTypeAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllScreenPlayTimeTypeAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllScreenPlayLocationSideAction.mutate();
    }, []);

    return (
        <div className="row gy-5 w-100">
            <div className="col-12 col-md-7 d-flex flex-column justify-content-start align-items-center gap-5">
                {
                    currentPart === "read" && (
                        <Addresses
                            createProjectAfficheP1Form={createProjectAfficheP1Form}
                            changeCurrentPart={changeCurrentPart}
                        />
                    )
                }

                {
                    currentPart === "create" && (
                        <CreateAddressFormData
                            createProjectAfficheP1Form={createProjectAfficheP1Form}
                            resetPart={resetPart}
                        />
                    )
                }

                <div className="card w-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                        <div className="row gy-5 w-100">
                            {
                                !createProjectAfficheP1Form.values.auto_motivation_sentence && (
                                    <div className="col-12">
                                        <Form.Group>
                                            <Form.Label
                                                label="جمله انگیزشی"
                                                color="dark"
                                                size="sm"
                                                required
                                            />

                                            <Textarea
                                                id="motivation_sentence"
                                                name="motivation_sentence"
                                                value={createProjectAfficheP1Form.values.motivation_sentence}
                                                onChange={(value) => createProjectAfficheP1Form.setFieldValue("motivation_sentence", value)}
                                            />

                                            <Form.Error
                                                error={createProjectAfficheP1Form.errors.motivation_sentence}
                                                touched={createProjectAfficheP1Form.touched.motivation_sentence}
                                            />
                                        </Form.Group>
                                    </div>
                                )
                            }

                            <div className="col-12">
                                <Form.Group inline>
                                    <SwitchBox
                                        id="auto_motivation_sentence"
                                        name="auto_motivation_sentence"
                                        value={createProjectAfficheP1Form.values.auto_motivation_sentence}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("auto_motivation_sentence", value ? 1 : 0)}
                                        checked={createProjectAfficheP1Form.values.auto_motivation_sentence === 1}
                                    />

                                    <Form.Label
                                        label="جمله انگیزشی خودکار"
                                        color="dark"
                                        size="sm"
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
                                        label="عنوان"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={createProjectAfficheP1Form.values.title}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("title", value)}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.title}
                                        touched={createProjectAfficheP1Form.touched.title}
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
                                        value={createProjectAfficheP1Form.values.description}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("description", value)}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.description}
                                        touched={createProjectAfficheP1Form.touched.description}
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
                                        value={createProjectAfficheP1Form.values.time_type_id}
                                        options={(!readAllScreenPlayTimeTypeAction.isPending && readAllScreenPlayTimeTypeAction.data) ? readAllScreenPlayTimeTypeAction.data?.data?.screenplay_time_types?.map(screenplay_time_type => ({
                                            label: screenplay_time_type.title,
                                            value: screenplay_time_type.id.toString()
                                        })) : []}
                                        isSearchable
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("time_type_id", value)}
                                        isLoading={readAllScreenPlayTimeTypeAction.isPending}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.time_type_id}
                                        touched={createProjectAfficheP1Form.touched.time_type_id}
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
                                        value={createProjectAfficheP1Form.values.location_side_id}
                                        options={(!readAllScreenPlayLocationSideAction.isPending && readAllScreenPlayLocationSideAction.data) ? readAllScreenPlayLocationSideAction.data?.data?.screenplay_location_sides?.map(screenplay_location_side => ({
                                            label: screenplay_location_side.title,
                                            value: screenplay_location_side.id.toString()
                                        })) : []}
                                        isSearchable
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("location_side_id", value)}
                                        isLoading={readAllScreenPlayLocationSideAction.isPending}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.location_side_id}
                                        touched={createProjectAfficheP1Form.touched.location_side_id}
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
                                        label="نوع فنی"
                                        color="dark"
                                        size="sm"
                                        required
                                    />

                                    <SelectBox
                                        id="type"
                                        name="type"
                                        value={createProjectAfficheP1Form.values.type}
                                        options={(!readAllAfficheTypeAction.isPending && readAllAfficheTypeAction.data) ? readAllAfficheTypeAction.data?.data?.affiche_types?.map(affiche_type => ({
                                            label: affiche_type.title,
                                            value: affiche_type.id.toString()
                                        })) : []}
                                        isSearchable
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("type", value)}
                                        isLoading={readAllAfficheTypeAction.isPending}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.type}
                                        touched={createProjectAfficheP1Form.touched.type}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group inline>
                                    <SwitchBox
                                        id="is_off"
                                        name="is_off"
                                        value={createProjectAfficheP1Form.values.is_off}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("is_off", value ? 1 : 0)}
                                        checked={createProjectAfficheP1Form.values.is_off === 1}
                                    />

                                    <Form.Label
                                        label={` این یک آفیش از نوع off ${createProjectAfficheP1Form.values.is_off ? "می باشد" : "نمی باشد"} `}
                                        color="dark"
                                        size="sm"
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
                                        label="تاریخ آفیش"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <DatePicker
                                        id="affiche_date"
                                        name="affiche_date"
                                        value={createProjectAfficheP1Form.values.affiche_date}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("affiche_date", value)}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.affiche_date}
                                        touched={createProjectAfficheP1Form.touched.affiche_date}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="تاریخ اجرا"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <DatePicker
                                        id="start_date"
                                        name="start_date"
                                        value={createProjectAfficheP1Form.values.start_date}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("start_date", value)}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.start_date}
                                        touched={createProjectAfficheP1Form.touched.start_date}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="ساعت حضور"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <TimePicker
                                        id="coming_time"
                                        name="coming_time"
                                        value={createProjectAfficheP1Form.values.coming_time}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("coming_time", value)}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.coming_time}
                                        touched={createProjectAfficheP1Form.touched.coming_time}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label
                                        label="ساعت کلید"
                                        required
                                        size="sm"
                                        color="dark"
                                    />

                                    <TimePicker
                                        id="start_time"
                                        name="start_time"
                                        value={createProjectAfficheP1Form.values.start_time}
                                        onChange={(value) => createProjectAfficheP1Form.setFieldValue("start_time", value)}
                                    />

                                    <Form.Error
                                        error={createProjectAfficheP1Form.errors.start_time}
                                        touched={createProjectAfficheP1Form.touched.start_time}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                    <Button
                        href={auth.panel_url + `projects/${params.id}/affiches`}
                        color="light-danger"
                    >
                        انصراف
                    </Button>

                    <Button
                        color="success"
                        onClick={createProjectAfficheP1Form.handleSubmit}
                    >
                        بعدی
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormDataP1;