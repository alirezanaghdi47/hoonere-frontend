// libraries
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuMenu} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";

// stores
import useAppStore from "@/stores/appStore.ts";
import useAuthStore from "@/stores/authStore.ts";

const Navbar = () => {
    const {auth} = useAuthStore();
    const {showDrawer} = useAppStore();

    return (
        <div className="header-mobile w-100 shadow-sm p-5">
            <div
                className="container-fluid d-flex justify-content-center align-items-center w-100 p-0">
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <Link
                        to={auth.panel_url + "dashboard"}
                        className="w-max"
                    >
                        <LazyLoadImage
                            src="/assets/images/logo.svg"
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
                    <LuMenu
                        size={20}
                        color="currentColor"
                    />
                </IconButton>
            </div>
        </div>
    )
}

export default Navbar;