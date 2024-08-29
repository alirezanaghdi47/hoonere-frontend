// libraries
import {useLayoutEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import ActionBar from "@/components/partials/panel/ActionBar.tsx";

// modules
import Typography from "@/modules/Typography";
import Breadcrumbs from "@/modules/Breadcrumbs";
import Button from "@/modules/Button";

// services
import {checkProjectContractHasSupplementService, ICheckProjectContractHasSupplementAction} from "@/services/projectContractService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Header = () => {
    const params = useParams();
    const location = useLocation();
    const {auth} = useAuthStore();

    const [breadcrumbLinks, setBreadcrumbLinks] = useState([
        {id: 1, label: "داشبورد", href: auth.panel_url + "dashboard"},
        {id: 2, label: "پروژه ها", href: auth.panel_url + "projects"},
        {id: 3, label: ` پروژه ${params.id} `, href: auth.panel_url + `projects/${params.id}`},
        {id: 4, label: "قرارداد ها", href: auth.panel_url + `projects/${params.id}/contracts`},
    ]);

    const checkProjectContractHasSupplementAction = useMutation({
        mutationFn: (data: ICheckProjectContractHasSupplementAction) => checkProjectContractHasSupplementService(data),
    });

    useLayoutEffect(() => {
        checkProjectContractHasSupplementAction.mutate({
            project_id: params.id,
            contract_id: params.subId,
        });
    }, []);

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
                        متمم و الحاقیه ها
                    </Typography>
                </div>

                <ActionBar>
                    {
                        checkProjectContractHasSupplementAction.data?.data?.has_supplement === "0" && (
                            <>
                                <Button
                                    href={auth.panel_url + `projects/${params.id}/contracts/${params.subId}/insertions/create#is_supplement=1`}
                                    color="info"
                                >
                                    افزودن متمم
                                </Button>

                                <Button
                                    href={auth.panel_url + `projects/${params.id}/contracts/${params.subId}/insertions/create#is_supplement=0`}
                                    color="info"
                                >
                                    افزودن الحاقیه
                                </Button>
                            </>
                        )
                    }
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