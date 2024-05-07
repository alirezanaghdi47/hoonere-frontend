// libraries
import {useLayoutEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useFormik} from "formik";
import {useBoolean} from 'usehooks-ts';
import {LuMoreVertical, LuPlus} from "react-icons/lu";

// assets
import logo from "@/assets/images/logo.svg";

// modules
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Chip from "@/modules/Chip.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Dropdown from "@/modules/Dropdown.tsx";
import toast from "@/modules/Toast.tsx";
import dialog from "@/modules/dialog.tsx";

// services
import {
    bankCardsChangeToMainService,
    bankCardsCreateService,
    bankCardsDeleteService,
    bankCardsGetService,
    bankCardsUpdateService
} from "@/services/profileService.ts";

// utils
import {hexToRgba} from "@/utils/functions.ts";
import {profileFinancialSchema} from "@/utils/validations.ts";

const TempBankCard = ({onClick}) => {
    return (
        <div
            className="col-12 col-md-6"
            onClick={onClick}
        >
            <div
                className="d-flex flex-column flex-column justify-content-center align-items-center gap-2 w-100 h-200px border-2 border-dashed border-secondary rounded-2 overflow-hidden p-5 cursor-pointer">
                <LuPlus
                    size={20}
                    color="currentColor"
                    className="text-muted"
                />

                <Typography
                    variant="p"
                    size="sm"
                    color="muted"
                >
                    افزودن کارت جدید
                </Typography>
            </div>
        </div>
    )
}

