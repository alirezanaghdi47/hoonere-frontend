// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

// components
import Content from "@/components/widgets/panel/projects/read/contracts/read/Content";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const ProjectContract = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();

    useLayoutEffect(() => {
        if (!["#official", "#un-official"].includes(location.hash)) {
            navigate(auth.panel_url + "projects/" + params.id + "/contracts/" + params.subId + "#official");
        }
    }, [location.key]);

    return (
        <Content/>
    )
}

export default RouteGuardHoc(ProjectContract);