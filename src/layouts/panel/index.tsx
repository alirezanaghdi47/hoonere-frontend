// libraries
import {Outlet} from "react-router-dom";

// components
import Navbar from "@/components/partials/panel/Navbar.tsx";
import Sidebar from "@/components/partials/panel/Sidebar.tsx";
import Overlay from "@/components/partials/panel/Overlay.tsx";

const Panel = () => {
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

export default Panel;
