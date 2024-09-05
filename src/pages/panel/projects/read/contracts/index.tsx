// libraries
import {useLayoutEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import Content from "@/components/widgets/panel/projects/read/contracts/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/contracts/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

// services
import {checkProjectIsMineService, ICheckProjectIsMine} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const ProjectContracts = () => {
    const params = useParams();
    const location = useLocation();
    const {auth} = useAuthStore();

    const checkProjectIsMineAction = useMutation({
        mutationFn: (data: ICheckProjectIsMine) => checkProjectIsMineService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                if (data?.data?.result === "1") {
                    window.history.pushState({}, undefined, auth.panel_url + "projects/" + params.id + "/contracts#is_invited=0");
                } else if (data?.data?.result === "0") {
                    window.history.pushState({}, undefined, auth.panel_url + "projects/" + params.id + "/contracts#is_invited=1");
                }
            }
        }
    });

    useLayoutEffect(() => {
        checkProjectIsMineAction.mutate({
            project_id: params.id
        });
    }, [location.key, location.hash]);

    return (
        <>
            <Header/>
            <Content checkProjectIsMineAction={checkProjectIsMineAction}/>
        </>
    )
}

export default WithRouteGuard(ProjectContracts);