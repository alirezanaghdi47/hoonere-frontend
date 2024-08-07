// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

// components
import Header from "@/components/widgets/panel/projects/read/contracts/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

// stores
import useAuthStore from "@/stores/authStore";

const CreateProjectContract = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {auth} = useAuthStore();

    useLayoutEffect(() => {
        if (!["#official", "#un-official"].includes(location.hash)) {
            navigate(auth.panel_url + `projects/${params.id}/contracts/create#official`);
        }
    }, [location.key]);

    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectContract);