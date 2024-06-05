// components
import Banks from "@/components/widgets/panel/profile/financial/Banks.tsx";
import CreateBankFormData from "@/components/widgets/panel/profile/financial/CreateBankFormData.tsx";
import UpdateBankFormData from "@/components/widgets/panel/profile/financial/UpdateBankFormData.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

const Financial = ({readMyProfileAction , readMyAllBankCardAction}) => {
    const {part, currentPart, resetPart, changePart, changeCurrentPart} = usePart(null , "read");

    return (
        <>
            {
                currentPart === "read" && (
                    <Banks
                        readMyAllBankCardAction={readMyAllBankCardAction}
                        readMyProfileAction={readMyProfileAction}
                        changePart={changePart}
                        changeCurrentPart={changeCurrentPart}
                    />
                )
            }

            {
                currentPart === "create" && (
                    <CreateBankFormData
                        readMyAllBankCardAction={readMyAllBankCardAction}
                        readMyProfileAction={readMyProfileAction}
                        resetPart={resetPart}
                    />
                )
            }

            {
                currentPart === "update" && (
                    <UpdateBankFormData
                        readMyAllBankCardAction={readMyAllBankCardAction}
                        readMyProfileAction={readMyProfileAction}
                        part={part}
                        resetPart={resetPart}
                    />
                )
            }
        </>
    )
}

export default Financial;