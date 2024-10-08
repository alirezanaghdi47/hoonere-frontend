// libraries
import {useLayoutEffect} from "react";
import {useLocation} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import TabBar from "@/components/widgets/panel/projects/TabBar.tsx";
import DataTable from "@/components/widgets/panel/projects/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// services
import {readAllInvitedProjectService, readAllProjectService , IReadAllInvitedProject, IReadAllProject} from "@/services/projectService.ts";

const Content = () => {
    const location = useLocation();

    const {filter, initialFilter, isOpenFilter, showFilter, hideFilter, resetFilter, changeFilter} = useFilter<IReadAllProject | IReadAllInvitedProject>({
        text: "",
        type_id: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectAction = useMutation({
        mutationFn: (data: IReadAllProject | IReadAllInvitedProject) => location.hash === "#is_invited=0" ? readAllProjectService(data) : readAllInvitedProjectService(data),
    });

    useLayoutEffect(() => {
        readAllProjectAction.mutate(filter);
    }, [location.hash]);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectAction.isPending && (
                        <TabBar/>
                    )
                }

                {
                    !readAllProjectAction.isPending && (
                        <DataTable
                            readAllProjectAction={readAllProjectAction}
                            filter={filter}
                            initialFilter={initialFilter}
                            isOpenFilter={isOpenFilter}
                            changeFilter={changeFilter}
                            resetFilter={resetFilter}
                            hideFilter={hideFilter}
                            showFilter={showFilter}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;