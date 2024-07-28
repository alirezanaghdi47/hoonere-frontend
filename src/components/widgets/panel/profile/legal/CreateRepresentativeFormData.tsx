// libraries
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form.tsx";
import TextInput from "@/modules/TextInput.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Button from "@/modules/Button.tsx";

// utils
import {createRepresentativeSchema} from "@/utils/validations.ts";

const CreateRepresentativeFormData = ({updateProfileLegalForm, resetPart}) => {
    const createRepresentativeForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: "",
            national_code: "",
            post: ""
        },
        validationSchema: createRepresentativeSchema,
        onSubmit: async (result, {resetForm}) => {
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
                    <div className="col-lg-4">
                        <Form.Label
                            label="نام و نام خانوادگی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="full_name"
                                name="full_name"
                                value={createRepresentativeForm.values.full_name}
                                onChange={(value) => createRepresentativeForm.setFieldValue("full_name", value)}
                            />

                            <Form.Error
                                error={createRepresentativeForm.errors.full_name}
                                touched={createRepresentativeForm.touched.full_name}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد ملی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="national_code"
                                name="national_code"
                                value={createRepresentativeForm.values.national_code}
                                onChange={(value) => createRepresentativeForm.setFieldValue("national_code", value)}
                            />

                            <Form.Error
                                error={createRepresentativeForm.errors.national_code}
                                touched={createRepresentativeForm.touched.national_code}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="سمت کاری"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="post"
                                name="post"
                                value={createRepresentativeForm.values.post}
                                onChange={(value) => createRepresentativeForm.setFieldValue("post", value)}
                            />

                            <Form.Error
                                error={createRepresentativeForm.errors.post}
                                touched={createRepresentativeForm.touched.post}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createRepresentativeForm.handleReset(createRepresentativeForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="success"
                            onClick={createRepresentativeForm.handleSubmit}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRepresentativeFormData;