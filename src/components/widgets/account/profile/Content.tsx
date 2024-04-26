// libraries
import {useLocation} from "react-router-dom";

// components
import Review from "@/components/widgets/account/profile/Review.tsx";
import Identify from "@/components/widgets/account/profile/Identify.tsx";
import Occupation from "@/components/widgets/account/profile/Occupation.tsx";
import Financial from "@/components/widgets/account/profile/Financial.tsx";
import Summary from "@/components/widgets/account/profile/Summary.tsx";

const Content = () => {
    const location = useLocation();

    const _handleRenderContent = () => {
        switch (location.hash) {
            case "":
                return <Review/>;
            case "#identify":
                return <Identify/>;
            case "#occupation":
                return <Occupation/>;
            case "#financial":
                return <Financial/>;
            default:
                return <Review/>;
        }
    }

    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 mw-950px mt-lg-n20 p-5">
            <Summary/>
            {_handleRenderContent()}
        </div>
    )
}

export default Content;