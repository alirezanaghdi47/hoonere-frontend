// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";

// components
import Review from "@/components/widgets/panel/profile/Review.tsx";
import Identify from "@/components/widgets/panel/profile/Identify.tsx";
import Occupation from "@/components/widgets/panel/profile/Occupation.tsx";
import Financial from "@/components/widgets/panel/profile/Financial.tsx";
import Summary from "@/components/widgets/panel/profile/Summary.tsx";

// services
import {myProfileService} from "@/services/profileService.ts";

const Content = () => {
    const location = useLocation();

    const myProfileAction = useMutation({
        mutationFn: (data) => myProfileService(data),
    });

    useLayoutEffect(() => {
        myProfileAction.mutate();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 mw-950px mt-lg-n20 p-5">
            <Summary myProfileAction={myProfileAction}/>

            {location.hash === "" && <Review myProfileAction={myProfileAction}/>}
            {location.hash === "#identify" && <Identify myProfileAction={myProfileAction}/>}
            {location.hash === "#occupation" && <Occupation myProfileAction={myProfileAction}/>}
            {location.hash === "#financial" && <Financial myProfileAction={myProfileAction}/>}
        </div>
    )
}

export default Content;