// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import Content from "@/components/widgets/panel/projects/read/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

// services
import {checkProjectIsMineService, ICheckProjectIsMine} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Project = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();

    const checkProjectIsMineAction = useMutation({
        mutationFn: (data: ICheckProjectIsMine) => checkProjectIsMineService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                if (data?.data?.result === "0") {
                    navigate(auth.panel_url + "projects", {replace: true});
                }
            }
        }
    });

    useLayoutEffect(() => {
        checkProjectIsMineAction.mutate({
            project_id: params.id
        });
    }, [location.key]);

    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(Project);