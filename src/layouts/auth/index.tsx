// libraries
import {Outlet} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';

const Auth = () => {
    return (
        <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100 min-vh-100">
            <div
                className="d-flex justify-content-center align-items-center flex-column gap-5 h-100 bg-white bg-body shadow-sm">
                <div className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 w-sm-500px p-10">
                    <LazyLoadImage
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={50}
                        className="mb-5"
                    />

                    <Outlet/>
                </div>
            </div>

            <div className="d-flex w-100 bgi-size-cover bgi-position-center order-1 order-lg-2"/>
        </div>
    )
}

export default Auth;