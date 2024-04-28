// libraries
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

// assets
import logo from "@/assets/images/logo.svg";

// modules
import IconButton from "@/modules/IconButton.tsx";

// stores
import useAppStore from "@/stores/appStore.ts";

const Navbar = () => {
    const {showDrawer} = useAppStore();

    return (
        <div className="header-mobile w-100 shadow-sm p-5">
            <div
                className="container-fluid d-flex justify-content-center align-items-center w-100 p-0">
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <Link
                        to="/account/dashboard"
                        className="w-max"
                    >
                        <LazyLoadImage
                            src={logo}
                            alt="logo"
                            width={40}
                        />
                    </Link>
                </div>

                <IconButton
                    color="light"
                    activeColor="light-success"
                    onClick={showDrawer}
                >
                    <i className="fad fa-bars fs-3"/>
                </IconButton>
            </div>
        </div>
    )
}

export default Navbar;