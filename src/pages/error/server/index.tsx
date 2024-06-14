// libraries
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

// components
import Content from "@/components/widgets/error/server/Content.tsx";

const ServerError = () => {
    const location = useLocation();

    useEffect(() => {
        const handlePopstate = () => {
            window.history.pushState(null, document.title, window.location.href);
        };

        window.history.pushState(null, document.title, window.location.href);

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [location]);

    return (
        <Content/>
    )
}

export default ServerError;