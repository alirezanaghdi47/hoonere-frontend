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
import {meService} from "@/services/profileService.ts";

const Content = () => {
    const location = useLocation();

    const me = useMutation({
        mutationFn: (data) => meService(data),
    });

    useLayoutEffect(() => {
        me.mutate();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 mw-950px mt-lg-n20 p-5">
            <Summary me={me}/>

            {location.hash === "" && <Review me={me}/>}
            {location.hash === "#identify" && <Identify me={me}/>}
            {location.hash === "#occupation" && <Occupation me={me}/>}
            {location.hash === "#financial" && <Financial me={me}/>}
        </div>
    )
}

export default Content;