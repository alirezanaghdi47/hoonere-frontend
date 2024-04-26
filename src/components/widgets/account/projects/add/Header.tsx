// libraries
import {useLocation} from "react-router-dom";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Badge from "@/modules/Badge.tsx";
import Breadcrumbs from "@/modules/Breadcrumbs.tsx";

const breadcrumbLinks = [
    {id: 1 ,label: "داشبورد" , href: "/account/dashboard"},
    {id: 2 ,label: "پروژه ها" , href: "/account/projects"},
    {id: 3 ,label: "افزودن پروژه" , href: "/account/projects/add"},
];

const Header = () => {
    const location = useLocation();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 bg-success">
            <div className="d-flex justify-content-between align-items-center w-100 mw-950px p-5 mb-lg-15">
                <div className="d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        variant="h1"
                        color="white"
                        size="xxl"
                        isBold
                    >
                        افزودن پروژه
                    </Typography>

                    <Breadcrumbs
                        links={breadcrumbLinks}
                        activeLink={location.pathname}
                    />
                </div>

                <div className="d-flex align-items-center flex-wrap gap-5 py-3 py-lg-0">
                    <IconButton
                        color="success"
                        size="sm"
                    >
                        <Badge
                            color="light-success"
                            size="sm"
                            placement="top-start"
                            label="2"
                        />

                        <i className="fad fa-bell fs-4"/>
                    </IconButton>

                    <IconButton
                        color="success"
                        size="sm"
                    >
                        <i className="fad fa-moon fs-4"/>
                    </IconButton>

                    <IconButton
                        href="/account/profile"
                        color="success"
                    >
                        <i className="fad fa-user fs-4"/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Header;