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
import CodeInput from "@/modules/CodeInput";
import Form from "@/modules/Form";
import Button from "@/modules/Button";

// services
import {checkProjectContractSignatureConfirmCodeService , ICheckProjectContractSignatureConfirmCode} from "@/services/projectContractService.ts";

const checkProjectContractSignatureConfirmCodeSchema = Yup.object().shape({
    code: Yup.string().trim().required("کد ارسالی الزامی است"),
});

const SignatureModal = ({modal, _handleHideModal , sendProjectContractSignatureConfirmCodeAction}) => {
    const params = useParams();

    const checkProjectContractSignatureConfirmCodeAction = useMutation({
        mutationFn: (data: ICheckProjectContractSignatureConfirmCode) => checkProjectContractSignatureConfirmCodeService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                _handleHideModal();
            }
        }
    });

    const checkProjectContractSignatureConfirmCodeForm = useFormik({
        initialValues: {
            code: ""
        },
        validationSchema: checkProjectContractSignatureConfirmCodeSchema,
        onSubmit: async (result, {resetForm}) => {
            checkProjectContractSignatureConfirmCodeAction.mutate({
                ...result,
                project_id: params.id,
                contract_id: modal?.data?.id.toString()
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
                    امضای دیجیتال قرارداد
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
                            label="کد ارسالی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <CodeInput
                            id="code"
                            name="code"
                            placeholder="کد اعتبارسنجی"
                            value={checkProjectContractSignatureConfirmCodeForm.values.code}
                            onChange={(value) => checkProjectContractSignatureConfirmCodeForm.setFieldValue("code", value)}
                            onResend={() => sendProjectContractSignatureConfirmCodeAction.mutate({
                                project_id: params.id,
                                contract_id: modal?.data?.contract.id.toString()
                            })}
                        />

                        <Form.Error
                            error={checkProjectContractSignatureConfirmCodeForm.errors.code}
                            touched={checkProjectContractSignatureConfirmCodeForm.touched.code}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={checkProjectContractSignatureConfirmCodeForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={checkProjectContractSignatureConfirmCodeForm.handleSubmit}
                    isLoading={checkProjectContractSignatureConfirmCodeAction.isPending}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignatureModal;