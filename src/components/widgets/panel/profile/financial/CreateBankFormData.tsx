// libraries
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useFormik} from "formik";

// modules
import Form from "@/modules/Form.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Button from "@/modules/Button.tsx";
import toast from "@/helpers/toast.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Typography from "@/modules/Typography.tsx";

// services
import {createBankCardService} from "@/services/profileService.ts";

// types
import {ICreateBankCard} from "@/types/services";

// utils
import {financialSchema} from "@/utils/validations.ts";
import {getBankInfoFromCardNumber, hexToRgba, toEnglishDigits} from "@/utils/functions.ts";

export const PreviewBankCard = ({card}) => {
    return (
        <div className="row justify-content-center my-10">
            <div className="col-12 col-md-6">
                <div
                    className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-200px rounded-2 p-5"
                    style={{background: getBankInfoFromCardNumber(card?.card_number) ? hexToRgba(getBankInfoFromCardNumber(card?.card_number)?.color, 0.25) : hexToRgba("#DBDFE9", 0.25)}}
                >

                    <div className='d-flex justify-content-between align-items-center gap-2 w-100'>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                            <LazyLoadImage
                                src={getBankInfoFromCardNumber(card?.card_number)?.bank ? `/assets/images/iranian-banks/${getBankInfoFromCardNumber(card?.card_number)?.bank}.png` : "/assets/images/placeholder.png"}
                                alt={getBankInfoFromCardNumber(card?.card_number)?.bank}
                                width={50}
                                height={50}
                                className="object-fit-cover rounded-circle"
                            />

                            <Typography
                                variant="p"
                                size="xs"
                                color="dark"
                                isBold
                            >
                                {getBankInfoFromCardNumber(card?.card_number)?.title ? getBankInfoFromCardNumber(card?.card_number)?.title : 'نام بانک یا موسسه اعتباری'}
                            </Typography>
                        </div>
                    </div>

                    <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                        >
                            {card?.card_shaba ? "IR-" + card?.card_shaba : "شماره شبا"}
                        </Typography>

                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                            isBold
                        >
                            {card?.card_number ? card?.card_number : "شماره کارت"}
                        </Typography>
                    </div>

                    <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            {card?.name}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CreateBankFormData = ({readMyAllBankCardAction, readMyProfileAction, resetPart}) => {
    const createBankCardAction = useMutation({
        mutationFn: (data: ICreateBankCard) => createBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                resetPart();

                createBankCardForm.handleReset(createBankCardForm);

                readMyAllBankCardAction.mutate();
            } else {
                toast("error", data.message);
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
            createBankCardAction.mutate({
                ...result,
                card_number: toEnglishDigits(result.card_number),
                card_shaba: toEnglishDigits(result.card_shaba),
                account_id: toEnglishDigits(result.account_id),
            });
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

export default CreateBankFormData;