const BankCard = ({setTempCard , showEditCardForm , card, user , mutate}) => {
    const changeToMainBankCard = useMutation({
        mutationFn: (data) => bankCardsChangeToMainService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
                mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const deleteBankCard = useMutation({
        mutationFn: (data) => bankCardsDeleteService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
                mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    return (
        <div className="col-12 col-md-6">
            <div
                className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-200px rounded-2 p-5"
                style={{background: Boolean(parseInt(card.is_main) > 0) ? hexToRgba("#50cd89", 0.25) : hexToRgba("#DBDFE9", 0.25)}}
            >

                <div className='d-flex justify-content-between align-items-center gap-2 w-100'>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                        <LazyLoadImage
                            src={logo}
                            alt="logo"
                            width={40}
                            height={40}
                        />

                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            نام بانک
                        </Typography>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-5">
                        {
                            Boolean(parseInt(card.is_main) > 0) && (
                                <Chip
                                    color="primary"
                                    label="حساب پیش فرض"
                                />
                            )
                        }

                        <Dropdown
                            button={
                                <IconButton
                                    color="transparent"
                                    size="sm"
                                >
                                    <LuMoreVertical
                                        size={20}
                                        color="currentColor"
                                    />
                                </IconButton>
                            }
                            options={[
                                {
                                    id: 1,
                                    label: "انتخاب پیش فرض",
                                    onClick: () => {
                                        changeToMainBankCard.mutate({card_id: card?.id.toString()});
                                    }
                                },
                                {
                                    id: 2,
                                    label: "ویرایش",
                                    onClick: () => {
                                        showEditCardForm();
                                        setTempCard(card);
                                    }
                                },
                                {
                                    id: 3,
                                    label: "حذف",
                                    onClick: () => dialog(
                                        "حذف کارت",
                                        "آیا میخواهید این کارت را حذف کنید ؟",
                                        "info",
                                        {
                                            show: true,
                                            text: "حذف",
                                            color: "danger",
                                        },
                                        {
                                            show: true,
                                            text: "انصراف",
                                            color: "light-dark",
                                        },
                                        async () => {
                                            deleteBankCard.mutate({card_id: card?.id.toString()});
                                        }
                                    )
                                }
                            ]}
                            direction="bottom"
                            alignment="start"
                            gap={0}
                        />
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                    >
                        IR-{card?.card_shaba}
                    </Typography>

                    <Typography
                        variant="p"
                        size="sm"
                        color="dark"
                        isBold
                    >
                        {card?.card_number}
                    </Typography>
                </div>

                <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                        isBold
                    >
                        {user}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

const AddBankForm = ({hideAddCardForm, mutate}) => {
    const addBankCard = useMutation({
        mutationFn: (data) => bankCardsCreateService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
                hideAddCardForm();
                formik.handleReset();
                mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const formik = useFormik({
        initialValues: {
            card_number: "",
            card_shaba: "",
            account_id: ""
        },
        validationSchema: profileFinancialSchema,
        onSubmit: async (result) => {
            addBankCard.mutate(result);
        },
        onReset: async (result, {resetForm}) => {
            resetForm();
            hideAddCardForm();
        }
    });

    return (
        <>
            <div className="row gy-2 mt-5">
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
                            value={formik.values.card_number}
                            onChange={(value) => formik.setFieldValue("card_number", value)}
                        />

                        <Form.Error
                            error={formik.errors.card_number}
                            touched={formik.touched.card_number}
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
                            value={formik.values.card_shaba}
                            onChange={(value) => formik.setFieldValue("card_shaba", value)}
                        />

                        <Form.Error
                            error={formik.errors.card_shaba}
                            touched={formik.touched.card_shaba}
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
                            value={formik.values.account_id}
                            onChange={(value) => formik.setFieldValue("account_id", value)}
                        />

                        <Form.Error
                            error={formik.errors.account_id}
                            touched={formik.touched.account_id}
                        />
                    </Form.Group>
                </div>
            </div>

            <div className="row gy-2">
                <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                    <Button
                        color="light-danger"
                        onClick={formik.handleReset}
                    >
                        انصراف
                    </Button>

                    <Button
                        color="primary"
                        onClick={formik.handleSubmit}
                        disabled={addBankCard.isPending}
                    >
                        افزودن
                    </Button>
                </div>
            </div>
        </>
    )
}

const EditBankForm = ({card, hideEditCardForm, mutate}) => {
    const editBankCard = useMutation({
        mutationFn: (data) => bankCardsUpdateService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
                hideEditCardForm();
                formik.handleReset();
                mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            card_number: card?.card_number ? card?.card_number : "",
            card_shaba: card?.card_shaba ? card?.card_shaba : "",
            account_id: card?.account_id ? card?.account_id : ""
        },
        validationSchema: profileFinancialSchema,
        onSubmit: async (result) => {
            editBankCard.mutate({...result, card_id: card?.id.toString()});
        },
        onReset: async (result, {resetForm}) => {
            resetForm();
            hideEditCardForm();
        }
    });

    return (
        <>
            <div className="row gy-2 mt-5">
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
                            value={formik.values.card_number}
                            onChange={(value) => formik.setFieldValue("card_number", value)}
                        />

                        <Form.Error
                            error={formik.errors.card_number}
                            touched={formik.touched.card_number}
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
                            value={formik.values.card_shaba}
                            onChange={(value) => formik.setFieldValue("card_shaba", value)}
                        />

                        <Form.Error
                            error={formik.errors.card_shaba}
                            touched={formik.touched.card_shaba}
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
                            value={formik.values.account_id}
                            onChange={(value) => formik.setFieldValue("account_id", value)}
                        />

                        <Form.Error
                            error={formik.errors.account_id}
                            touched={formik.touched.account_id}
                        />
                    </Form.Group>
                </div>
            </div>

            <div className="row gy-2">
                <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                    <Button
                        color="light-danger"
                        onClick={formik.handleReset}
                    >
                        انصراف
                    </Button>

                    <Button
                        color="warning"
                        onClick={formik.handleSubmit}
                        disabled={editBankCard.isPending}
                    >
                        ویرایش
                    </Button>
                </div>
            </div>
        </>
    )
}

const Financial = ({me}) => {
    const [tempCard, setTempCard] = useState(null);
    const {value: addCardForm, setTrue: showAddCardForm, setFalse: hideAddCardForm} = useBoolean();
    const {value: editCardForm, setTrue: showEditCardForm, setFalse: hideEditCardForm} = useBoolean();

    const bankCardsGet = useMutation({
        mutationFn: () => bankCardsGetService(),
    });

    useLayoutEffect(() => {
        bankCardsGet.mutate();
    }, []);

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column gap-5">
                    <div className="row">
                        <Typography
                            variant="h2"
                            size="md"
                            color="dark"
                            isBold
                        >
                            کارت های بانکی
                        </Typography>
                    </div>

                    <div className="row gy-5">
                        {
                            bankCardsGet?.data?.data?.cards.map(bankCard =>
                                <BankCard
                                    key={bankCard.id}
                                    setTempCard={(value) => setTempCard(value)}
                                    showEditCardForm={showEditCardForm}
                                    card={bankCard}
                                    user={me?.data?.data?.userInfo?.first_name + " " + me?.data?.data?.userInfo?.last_name}
                                    mutate={bankCardsGet.mutate}
                                />
                            )
                        }

                        {
                            !addCardForm && (
                                <TempBankCard
                                    onClick={showAddCardForm}
                                />
                            )
                        }
                    </div>

                    {
                        addCardForm && (
                            <AddBankForm
                                hideAddCardForm={hideAddCardForm}
                                mutate={bankCardsGet.mutate}
                            />
                        )
                    }

                    {
                        editCardForm && (
                            <EditBankForm
                                card={tempCard}
                                hideEditCardForm={hideEditCardForm}
                                mutate={bankCardsGet.mutate}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Financial;