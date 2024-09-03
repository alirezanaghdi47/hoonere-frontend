// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";
import {LuX} from "react-icons/lu";

// modules
import Modal from "@/modules/Modal";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import SelectBox from "@/modules/SelectBox";
import Form from "@/modules/Form";
import Button from "@/modules/Button";
import Toast from "@/modules/Toast";

// services
import {readAllProjectConfirmationService} from "@/services/publicService.ts";
import {inviteConfirmationProjectService , IInviteConfirmationProject} from "@/services/projectService.ts";

const inviteConfirmationProjectSchema = Yup.object().shape({
    status_id: Yup.string().trim().required("وضعیت دعوت نامه الزامی است"),
});

const InvitationModal = ({modal, _handleHideModal, readInvitedProjectAction}) => {
    const params = useParams();

    const readAllProjectConfirmationAction = useMutation({
        mutationFn: () => readAllProjectConfirmationService(),
    });

    const inviteConfirmationProjectAction = useMutation({
        mutationFn: (data: IInviteConfirmationProject) => inviteConfirmationProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readInvitedProjectAction.mutate({
                    project_id: params.id
                });

                _handleHideModal();
            } else {
                Toast("error", data.message);
            }
        }
    });

    const inviteConfirmationProjectForm = useFormik({
        initialValues: {
            status_id: ""
        },
        validationSchema: inviteConfirmationProjectSchema,
        onSubmit: async (result, {resetForm}) => {
            inviteConfirmationProjectAction.mutate({
                ...result,
                project_id: params.id
            });
        },
        onReset: async () => {
            _handleHideModal();
        }
    });

    useLayoutEffect(() => {
        readAllProjectConfirmationAction.mutate();
    }, []);

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
                    وضعیت مشارکت در پروژه
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
                            label="وضعیت دعوت نامه"
                            required
                            size="sm"
                            color="dark"
                        />

                        <SelectBox
                            id="status_id"
                            name="status_id"
                            value={inviteConfirmationProjectForm.values.status_id}
                            options={readAllProjectConfirmationAction.data?.data?.statuses?.map(item => ({
                                label: item.title,
                                value: item.id.toString()
                            }))}
                            isSearchable
                            onChange={(value) => inviteConfirmationProjectForm.setFieldValue("status_id", value)}
                            isLoading={readAllProjectConfirmationAction.isPending}
                        />

                        <Form.Error
                            error={inviteConfirmationProjectForm.errors.status_id}
                            touched={inviteConfirmationProjectForm.touched.status_id}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={inviteConfirmationProjectForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={inviteConfirmationProjectForm.handleSubmit}
                    isLoading={inviteConfirmationProjectAction.isPending}
                >
                    تایید
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InvitationModal;