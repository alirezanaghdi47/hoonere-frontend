// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataTable from "@/components/widgets/panel/projects/read/affiches/histories/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter";

// services
import {readAllProjectAfficheHistoryService} from "@/services/projectAfficheService.ts";

// types
import {IReadAllProjectAfficheHistory} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();

    const {
        filter,
        initialFilter,
        isOpenFilter,
        showFilter,
        hideFilter,
        resetFilter,
        changeFilter
    } = useFilter<IReadAllProjectAfficheHistory>({
        text: "",
        date: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectAfficheHistoryAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheHistory) => readAllProjectAfficheHistoryService(data),
    });

    useLayoutEffect(() => {
        readAllProjectAfficheHistoryAction.mutate({
            ...filter,
            project_id: params.id,
            affiche_id: params.subId,
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectAfficheHistoryAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectAfficheHistoryAction.isPending && (
                        <DataTable
                            readAllProjectAfficheHistoryAction={readAllProjectAfficheHistoryAction}
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