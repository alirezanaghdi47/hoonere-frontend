// libraries
import {useLayoutEffect} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';

// assets
import logo from "@/assets/images/logo.svg";

const AuthLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (location.pathname === "/auth") navigate("/auth/sign-in")
    }, [location.key]);

    return (
        <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100 min-vh-100">
            <div
                className="d-flex justify-content-center align-items-center flex-column gap-5 h-100 bg-white bg-body shadow-sm">
                <div className="d-flex flex-column justify-content-center align-items-center w-100 w-sm-500px p-10">
                    <Link
                        to="/account/dashboard"
                        className="w-max mb-5"
                    >
                        <LazyLoadImage
                            src={logo}
                            alt="logo"
                            width={50}
                        />
                    </Link>

                    <Outlet/>
                </div>
            </div>

            <div className="d-flex w-100 bgi-size-cover bgi-position-center order-1 order-lg-2"/>
        </div>
    )
}

export default AuthLayout;