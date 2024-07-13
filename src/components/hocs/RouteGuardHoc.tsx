// libraries
import {ComponentType, useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {TWrappedComponent} from "@/types/componentType.ts";

const RouteGuardHoc = <P extends TWrappedComponent>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
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
                navigate(auth.panel_url + "dashboard", {replace: true});
            }
        }, [isAuth]);

        return <WrappedComponent {...props}/>
    }

    return RouteGuardHoc;
}

export default RouteGuardHoc;