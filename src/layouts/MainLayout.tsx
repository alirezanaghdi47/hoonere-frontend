// components
import Navbar from "@/components/partials/main/Navbar.tsx";
import Sidebar from "@/components/partials/main/Sidebar.tsx";
import Overlay from "@/components/partials/main/Overlay.tsx";

const MainLayout = ({children}) => {
    return (
        <>
            <div className="header-fixed header-tablet-and-mobile-fixed aside-fixed aside-secondary-disabled">
                <div className="page d-flex justify-content-center align-items-center w-100">
                    <div className="wrapper d-flex flex-column justify-content-center align-items-center w-100">
                        <Navbar/>

                        {children}

                        <Sidebar/>
                    </div>
                </div>
            </div>

            <Overlay/>
        </>
    );
};

export default MainLayout;
