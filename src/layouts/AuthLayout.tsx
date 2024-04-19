// libraries
import {Link} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';

// assets
import logo from "@/assets/images/logo.svg";
import background from "@/assets/images/auth-background.png";

const AuthLayout = ({children}) => {
    return (
        <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100 min-vh-100">
            <div className="d-flex justify-content-center align-items-center flex-column gap-5 h-100 bg-white shadow-sm">
                <div className="d-flex flex-column justify-content-center align-items-center w-100 w-sm-500px p-10">
                    <Link
                        to="/"
                        className="w-max mb-5"
                    >
                        <LazyLoadImage
                            src={logo}
                            alt="logo"
                            width={50}
                        />
                    </Link>

                    {children}
                </div>
            </div>

            <div
                className="d-flex w-100 bgi-size-cover bgi-position-center order-1 order-lg-2"
                // style={{backgroundImage: `url(${background})`}}
            />
        </div>
    )
}

export default AuthLayout;