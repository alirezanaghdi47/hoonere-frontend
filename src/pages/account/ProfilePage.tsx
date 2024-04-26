// libraries
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// components
import Header from "@/components/widgets/account/profile/Header.tsx";
import Content from "@/components/widgets/account/profile/Content.tsx";

// layouts
import MainLayout from "@/layouts/MainLayout";

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!["" , "#identify" , "#occupation" , "#financial"].includes(location.hash)){
            navigate("/account/profile");
        }
    } , [location.key]);

    return (
        <MainLayout>
            <Header/>
            <Content/>
        </MainLayout>
    )
}

export default ProfilePage;