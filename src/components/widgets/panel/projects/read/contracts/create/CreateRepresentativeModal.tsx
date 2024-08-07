// libraries
import {useFormik} from "formik";
import {LuX} from "react-icons/lu";

// modules
import Form from "@/modules/Form";
import TextInput from "@/modules/TextInput";
import NumberInput from "@/modules/NumberInput";
import Button from "@/modules/Button";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Modal from "@/modules/Modal";

// utils
import {createRepresentativeSchema} from "@/utils/validations.ts";

const CreateRepresentativeModal = ({modal, _handleHideModal , createUnOfficialLegalPartiesForm}) => {
    const createRepresentativeForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: "",
            national_code: "",
            post: ""
        },
        validationSchema: createRepresentativeSchema,
        onSubmit: async (result, {resetForm}) => {
            const newArray = [...createUnOfficialLegalPartiesForm.values.representatives , result];

            createUnOfficialLegalPartiesForm.setFieldValue("representatives" , newArray);

            resetForm();

            _handleHideModal();
        },
        onReset: async () => {
            _handleHideModal();
        }
    });

    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="lg"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    افزودن نماینده
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div className='d-flex flex-column justify-content-start align-items-start gap-5 w-100 h-100 p-5'>
                    <Form.Group>
                        <Form.Label
                            label="نام و نام خانوادگی"
                            required
                            size="sm"
                            color="dark"
                        />

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

                    <Form.Group>
                        <Form.Label
                            label="کد ملی"
                            required
                            size="sm"
                            color="dark"
                        />

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

                    <Form.Group>
                        <Form.Label
                            label="سمت کاری"
                            required
                            size="sm"
                            color="dark"
                        />

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
            </Modal.Body>

            <Modal.Footer>
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
            </Modal.Footer>
        </Modal>
    )
}

export default CreateRepresentativeModal;