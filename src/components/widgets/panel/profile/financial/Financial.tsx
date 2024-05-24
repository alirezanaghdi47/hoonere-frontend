// components
import Banks from "@/components/widgets/panel/profile/financial/Banks.tsx";
import CreateBank from "@/components/widgets/panel/profile/financial/CreateBank.tsx";
import UpdateBank from "@/components/widgets/panel/profile/financial/UpdateBank.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

const Financial = ({readMyProfileAction , readMyAllBankCardAction}) => {
    const {part, currentPart, resetPart, changePart, changeCurrentPart} = usePart();

    return (
        <>
            {
                !currentPart && (
                    <Banks
                        readMyAllBankCardAction={readMyAllBankCardAction}
                        changePart={changePart}
                        changeCurrentPart={changeCurrentPart}
                        user={readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name}
                    />
                )
            }

            {
                currentPart === "add" && (
                    <CreateBank
                        readMyAllBankCardAction={readMyAllBankCardAction}
                        resetPart={resetPart}
                        user={readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name}
                    />
                )
            }

            {
                (currentPart === "update" && Object.keys(part).length > 0) && (
                    <UpdateBank
                        part={part}
                        resetPart={resetPart}
                        user={readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name}
                        readMyAllBankCardAction={readMyAllBankCardAction}
                    />
                )
            }
        </>
    )
}

export default Financial;