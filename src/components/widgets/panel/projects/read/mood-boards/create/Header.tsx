// libraries
import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {LuBell, LuMoon, LuSun, LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.jsx";
import IconButton from "@/modules/IconButton.jsx";
import Badge from "@/modules/Badge.jsx";
import Breadcrumbs from "@/modules/Breadcrumbs.jsx";

// stores
import useAuthStore from "@/stores/authStore.js";
import useAppStore from "@/stores/appStore.js";

const Header = () => {
    const params = useParams();
    const location = useLocation();
    const{auth} = useAuthStore();
    const {app: {isDark}, toggleTheme} = useAppStore();

    const [breadcrumbLinks , setBreadcrumbLinks] = useState([
        {id: 1, label: "داشبورد", href: auth.panel_url + "dashboard"},
        {id: 2, label: "پروژه ها", href: auth.panel_url + "projects"},
        {id: 3, label: ` پروژه ${params.id} `, href: auth.panel_url + `projects/${params.id}`},
        {id: 4, label: `مود بورد ها`, href: auth.panel_url + `projects/${params.id}/mood-boards`},
    ]);

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
                        افزودن مود بورد
                    </Typography>
                </div>

                <div className="order-1 order-md-2 col-12 col-md-8 d-flex justify-content-end align-items-center gap-2">
                    <IconButton color="success">
                        <Badge
                            color="light-success"
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
                        color="success"
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
                        href={auth.panel_url + "profile#review"}
                        color="success"
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