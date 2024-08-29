// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import {PreviewBankCard} from "@/components/widgets/panel/profile/financial/BankCards.tsx";

// modules
import NumberInput from "@/modules/NumberInput";
import Form from "@/modules/Form";
import Button from "@/modules/Button";
import TextInput from "@/modules/TextInput";
import Toast from "@/modules/Toast";

// services
import {updateBankCardService , IUpdateBankCard} from "@/services/profileService.ts";

const financialSchema = Yup.object().shape({
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
    card_number: Yup.string().trim().required("شماره کارت الزامی است"),
    card_shaba: Yup.string().trim().required("شماره شبا الزامی است"),
    account_id: Yup.string().trim()
});

const UpdateBankFormData = ({readMyAllBankCardAction, readMyProfileAction, part, resetPart}) => {
    const updateBankCardAction = useMutation({
        mutationFn: (data: IUpdateBankCard) => updateBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                resetPart();

                updateBankCardForm.handleReset(updateBankCardForm);

                readMyAllBankCardAction.mutate();
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateBankCardForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: readMyAllBankCardAction.data?.data?.cards.find(card => card.card_number === part?.card_number)?.name ? readMyAllBankCardAction.data?.data?.cards.find(card => card.card_number === part?.card_number).name : readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name,
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
                <PreviewBankCard card={updateBankCardForm.values}/>

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
                                value={updateBankCardForm.values.name}
                                onChange={(value) => updateBankCardForm.setFieldValue("name", value)}
                            />

                            <Form.Error
                                error={updateBankCardForm.errors.name}
                                touched={updateBankCardForm.touched.name}
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
                                id="card_shaba"
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
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="account_id"
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
                            onClick={() => updateBankCardForm.handleReset(updateBankCardForm)}
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

export default UpdateBankFormData;