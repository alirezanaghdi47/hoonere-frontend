// libraries
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form";
import TextInput from "@/modules/TextInput";
import Button from "@/modules/Button";

// utils
import {createFieldSchema} from "@/utils/validations.ts";

const CreateFieldFormData = ({createProjectScreenPlayForm, resetPart}) => {
    const createFieldForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            value: "",
        },
        validationSchema: createFieldSchema,
        onSubmit: async (result, {resetForm}) => {
            const oldFields = createProjectScreenPlayForm.values.fields;
            const newFields = oldFields.filter(foa => JSON.stringify(foa) !== JSON.stringify(result));

            newFields.push(result);

            await createProjectScreenPlayForm.setFieldValue("fields", newFields);

            resetPart();
            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
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
                                value={createFieldForm.values.title}
                                onChange={(value) => createFieldForm.setFieldValue("title", value)}
                            />

                            <Form.Error
                                error={createFieldForm.errors.title}
                                touched={createFieldForm.touched.title}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="مقدار"
                                color="dark"
                                size="sm"
                                required
                            />

                            <TextInput
                                id="value"
                                name="value"
                                value={createFieldForm.values.value}
                                onChange={(value) => createFieldForm.setFieldValue("value", value)}
                            />

                            <Form.Error
                                error={createFieldForm.errors.value}
                                touched={createFieldForm.touched.value}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createFieldForm.handleReset(createFieldForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="success"
                            onClick={createFieldForm.handleSubmit}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFieldFormData;