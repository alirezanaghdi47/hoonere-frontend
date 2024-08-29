// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataTable from "@/components/widgets/panel/projects/read/members/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// services
import {readAllProjectMemberService , IReadAllProjectMember} from "@/services/projectMemberService.ts";

const Content = () => {
    const params = useParams();

    const {filter, initialFilter, isOpenFilter, showFilter, hideFilter, resetFilter, changeFilter} = useFilter<IReadAllProjectMember>({
        text: "",
        foa_child_id: "",
        foa_parent_id: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectMemberAction = useMutation({
        mutationFn: (data:IReadAllProjectMember ) => readAllProjectMemberService(data),
    });

    useLayoutEffect(() => {
        readAllProjectMemberAction.mutate({
            ...filter,
            project_id: params?.id
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectMemberAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectMemberAction.isPending && (
                        <DataTable
                            readAllProjectMemberAction={readAllProjectMemberAction}
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