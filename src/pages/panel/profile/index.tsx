// libraries
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// components
import Header from "@/components/widgets/panel/profile/Header.tsx";
import Content from "@/components/widgets/panel/profile/Content.tsx";

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!["", "#identify", "#occupation", "#financial"].includes(location.hash)) {
            navigate("/panel/profile");
        }
    }, [location.key]);

    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default ProfilePage;