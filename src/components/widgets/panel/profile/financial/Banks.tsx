// libraries
import {useMutation} from "@tanstack/react-query";

// components
import {BankCard, TempBankCard} from "@/components/widgets/panel/profile/financial/BankCards.tsx";

// typography
import Form from "@/modules/Form.tsx";
import toast from "@/modules/Toast.tsx";
import dialog from "@/modules/dialog.tsx";

// services
import {deleteBankCardService, changeStatusOfBankCardService} from "@/services/profileService.ts";

const Banks = ({myBankCardsAction, changePart, changeCurrentPart, user}) => {
    const changeStatusOfBankCardAction = useMutation({
        mutationFn: (data) => changeStatusOfBankCardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);
                myBankCardsAction.mutate();
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
                myBankCardsAction.mutate();
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
                        myBankCardsAction?.data?.data?.cards.map(bankCard =>
                            <BankCard
                                key={bankCard.id}
                                card={bankCard}
                                user={user}
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

                    <TempBankCard onClick={() => changeCurrentPart("add")}/>
                </div>
            </div>
        </div>
    )
}

export default Banks;