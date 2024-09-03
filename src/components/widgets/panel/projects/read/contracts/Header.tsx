// libraries
import {useLayoutEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

// components
import ActionBar from "@/components/partials/panel/ActionBar.tsx";

// modules
import Typography from "@/modules/Typography";
import Breadcrumbs from "@/modules/Breadcrumbs";
import Button from "@/modules/Button";
import Dropdown from "@/modules/Dropdown";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Header = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {auth} = useAuthStore();

    const [breadcrumbLinks, setBreadcrumbLinks] = useState([]);

    useLayoutEffect(() => {
        if(location.hash === "#is_invited=0"){
            setBreadcrumbLinks([
                {id: 1, label: "داشبورد", href: auth.panel_url + "dashboard"},
                {id: 2, label: "پروژه ها", href: auth.panel_url + "projects"},
                {id: 3, label: ` پروژه ${params.id} `, href: auth.panel_url + `projects/${params.id}`},
            ]);
        } else if(location.hash === "#is_invited=1") {
            setBreadcrumbLinks([
                {id: 1, label: "داشبورد", href: auth.panel_url + "dashboard"},
                {id: 2, label: "پروژه ها", href: auth.panel_url + "projects"},
            ]);
        }
    } , [location.key]);

    return (
        <div className="d-flex justify-content-center align-items-center w-100 bg-primary">
            <div className="row gy-5 w-100 mw-950px p-5 mb-lg-15">
                <div
                    className="order-2 order-md-1 col-12 col-md-4 d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        variant="h1"
                        color="light"
                        size="xxl"
                        isBold
                    >
                         قرارداد ها
                    </Typography>
                </div>

                <ActionBar>
                    <Dropdown
                        button={
                            <Button color="info">
                                افزودن قرارداد
                            </Button>
                        }
                        options={[
                            {
                                id: 1,
                                label: "قرارداد رسمی",
                                onClick: () => {
                                    navigate(auth.panel_url + `projects/${params.id}/contracts/create#official`);
                                }
                            },
                            {
                                id: 2,
                                label: "قرارداد غیر رسمی",
                                onClick: () => {
                                    navigate(auth.panel_url + `projects/${params.id}/contracts/create#un-official`);
                                }
                            },
                        ]}
                        direction="bottom"
                        alignment="start"
                        gap={0}
                    />
                </ActionBar>

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