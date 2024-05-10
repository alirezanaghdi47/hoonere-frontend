// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";

// components
import Banks from "@/components/widgets/panel/profile/financial/Banks.tsx";
import CreateBank from "@/components/widgets/panel/profile/financial/CreateBank.tsx";
import UpdateBank from "@/components/widgets/panel/profile/financial/UpdateBank.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// services
import {myBankCardsService} from "@/services/profileService.ts";

const Financial = ({myProfileAction}) => {
    const {part, currentPart, resetPart, changePart, changeCurrentPart} = usePart();

    const myBankCardsAction = useMutation({
        mutationFn: () => myBankCardsService(),
    });

    useLayoutEffect(() => {
        myBankCardsAction.mutate();
    }, []);

    return !myBankCardsAction?.isPending ? (
        <>
            {
                !currentPart && (
                    <Banks
                        myBankCardsAction={myBankCardsAction}
                        changePart={changePart}
                        changeCurrentPart={changeCurrentPart}
                        user={myProfileAction?.data?.data?.userInfo?.first_name + " " + myProfileAction?.data?.data?.userInfo?.last_name}
                    />
                )
            }

            {
                currentPart === "add" && (
                    <CreateBank
                        myBankCardsAction={myBankCardsAction}
                        resetPart={resetPart}
                        user={myProfileAction?.data?.data?.userInfo?.first_name + " " + myProfileAction?.data?.data?.userInfo?.last_name}
                    />
                )
            }

            {
                (currentPart === "update" && Object.keys(part).length > 0) && (
                    <UpdateBank
                        part={part}
                        resetPart={resetPart}
                        user={myProfileAction?.data?.data?.userInfo?.first_name + " " + myProfileAction?.data?.data?.userInfo?.last_name}
                        myBankCardsAction={myBankCardsAction}
                    />
                )
            }
        </>
    ) : (
        <Loading
            width="100%"
            height={500}
        />
    )
}

export default Financial;