// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import {PreviewBankCard} from "@/components/widgets/panel/profile/financial/BankCards.tsx";

// modules
import Form from "@/modules/Form";
import NumberInput from "@/modules/NumberInput";
import Button from "@/modules/Button";
import TextInput from "@/modules/TextInput";
import Toast from "@/modules/Toast";

// services
import {createBankCardService , ICreateBankCard} from "@/services/profileService.ts";

const financialSchema = Yup.object().shape({
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
    card_number: Yup.string().trim().required("شماره کارت الزامی است"),
    card_shaba: Yup.string().trim().required("شماره شبا الزامی است"),
    account_id: Yup.string().trim()
});

const CreateBankFormData = ({readMyAllBankCardAction, readMyProfileAction, resetPart}) => {
    const createBankCardAction = useMutation({
        mutationFn: (data: ICreateBankCard) => createBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                resetPart();

                createBankCardForm.handleReset(createBankCardForm);

                readMyAllBankCardAction.mutate();
            } else {
                Toast("error", data.message);
            }
        }
    });

    const createBankCardForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: readMyProfileAction.data?.data?.user_info?.first_name && readMyProfileAction.data?.data?.user_info?.last_name ? readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name : "",
            card_number: "",
            card_shaba: "",
            account_id: ""
        },
        validationSchema: financialSchema,
        onSubmit: async (result) => {
            createBankCardAction.mutate(result);
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <PreviewBankCard card={createBankCardForm.values}/>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نام و نام خانوادگی"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="name"
                                name="name"
                                value={createBankCardForm.values.name}
                                onChange={(value) => createBankCardForm.setFieldValue("name", value)}
                            />

                            <Form.Error
                                error={createBankCardForm.errors.name}
                                touched={createBankCardForm.touched.name}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره کارت"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="card_number"
                                name="card_number"
                                value={createBankCardForm.values.card_number}
                                onChange={(value) => createBankCardForm.setFieldValue("card_number", value)}
                            />

                            <Form.Error
                                error={createBankCardForm.errors.card_number}
                                touched={createBankCardForm.touched.card_number}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره شبا"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="card_shaba"
                                name="card_shaba"
                                value={createBankCardForm.values.card_shaba}
                                onChange={(value) => createBankCardForm.setFieldValue("card_shaba", value)}
                            />

                            <Form.Error
                                error={createBankCardForm.errors.card_shaba}
                                touched={createBankCardForm.touched.card_shaba}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره حساب"
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="account_id"
                                name="account_id"
                                value={createBankCardForm.values.account_id}
                                onChange={(value) => createBankCardForm.setFieldValue("account_id", value)}
                            />

                            <Form.Error
                                error={createBankCardForm.errors.account_id}
                                touched={createBankCardForm.touched.account_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createBankCardForm.handleReset(createBankCardForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="success"
                            onClick={createBankCardForm.handleSubmit}
                            isLoading={createBankCardAction.isPending}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBankFormData;