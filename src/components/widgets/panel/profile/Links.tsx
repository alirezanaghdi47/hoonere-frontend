// libraries
import {useLocation, useNavigate} from "react-router-dom";

// modules
import Tabs from "@/modules/Tabs.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const navbarLinks = [
    {id: 1, label: "بررسی اجمالی", href: useAuthStore.getState().auth.panel_url + "profile", value: ""},
    {id: 2, label: "هویتی", href: useAuthStore.getState().auth.panel_url + "profile#identify", value: "#identify"},
    {id: 3, label: "شغلی", href: useAuthStore.getState().auth.panel_url + "profile#occupation", value: "#occupation"},
    {id: 4, label: "مالی", href: useAuthStore.getState().auth.panel_url + "profile#financial", value: "#financial"},
];

const Links = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-start align-items-start gap-5 w-100">
            <Tabs>
                {
                    navbarLinks.map(navbarLink =>
                        <Tabs.Item
                            isActive={location.hash === navbarLink.value}
                            key={navbarLink.id}
                            label={navbarLink.label}
                            onClick={() => navigate(navbarLink.href)}
                        />
                    )
                }
            </Tabs>
        </div>
    )
}

export default Links;