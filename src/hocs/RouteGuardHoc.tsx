// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// stores
import useAuthStore from "@/stores/authStore.ts";

const RouteGuardHoc = (WrappedComponent) => {
    const RouteGuardHoc = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const {auth} = useAuthStore();
        const isAuth = Boolean(auth.token);

        useLayoutEffect(() => {
            if (!isAuth) {
                navigate("/auth/sign-in", {replace: true});
            }

            if (isAuth && location.pathname.startsWith("/auth")) {
                navigate("/panel/dashboard", {replace: true});
            }
        }, []);

        return <WrappedComponent {...props}/>
    }

    return RouteGuardHoc;
}

export default RouteGuardHoc;