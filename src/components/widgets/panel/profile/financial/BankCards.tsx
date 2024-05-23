// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuMoreVertical, LuPlus} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Dropdown from "@/modules/Dropdown.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Chip from "@/modules/Chip.tsx";

// utils
import {getBankInfoFromCardNumber, hexToRgba} from "@/utils/functions.ts";

export const TempBankCard = ({onClick}) => {
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

export const PreviewBankCard = ({card, user}) => {
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
                            {user}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const BankCard = ({card, user, dropdownOptions}) => {
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
                        {user}
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
