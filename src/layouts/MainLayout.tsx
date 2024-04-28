// libraries
import {useLayoutEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

// components
import Navbar from "@/components/partials/main/Navbar.tsx";
import Sidebar from "@/components/partials/main/Sidebar.tsx";
import Overlay from "@/components/partials/main/Overlay.tsx";

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (location.pathname === "/account") navigate("/account/dashboard")
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

            <Overlay/>
        </>
    );
};

export default MainLayout;
