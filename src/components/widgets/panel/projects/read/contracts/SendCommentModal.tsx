// libraries
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";
import {LuX} from "react-icons/lu";

// modules
import Modal from "@/modules/Modal";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Form from "@/modules/Form";
import Button from "@/modules/Button";
import Textarea from "@/modules/Textarea";

// services
import {createProjectContractCommentService , ICreateProjectContractComment} from "@/services/projectContractService.ts";

const createProjectContractCommentSchema = Yup.object().shape({
    content: Yup.string().trim().required("متن دیدگاه الزامی است"),
});

const SendCommentModal = ({modal, _handleHideModal}) => {
    const params = useParams();

    const createProjectContractCommentAction = useMutation({
        mutationFn: (data: ICreateProjectContractComment) => createProjectContractCommentService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                _handleHideModal();
            }
        }
    });

    const createProjectContractCommentForm = useFormik({
        initialValues: {
            content: ""
        },
        validationSchema: createProjectContractCommentSchema,
        onSubmit: async (result, {resetForm}) => {
            createProjectContractCommentAction.mutate({
                ...result,
                project_id: params.id,
                contract_id: params.subId,
                parent_id: ""
            });
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
            width="md"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    افزودن دیدگاه
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
                    className='d-flex flex-column justify-content-start align-items-start gap-5 w-100 h-100 p-5'>
                    <Form.Group>
                        <Form.Label
                            label="دیدگاه"
                            required
                            size="sm"
                            color="dark"
                        />

                        <Textarea
                            id="content"
                            name="content"
                            value={createProjectContractCommentForm.values.content}
                            onChange={(value) => createProjectContractCommentForm.setFieldValue("content", value)}
                        />

                        <Form.Error
                            error={createProjectContractCommentForm.errors.content}
                            touched={createProjectContractCommentForm.touched.content}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={createProjectContractCommentForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={createProjectContractCommentForm.handleSubmit}
                    isLoading={createProjectContractCommentAction.isPending}
                >
                    ارسال کنید
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SendCommentModal;