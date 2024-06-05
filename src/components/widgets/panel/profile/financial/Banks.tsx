// libraries
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuMoreVertical, LuPlus} from "react-icons/lu";

// typography
import Form from "@/modules/Form.tsx";
import toast from "@/modules/Toast.tsx";
import dialog from "@/modules/dialog.tsx";
import Dropdown from "@/modules/Dropdown.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Chip from "@/modules/Chip.tsx";
import Typography from "@/modules/Typography.tsx";

// services
import {deleteBankCardService, changeStatusOfBankCardService} from "@/services/profileService.ts";

// utils
import {getBankInfoFromCardNumber, hexToRgba} from "@/utils/functions.ts";

export const BlankCard = ({onClick}) => {
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

export const BankCard = ({card, dropdownOptions}) => {
    return (
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
                        options={dropdownOptions}
                        direction="bottom"
                        alignment="start"
                        gap={0}
                    />
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

                <div className='d-flex justify-content-between align-items-center gap-5 w-100'>
                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                        isBold
                    >
                        {card?.name}
                    </Typography>

                    {
                        Boolean(parseInt(card?.is_main) > 0) && (
                            <Chip
                                color="primary"
                                label="حساب پیش فرض"
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const Banks = ({readMyAllBankCardAction , readMyProfileAction, changePart, changeCurrentPart}) => {
    const changeStatusOfBankCardAction = useMutation({
        mutationFn: (data) => changeStatusOfBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readMyAllBankCardAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const deleteBankCardAction = useMutation({
        mutationFn: (data) => deleteBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readMyAllBankCardAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row">
                    <Form.Label
                        label="کارت های بانکی"
                        size="sm"
                        color="dark"
                        required
                    />
                </div>

                <div className="row gy-5">
                    {
                        readMyAllBankCardAction?.data?.data?.cards?.map(bankCard =>
                            <BankCard
                                key={bankCard.id}
                                card={bankCard}
                                dropdownOptions={[
                                    {
                                        id: 1,
                                        label: "انتخاب پیش فرض",
                                        onClick: () => {
                                            changeStatusOfBankCardAction.mutate({card_id: bankCard?.id.toString()});
                                        }
                                    },
                                    {
                                        id: 2,
                                        label: "ویرایش",
                                        onClick: () => {
                                            changePart(bankCard);
                                            changeCurrentPart("update");
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
                                                deleteBankCardAction.mutate({card_id: bankCard?.id.toString()});
                                            }
                                        )
                                    }
                                ]}
                            />
                        )
                    }

                    <BlankCard onClick={() => changeCurrentPart("create")}/>
                </div>
            </div>
        </div>
    )
}

export default Banks;