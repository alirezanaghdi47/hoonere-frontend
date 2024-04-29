// libraries
import {useLocation} from "react-router-dom";
import {LuBell, LuMoon, LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Badge from "@/modules/Badge.tsx";
import Breadcrumbs from "@/modules/Breadcrumbs.tsx";

const breadcrumbLinks = [
    {id: 1, label: "داشبورد", href: "/account/dashboard"},
    {id: 2, label: "پروژه ها", href: "/account/projects"},
    {id: 3, label: "افزودن پروژه", href: "/account/projects/add"},
];

const Header = () => {
    const location = useLocation();

    return (
        <div className="d-flex justify-content-center align-items-center w-100 bg-primary">
            <div className="row gy-5 w-100 mw-950px p-5 mb-lg-15">
                <div className="order-2 order-md-1 col-12 col-md-4 d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        variant="h1"
                        color="white"
                        size="xxl"
                        isBold
                    >
                        افزودن پروژه
                    </Typography>
                </div>

                <div className="order-1 order-md-2 col-12 col-md-8 d-flex justify-content-end align-items-center gap-2">
                    <IconButton color="primary">
                        <Badge
                            color="light-primary"
                            size="sm"
                            placement="top-start"
                            label="2"
                        />

                        <LuBell
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>

                    <IconButton color="primary">
                        <LuMoon
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>

                    <IconButton
                        href="/account/profile"
                        color="primary"
                    >
                        <LuUser
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                </div>

                <div className="order-3 col-12 d-flex flex-column justify-content-center align-items-start gap-5">
                    <Breadcrumbs
                        links={breadcrumbLinks}
                        activeLink={location.pathname}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;