// libraries
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// components
import Header from "@/components/widgets/panel/profile/Header.tsx";
import Content from "@/components/widgets/panel/profile/Content.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();

    useEffect(() => {
        if (!["#review", "#identify", "#occupation", "#financial"].includes(location.hash)) {
            navigate(auth.panel_url + "profile#review");
        }
    }, [location.key]);

    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(Profile);