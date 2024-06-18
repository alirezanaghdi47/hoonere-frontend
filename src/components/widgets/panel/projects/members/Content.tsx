// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useBoolean} from "usehooks-ts";

// components
import DataList from "@/components/widgets/panel/projects/members/DataList.tsx";
import DataTable from "@/components/widgets/panel/projects/members/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// services
import {readAllProjectMemberService} from "@/services/projectMemberService.ts";

// types
import {IReadAllProjectMember} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();
    const {value: isListView , toggle: toggleView} = useBoolean(false);

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
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectMemberAction.isPending && isListView && (
                        <DataList
                            readAllProjectMemberAction={readAllProjectMemberAction}
                            filter={filter}
                            initialFilter={initialFilter}
                            isOpenFilter={isOpenFilter}
                            changeFilter={changeFilter}
                            resetFilter={resetFilter}
                            hideFilter={hideFilter}
                            showFilter={showFilter}
                            isListView={isListView}
                            toggleView={toggleView}
                        />
                    )
                }

                {
                    !readAllProjectMemberAction.isPending && !isListView && (
                        <DataTable
                            readAllProjectMemberAction={readAllProjectMemberAction}
                            filter={filter}
                            initialFilter={initialFilter}
                            isOpenFilter={isOpenFilter}
                            changeFilter={changeFilter}
                            resetFilter={resetFilter}
                            hideFilter={hideFilter}
                            showFilter={showFilter}
                            isListView={isListView}
                            toggleView={toggleView}
                        />
                    )
                }
            </div>
        </div>
    )

}

export default Content;