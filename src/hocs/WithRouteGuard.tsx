// libraries
import {ComponentType, useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// stores
import useAuthStore from "@/stores/authStore.ts";

const WithRouteGuard = <P extends { [key: string]: unknown }>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
    const RouteGuard = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const {auth} = useAuthStore();

        const isAuth = Boolean(auth.token);

        useLayoutEffect(() => {
            if (!isAuth && !location.pathname.startsWith("/auth")) {
                navigate("/auth/sign-in", {replace: true});
            }

            if (isAuth && location.pathname.startsWith("/auth")) {
                navigate(auth.panel_url + "dashboard", {replace: true});
            }
        }, [isAuth]);

        return <WrappedComponent {...props}/>
    }

    return RouteGuard;
}

export default WithRouteGuard;