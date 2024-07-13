// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataTable from "@/components/widgets/panel/projects/read/affiches/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// services
import {readAllProjectAfficheService} from "@/services/projectAffichesService.ts";

// types
import {IReadAllProjectAffiche} from "@/types/serviceType.ts";

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
    } = useFilter<IReadAllProjectAffiche>({
        number_string: "",
        type: "",
        affiche_date: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectAfficheAction = useMutation({
        mutationFn: (data: IReadAllProjectAffiche) => readAllProjectAfficheService({
            ...data,
            project_id: params.id
        }),
    });

    useLayoutEffect(() => {
        readAllProjectAfficheAction.mutate(filter);
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectAfficheAction.isPending && (
                        <Loading
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectAfficheAction.isPending && (
                        <DataTable
                            readAllProjectAfficheAction={readAllProjectAfficheAction}
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