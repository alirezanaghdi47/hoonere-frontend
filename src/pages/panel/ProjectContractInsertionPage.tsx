// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

// components
import Content from "@/components/widgets/panel/projects/read/contracts/insertions/read/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const ProjectContractInsertionPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();

    useLayoutEffect(() => {
        if (!["#is_supplement=0", "#is_supplement=1"].includes(location.hash)) {
            navigate(auth.panel_url + "projects/" + params.id + "/contracts/" + params.subId + "/insertions/" + params.subSubId + "#is_supplement=1");
        }
    }, [location.key]);

    return (
        <Content/>
    )
}

export default WithRouteGuard(ProjectContractInsertionPage);