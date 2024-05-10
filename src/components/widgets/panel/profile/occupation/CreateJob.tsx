// libraries
import {useFormik} from "formik";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Button from "@/modules/Button.tsx";

// utils
import {createJobSchema} from "@/utils/validations.ts";

const CreateJobForm = ({allJobAction, createJobForm}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
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
                                name="foa_parent_id"
                                value={createJobForm.values.foa_parent_id}
                                options={allJobAction?.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null).map(item => ({
                                    label: item.title,
                                    value: item.id
                                }))}
                                placeholder=""
                                isSearchable
                                onChange={(value) => createJobForm.setFieldValue("foa_parent_id", value)}
                            />

                            <Form.Error
                                error={createJobForm.errors.foa_parent_id}
                                touched={createJobForm.touched.foa_parent_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-2">
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
                                name="foa_child_id"
                                value={createJobForm.values.foa_child_id}
                                options={allJobAction?.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && parseInt(foa.parent_id) === parseInt(createJobForm.values.foa_parent_id)).map(item => ({
                                    label: item.title,
                                    value: item.id
                                }))}
                                placeholder=""
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

                <div className="row gy-2">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={createJobForm.handleReset}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="primary"
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

const CreateJob = ({allJobAction, updateOccupationForm, resetPart}) => {
    const createJobForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            foa_parent_id: null,
            foa_child_id: null,
        },
        validationSchema: createJobSchema,
        onSubmit: async (result, {resetForm}) => {
            const oldFoaArray = updateOccupationForm.values.fields_of_activity;
            let newFoaArray = oldFoaArray.filter(foa => JSON.stringify(foa) !== JSON.stringify(result));

            newFoaArray.push(result);

            await updateOccupationForm.setFieldValue("fields_of_activity", newFoaArray);

            resetPart();
            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <CreateJobForm
            allJobAction={allJobAction}
            createJobForm={createJobForm}
        />
    )
}

export default CreateJob;