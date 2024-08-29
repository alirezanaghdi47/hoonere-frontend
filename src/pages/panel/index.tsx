// libraries
import React, {useLayoutEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

// components
import Navbar from "@/components/partials/panel/Navbar.tsx";
import Sidebar from "@/components/partials/panel/Sidebar.tsx";
import Overlay from "@/components/partials/panel/Overlay.tsx";

// modules
import Tooltip from "@/modules/Tooltip";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Panel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();

    const isAuth = Boolean(auth.token);

    useLayoutEffect(() => {
        if (!isAuth){
            navigate("/auth/sign-in", {replace: true});
        }

        if (isAuth && ["/panel" , "/panel/" , auth.panel_url].includes(location.pathname)) {
            navigate(auth.panel_url + "dashboard", {replace: true});
        }
    }, [location.key]);

    return (
        <>
            <div className="header-fixed header-tablet-and-mobile-fixed aside-fixed aside-secondary-disabled">
                <div className="page d-flex justify-content-center align-items-center w-100">
                    <div className="wrapper d-flex flex-column justify-content-center align-items-center w-100">
                        <Navbar/>
                        <Outlet/>
                        <Sidebar/>
                    </div>
                </div>
            </div>

            <Tooltip/>

            <Overlay/>
        </>
    );
};

export default Panel;
