// libraries
import {useMutation} from "@tanstack/react-query";

// components
import {BlankBankCard , BankCard} from "@/components/widgets/panel/profile/financial/BankCards.tsx";

// modules
import Form from "@/modules/Form";
import Toast from "@/modules/Toast";
import Dialog from "@/modules/Dialog";

// services
import {deleteBankCardService, changeStatusOfBankCardService , IDeleteBankCard , IChangeStatusOfBankCard} from "@/services/profileService.ts";

const Banks = ({readMyAllBankCardAction, changePart, changeCurrentPart}) => {
    const changeStatusOfBankCardAction = useMutation({
        mutationFn: (data: IChangeStatusOfBankCard) => changeStatusOfBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readMyAllBankCardAction.mutate();
            } else {
                Toast("error", data.message);
            }
        }
    });

    const deleteBankCardAction = useMutation({
        mutationFn: (data: IDeleteBankCard) => deleteBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readMyAllBankCardAction.mutate();
            } else {
                Toast("error", data.message);
            }
        }
    });

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="کارت های بانکی"
                                size="sm"
                                color="dark"
                                required
                            />

                            <div className="row g-5 w-100">
                                {
                                    readMyAllBankCardAction?.data?.data?.cards?.map(bankCard =>
                                        <BankCard
                                            key={bankCard.id}
                                            card={bankCard}
                                            dropdownOptions={bankCard?.is_main === "0" ? [
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
                                                    onClick: () => Dialog(
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
                                            ] : [
                                                {
                                                    id: 1,
                                                    label: "ویرایش",
                                                    onClick: () => {
                                                        changePart(bankCard);
                                                        changeCurrentPart("update");
                                                    }
                                                },
                                                {
                                                    id: 2,
                                                    label: "حذف",
                                                    onClick: () => Dialog(
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

                                <BlankBankCard changeCurrentPart={changeCurrentPart}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banks;