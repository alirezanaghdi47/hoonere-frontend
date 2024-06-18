// libraries
import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {LuBell, LuMoon, LuSun, LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Badge from "@/modules/Badge.tsx";
import Breadcrumbs from "@/modules/Breadcrumbs.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const Header = () => {
    const params = useParams();
    const location = useLocation();
    const{auth} = useAuthStore();
    const {app: {isDark}, toggleTheme} = useAppStore();

    const [breadcrumbLinks , setBreadcrumbLinks] = useState([
        {id: 1, label: "داشبورد", href: auth.panel_url + "dashboard"},
        {id: 2, label: "پروژه ها", href: auth.panel_url + "projects"},
        {id: 3, label: "اعضا", href: auth.panel_url + "projects/" + params.id + "/members"},
    ]);

    return (
        <div className="d-flex justify-content-center align-items-center w-100 bg-primary">
            <div className="row gy-5 w-100 mw-950px p-5 mb-lg-15">
                <div className="order-2 order-md-1 col-12 col-md-4 d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        variant="h1"
                        color="light"
                        size="xxl"
                        isBold
                    >
                        افزودن عضو
                    </Typography>
                </div>

                <div className="order-1 order-md-2 col-12 col-md-8 d-flex justify-content-end align-items-center gap-2">
                    <IconButton textColor="light">
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

                    <IconButton
                        textColor="light"
                        onClick={toggleTheme}
                    >
                        {
                            isDark ? (
                                <LuSun
                                    size={20}
                                    color="currentColor"
                                />
                            ) : (
                                <LuMoon
                                    size={20}
                                    color="currentColor"
                                />
                            )
                        }
                    </IconButton>

                    <IconButton
                        textColor="light"
                        href={auth.panel_url + "profile"}
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