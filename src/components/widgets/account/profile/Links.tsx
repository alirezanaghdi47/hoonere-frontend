// libraries
import {Link, useLocation, useNavigate} from "react-router-dom";

// modules
import Tabs from "@/modules/Tabs.tsx";

const navbarLinks = [
    {id: 1, label: "بررسی اجمالی", href: "/account/profile", value: ""},
    {id: 2, label: "هویتی", href: "/account/profile#identify", value: "#identify"},
    {id: 3, label: "شغلی", href: "/account/profile#occupation", value: "#occupation"},
    {id: 4, label: "مالی", href: "/account/profile#financial", value: "#financial"},
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