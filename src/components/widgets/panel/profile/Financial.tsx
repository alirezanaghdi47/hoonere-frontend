// libraries
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useFormik} from "formik";
import {useBoolean} from 'usehooks-ts';
import {LuMoreVertical, LuPlus} from "react-icons/lu";

// assets
import logo from "@/assets/images/logo.svg";
import placeholder from "@/assets/images/placeholder.png";

// modules
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";
import Chip from "@/modules/Chip.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Dropdown from "@/modules/Dropdown.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {bankCardsCreateService} from "@/services/profileService.ts";

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

const AddBankCard = ({logo , name , card_number , card_shaba , color , user}) => {
    return (
        <div className="col-12 col-md-6">
            <div
                className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-200px rounded-2 overflow-hidden p-5 cursor-pointer">
                <div
                    className='position-absolute top-0 start-0 w-100 h-100'
                    style={{background: color ? color : "gray", opacity: 0.25}}
                />
                <div className='d-flex justify-content-between align-items-center gap-2 w-100'>
                    <div className="d-flex justify-content-start align-items-center gap-2 w-100">
                        {
                            logo ? (
                                <LazyLoadImage
                                    src={logo}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                />
                            ) : (
                                <LazyLoadImage
                                    src={placeholder}
                                    alt="placeholder"
                                    width={40}
                                    height={40}
                                    className="rounded-circle"
                                />
                            )
                        }

                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            {name ? name : "نام بانک یا موسسه"}
                        </Typography>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center gap-5 w-100'>
                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                    >
                        {card_shaba ? card_shaba : "شماره شبا"}
                    </Typography>

                    <Typography
                        variant="p"
                        size="sm"
                        color="dark"
                        isBold
                    >
                        {card_number ? card_number : "شماره کارت"}
                    </Typography>
                </div>

                <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                        isBold
                    >
                        {user ? user : "نام و نام خانوادگی"}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

const BankCard = ({logo, name, card_number, card_shaba, isActiveCard , user}) => {
    return (
        <div className="col-12 col-md-6">
            <div
                className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-200px rounded-2 p-5"
                style={{background: hexToRgba("#50cd89" , 0.25)}}
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
                            {name}
                        </Typography>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-5">
                        {
                            isActiveCard && (
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
                                {id: 1 , label: "انتخاب پیش فرض" , onClick: () => console.log("")},
                                {id: 2 , label: "ویرایش" , onClick: () => console.log("")},
                                {id: 3 , label: "حذف" , onClick: () => console.log("")}
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
                        {card_shaba}
                    </Typography>

                    <Typography
                        variant="p"
                        size="sm"
                        color="dark"
                        isBold
                    >
                        {card_number}
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

const Financial = () => {
    const {value: addCardForm, setTrue: showAddCardForm, setFalse: hideAddCardForm,} = useBoolean();

    const {mutate, isPending} = useMutation({
        mutationFn: (data) => bankCardsCreateService(data),
        onSuccess: async (data) => {
            console.log(data)
            if (!data.error) {
                toast("success", data.message);
                hideAddCardForm();
                formik.handleReset();
            } else {
                toast("error", data.message);
            }
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            card_number: "",
            card_shaba: "",
            account_id: ""
        },
        validationSchema: profileFinancialSchema,
        onSubmit: async (result) => {
            mutate(result);
        },
        onReset: async (result) => {
            hideAddCardForm();
        }
    });

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
                        <BankCard
                            logo={logo}
                            name="بانک صنعت و معدن"
                            color="red"
                            card_number="1234-1234-1234-1234"
                            card_shaba="IR123456789012345678901234"
                            user="علیرضا نقدی"
                            isActiveCard={true}
                        />

                        {
                            addCardForm ? (
                                <AddBankCard
                                    logo={null}
                                    name=""
                                    color="gray"
                                    card_number=""
                                    card_shaba=""
                                    user=""
                                />
                            ) : (
                                <TempBankCard
                                    onClick={showAddCardForm}
                                />
                            )
                        }
                    </div>

                    {
                        addCardForm && (
                            <>
                                <div className="row gy-2 mt-10">
                                    <div className="col-lg-4">
                                        <Form.Label
                                            label="شماره کارت"
                                            required
                                            size="sm"
                                            color="dark"
                                        />
                                    </div>

                                    <div className="col-lg-8">
                                        <Form.Group>
                                            <NumberInput
                                                name="card_number"
                                                value={formik.values.card_number}
                                                onChange={(value) => formik.setFieldValue("card_number" , value)}
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
                                            required
                                            size="sm"
                                            color="dark"
                                        />
                                    </div>

                                    <div className="col-lg-8">
                                        <Form.Group>
                                            <NumberInput
                                                name="card_shaba"
                                                value={formik.values.card_shaba}
                                                options={{
                                                    numericOnly: true,
                                                    blocks: [3, 2, 3, 1, 18],
                                                    delimiter: '',
                                                    prefix: "IR-"
                                                }}
                                                onChange={(value) => formik.setFieldValue("card_shaba" , value)}
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
                                            required
                                            size="sm"
                                            color="dark"
                                        />
                                    </div>

                                    <div className="col-lg-8">
                                        <Form.Group>
                                            <NumberInput
                                                name="account_id"
                                                value={formik.values.account_id}
                                                onChange={(value) => formik.setFieldValue("account_id" , value)}
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
                                            disabled={isPending}
                                        >
                                            افزودن
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Financial;