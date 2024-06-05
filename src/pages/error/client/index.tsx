// libraries
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

// components
import Content from "@/components/widgets/error/client/Content.tsx";

const ClientError = () => {
    const location = useLocation();

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }, [location]);

    return (
        <Content/>
    )
}

export default ClientError;