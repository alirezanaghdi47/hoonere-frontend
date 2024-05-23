// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import {PreviewBankCard} from "@/components/widgets/panel/profile/financial/BankCards.tsx";

// modules
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {updateBankCardService} from "@/services/profileService.ts";

// utils
import {financialSchema} from "@/utils/validations.ts";

const UpdateBankForm = ({readMyAllBankCardAction, part, resetPart, user}) => {
    const updateBankCardAction = useMutation({
        mutationFn: (data) => updateBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                resetPart();

                updateBankCardForm.handleReset();

                readMyAllBankCardAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateBankCardForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            card_number: part?.card_number ? part.card_number : "",
            card_shaba: part?.card_shaba ? part.card_shaba : "",
            account_id: part?.account_id ? part.account_id : ""
        },
        validationSchema: financialSchema,
        onSubmit: async (result) => {
            updateBankCardAction.mutate({
                ...result,
                card_id: part?.id.toString()
            });
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <PreviewBankCard
                    card={updateBankCardForm.values}
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
                                value={updateBankCardForm.values.card_number}
                                onChange={(value) => updateBankCardForm.setFieldValue("card_number", value)}
                            />

                            <Form.Error
                                error={updateBankCardForm.errors.card_number}
                                touched={updateBankCardForm.touched.card_number}
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
                                value={updateBankCardForm.values.card_shaba}
                                onChange={(value) => updateBankCardForm.setFieldValue("card_shaba", value)}
                            />

                            <Form.Error
                                error={updateBankCardForm.errors.card_shaba}
                                touched={updateBankCardForm.touched.card_shaba}
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
                                value={updateBankCardForm.values.account_id}
                                onChange={(value) => updateBankCardForm.setFieldValue("account_id", value)}
                            />

                            <Form.Error
                                error={updateBankCardForm.errors.account_id}
                                touched={updateBankCardForm.touched.account_id}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={updateBankCardForm.handleReset}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="warning"
                            onClick={updateBankCardForm.handleSubmit}
                            isLoading={updateBankCardAction.isPending}
                        >
                            ویرایش
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UpdateBank = ({readMyAllBankCardAction, part, resetPart, user}) => {
    return (
        <UpdateBankForm
            readMyAllBankCardAction={readMyAllBankCardAction}
            part={part}
            resetPart={resetPart}
            user={user}
        />
    )
}

export default UpdateBank;