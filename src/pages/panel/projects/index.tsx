// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// components
import Content from "@/components/widgets/panel/projects/Content.tsx";
import Header from "@/components/widgets/panel/projects/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Projects = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();

    useLayoutEffect(() => {
        if (!["#is_invited=0", "#is_invited=1"].includes(location.hash)) {
            navigate(auth.panel_url + "projects#is_invited=0");
        }
    }, [location.key]);

    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(Projects);