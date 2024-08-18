// libraries
import Loadable from "@loadable/component";

// components
// const CreateBankFormData = Loadable(() => import("@/components/widgets/panel/profile/financial/CreateBankFormData.tsx"));
// const UpdateBankFormData = Loadable(() => import("@/components/widgets/panel/profile/financial/UpdateBankFormData.tsx"));

import CreateBankFormData from "@/components/widgets/panel/profile/financial/CreateBankFormData.tsx";
import UpdateBankFormData from "@/components/widgets/panel/profile/financial/UpdateBankFormData.tsx";
import Banks from "@/components/widgets/panel/profile/financial/Banks.tsx";

// hooks
import usePart from "@/hooks/usePart";
const Financial = ({readMyProfileAction , readMyAllBankCardAction}) => {
    const {part, currentPart, resetPart, changePart, changeCurrentPart} = usePart(null , "read");

    return (
        <>
            {
                currentPart === "read" && (
                    <Banks
                        readMyAllBankCardAction={readMyAllBankCardAction}
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