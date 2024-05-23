// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import {PreviewBankCard} from "@/components/widgets/panel/profile/financial/BankCards.tsx";

// modules
import Form from "@/modules/Form.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Button from "@/modules/Button.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {createBankCardService} from "@/services/profileService.ts";

// utils
import {financialSchema} from "@/utils/validations.ts";

const CreateBankForm = ({readMyAllBankCardAction, resetPart, user}) => {
    const createBankCardAction = useMutation({
        mutationFn: (data) => createBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                resetPart();

                createBankCardForm.handleReset();

                readMyAllBankCardAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const createBankCardForm = useFormik({
        initialValues: {
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
                <PreviewBankCard
                    card={createBankCardForm.values}
                    user={user}
                />

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
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
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
                            onClick={createBankCardForm.handleReset}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="primary"
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

const CreateBank = ({readMyAllBankCardAction, resetPart, user}) => {
    return (
        <CreateBankForm
            readMyAllBankCardAction={readMyAllBankCardAction}
            resetPart={resetPart}
            user={user}
        />
    )
}

export default CreateBank;