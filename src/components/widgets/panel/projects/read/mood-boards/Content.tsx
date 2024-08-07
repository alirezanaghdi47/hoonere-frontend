// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataList from "@/components/widgets/panel/projects/read/mood-boards/DataList.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter";

// services
import {readAllProjectMoodBoardService} from "@/services/projectMoodBoardService.ts";

const Content = () => {
    const params = useParams();

    const {filter, initialFilter, isOpenFilter, showFilter, hideFilter, resetFilter, changeFilter} = useFilter({
        title: "",
        type: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectMoodBoardAction = useMutation({
        mutationFn: (data) => readAllProjectMoodBoardService(data),
    });

    useLayoutEffect(() => {
        readAllProjectMoodBoardAction.mutate({
            ...filter,
            project_id: params?.id
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectMoodBoardAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectMoodBoardAction.isPending && (
                        <DataList
                            readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
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