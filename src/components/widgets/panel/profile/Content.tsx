// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";

// components
import Summary from "@/components/widgets/panel/profile/Summary.tsx";
import Review from "@/components/widgets/panel/profile/review/Review.tsx";
import Identify from "@/components/widgets/panel/profile/identity/Identify.tsx";
import Occupation from "@/components/widgets/panel/profile/occupation/Occupation.tsx";
import Financial from "@/components/widgets/panel/profile/financial/Financial.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// services
import {readMyAllBankCardService, readMyProfileService} from "@/services/profileService.ts";

const Content = () => {
    const location = useLocation();

    const readMyProfileAction = useMutation({
        mutationFn: () => readMyProfileService(),
    });

    const readMyAllBankCardAction = useMutation({
        mutationFn: () => readMyAllBankCardService(),
    });

    useLayoutEffect(() => {
        readMyProfileAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readMyAllBankCardAction.mutate();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 mw-950px mt-lg-n20 p-5">
            {
                readMyProfileAction.isPending && (
                    <Loading
                        withCard
                        width="100%"
                        height={250}
                    />
                )
            }

            {
                !readMyProfileAction.isPending && (
                    <Summary readMyProfileAction={readMyProfileAction}/>
                )
            }

            {
                readMyProfileAction.isPending && location.hash === "#review" && (
                    <Loading
                        withCard
                        width="100%"
                        height={450}
                    />
                )
            }

            {
                !readMyProfileAction.isPending && location.hash === "#review" && (
                    <Review readMyProfileAction={readMyProfileAction}/>
                )
            }

            {
                readMyProfileAction.isPending && location.hash === "#identify" && (
                    <Loading
                        withCard
                        width="100%"
                        height={900}
                    />
                )
            }

            {
                !readMyProfileAction.isPending && location.hash === "#identify" && (
                    <Identify readMyProfileAction={readMyProfileAction}/>
                )
            }

            {
                (readMyProfileAction.isPending) && location.hash === "#occupation" && (
                    <Loading
                        withCard
                        width="100%"
                        height={600}
                    />
                )
            }

            {
                !readMyProfileAction.isPending && location.hash === "#occupation" && (
                    <Occupation readMyProfileAction={readMyProfileAction}/>
                )
            }

            {
                (readMyProfileAction.isPending || readMyAllBankCardAction.isPending) && location.hash === "#financial" && (
                    <Loading
                        withCard
                        width="100%"
                        height={300}
                    />
                )
            }

            {
                !readMyProfileAction.isPending && !readMyAllBankCardAction.isPending && location.hash === "#financial" && (
                    <Financial
                        readMyProfileAction={readMyProfileAction}
                        readMyAllBankCardAction={readMyAllBankCardAction}
                    />
                )
            }
        </div>
    )
}

export default Content;