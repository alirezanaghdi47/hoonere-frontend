// libraries
import {LuX} from "react-icons/lu";
import {useFormik} from "formik";

// modules
import Modal from "@/modules/Modal.tsx";
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import DatePicker from "@/modules/DatePicker.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";

// utils
import {createPaymentSchema} from "@/utils/validations";
import toast from "@/helpers/toast.tsx";

const CreatePaymentModal = ({modal, _handleHideModal, createProjectContractForm}) => {
    const totalPrice = createProjectContractForm.values.articles.find(item => item.number === modal?.data?.article.number - 1)?.total_price;

    const createPaymentModal = useFormik({
        initialValues: {
            percent: 0,
            date: "",
        },
        validationSchema: createPaymentSchema,
        onSubmit: async (result, {resetForm}) => {
            const totalPercent = createProjectContractForm.values.articles.find(item => item.number === modal?.data?.article.number)?.payments.reduce((acc, item) => {
                return acc += item.percent
            }, Number(result.percent));

            if (totalPercent > 100) return toast("error" , "مجموع درصد فاز ها حداکثر از % 100 است")

            const newArray = [...createProjectContractForm.values.articles.find(item => item.number === modal?.data?.article.number)?.payments, {
                percent: Number(result.percent),
                date: result.date
            }];

            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === modal?.data?.article.number)}].payments`, newArray);

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
            width="md"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    انتخاب فاز
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
                            label="درصد"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="percent"
                            name="percent"
                            options={{
                                numericOnly: true,
                                blocks: [2],
                                delimiter: '',
                            }}
                            value={createPaymentModal.values.percent}
                            onChange={(value) => createPaymentModal.setFieldValue("percent", value)}
                        />

                        <Form.Error
                            error={createPaymentModal.errors.percent}
                            touched={createPaymentModal.touched.percent}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="تاریخ"
                            required
                            size="sm"
                            color="dark"
                        />

                        <DatePicker
                            id="date"
                            name="date"
                            minDate={createProjectContractForm.values.articles.find(item => item.number === modal?.data?.article.number - 2)?.start_date}
                            maxDate={createProjectContractForm.values.articles.find(item => item.number === modal?.data?.article.number - 2)?.end_date}
                            value={createPaymentModal.values.date}
                            onChange={(value) => createPaymentModal.setFieldValue("date", value)}
                        />

                        <Form.Error
                            error={createPaymentModal.errors.date}
                            touched={createPaymentModal.touched.date}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={createPaymentModal.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={createPaymentModal.handleSubmit}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePaymentModal;