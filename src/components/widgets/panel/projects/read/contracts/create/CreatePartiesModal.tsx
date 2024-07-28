// libraries
import {LuX} from "react-icons/lu";
import {useFormik} from "formik";

// modules
import Modal from "@/modules/Modal.tsx";
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";

// utils
import {createPartiesSchema} from "@/utils/validations";

const CreatePartiesModal = ({modal, _handleHideModal, createProjectContractForm}) => {
    const createPartiesForm = useFormik({
        initialValues: {
            foa_parent_id: "",
            foa_child_id: "",
            user_id: ""
        },
        // validationSchema: createPartiesSchema,
        onSubmit: async (result, {resetForm}) => {
            if (modal?.data?.from === "employer") {
                const newArray = [...createProjectContractForm.values.articles[0].employers, 10];

                createProjectContractForm.setFieldValue("articles[0].employers", newArray);
            } else if (modal?.data?.from === "contractor") {
                const newArray = [...createProjectContractForm.values.articles[0].contractors, 20];

                createProjectContractForm.setFieldValue("articles[0].contractors", newArray);
            }

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
                    انتخاب
                    &nbsp;
                    {modal?.data?.from === "employer" ? "کارفرما" : "مجری"}
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
                <div
                    className='d-flex flex-column flex-md-row justify-content-start align-items-start gap-5 w-100 h-100 p-5'>
                    <Form.Group>
                        <Form.Label
                            label="گروه شغلی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="foa_parent_id"
                            name="foa_parent_id"
                            value={createPartiesForm.values.foa_parent_id}
                            options={[]}
                            isSearchable
                            onChange={(value) => createPartiesForm.setFieldValue("foa_parent_id", value)}
                            // disabled={}
                            // isLoading={}
                        />

                        <Form.Error
                            error={createPartiesForm.errors.foa_parent_id}
                            touched={createPartiesForm.touched.foa_parent_id}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="عنوان شغلی"
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="foa_child_id"
                            name="foa_child_id"
                            value={createPartiesForm.values.foa_child_id}
                            options={[]}
                            isSearchable
                            onChange={(value) => createPartiesForm.setFieldValue("foa_child_id", value)}
                            // disabled={}
                            // isLoading={}
                        />

                        <Form.Error
                            error={createPartiesForm.errors.foa_child_id}
                            touched={createPartiesForm.touched.foa_child_id}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="کاربر"
                            required
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="user_id"
                            name="user_id"
                            value={createPartiesForm.values.user_id}
                            options={[]}
                            isSearchable
                            onChange={(value) => createPartiesForm.setFieldValue("user_id", value)}
                            // disabled={}
                            // isLoading={}
                        />

                        <Form.Error
                            error={createPartiesForm.errors.user_id}
                            touched={createPartiesForm.touched.user_id}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={createPartiesForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={createPartiesForm.handleSubmit}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePartiesModal;