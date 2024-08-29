// libraries
import {useParams} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
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

const CommentItem = ({comment}) => {
    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 bg-light rounded-2 p-5">
            <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                <LazyLoadImage
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={25}
                    height={25}
                    className="object-fit-cover rounded-circle"
                />

                <div className='d-flex flex-column justify-content-start align-items-start gap-2'>
                    <Typography
                        size="xs"
                        color="dark"
                        isBold
                    >
                        علیرضا نقدی
                    </Typography>

                    <Typography
                        size="xxs"
                        color="dark"
                    >
                        1400/11/11 | 12:40
                    </Typography>
                </div>
            </div>

            <div className='d-flex justify-content-start align-items-center w-100 '>
                <Typography
                    size="xs"
                    color="dark"
                >
                    متن دیدگاه
                </Typography>
            </div>
        </div>
    )
}

const ReplyCommentModal = ({modal, _handleHideModal}) => {
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
                contract_id: modal?.data?.id.toString(),
                parent_id: modal?.data?.parent_id.toString()
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
                    پاسخ به دیدگاه
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
                    <CommentItem comment={null}/>

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
                    پاسخ دهید
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReplyCommentModal;