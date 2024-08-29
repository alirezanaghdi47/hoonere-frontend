// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// modules
import Form from "@/modules/Form";
import SelectBox from "@/modules/SelectBox";
import Button from "@/modules/Button";

// services
import {readAllJobService} from "@/services/publicService.ts";

const createJobSchema = Yup.object().shape({
    foa_parent_id: Yup.number().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.number().required("عنوان شغلی الزامی است"),
});

const CreateJobFormData = ({updateOccupationForm, resetPart}) => {
    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const createJobForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            foa_parent_id: null,
            foa_child_id: null,
        },
        validationSchema: createJobSchema,
        onSubmit: async (result, {resetForm}) => {
            const oldFoaArray = updateOccupationForm.values.fields_of_activity;
            const newFoaArray = oldFoaArray.filter(foa => JSON.stringify(foa) !== JSON.stringify(result));

            newFoaArray.push(result);

            await updateOccupationForm.setFieldValue("fields_of_activity", newFoaArray);

            resetPart();
            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    } , []);

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
                                value={createJobForm.values.foa_parent_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null).map(item => ({
                                    label: item.title,
                                    value: item.id
                                }))}
                                isSearchable
                                onChange={(value) => createJobForm.setFieldValue("foa_parent_id", value)}
                                isLoading={readAllJobAction.isPending}
                            />

                            <Form.Error
                                error={createJobForm.errors.foa_parent_id}
                                touched={createJobForm.touched.foa_parent_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عنوان شغلی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                id="foa_child_id"
                                name="foa_child_id"
                                value={createJobForm.values.foa_child_id}
                                options={readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && Number(foa.parent_id) === Number(createJobForm.values.foa_parent_id)).map(item => ({
                                    label: item.title,
                                    value: item.id
                                }))}
                                isSearchable
                                disabled={!createJobForm.values.foa_parent_id}
                                onChange={(value) => createJobForm.setFieldValue("foa_child_id", value)}
                            />

                            <Form.Error
                                error={createJobForm.errors.foa_child_id}
                                touched={createJobForm.touched.foa_child_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createJobForm.handleReset(createJobForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="success"
                            onClick={createJobForm.handleSubmit}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateJobFormData;