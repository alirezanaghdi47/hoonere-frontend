// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";

// components
import Filter from "@/components/widgets/panel/projects/Filter.tsx";
import DataTable from "@/components/widgets/panel/projects/DataTable.tsx";
import Finder from "@/components/widgets/panel/projects/Finder.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// services
import {readAllProjectService} from "@/services/projectService.ts";

const Content = () => {
    const {filter, initialFilter, isOpenFilter, showFilter, hideFilter, resetFilter, changeFilter} = useFilter({
        text: "",
        type_id: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectAction = useMutation({
        mutationFn: (data) => readAllProjectService(data),
    });

    useLayoutEffect(() => {
        readAllProjectAction.mutate(filter);
    }, []);

    return (
        <div
            className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 mw-950px mt-lg-n20 p-5">
            <div className="card w-100">
                <div className="card-body d-flex flex-column gap-5">
                    <Filter
                        readAllProjectAction={readAllProjectAction}
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        isOpenFilter={isOpenFilter}
                        showFilter={showFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                    />

                    {
                        readAllProjectAction?.isPending && (
                            <Loading
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    {
                        (!readAllProjectAction?.isPending && readAllProjectAction.data?.data?.projects.length > 0) && (
                            <DataTable
                                readAllProjectAction={readAllProjectAction}
                                filter={filter}
                            />
                        )
                    }

                    {
                        (!readAllProjectAction?.isPending && readAllProjectAction.data?.data?.projects.length === 0) && (
                            <Empty
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    <Finder
                        readAllProjectAction={readAllProjectAction}
                        filter={filter}
                        changeFilter={changeFilter}
                    />
                </div>
            </div>
        </div>
    )

}

export default Content;