// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import TabBar from "@/components/widgets/panel/projects/read/contracts/TabBar.tsx";
import DataTable from "@/components/widgets/panel/projects/read/contracts/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// services
import {
    readAllInvitedProjectContractService,
    readAllProjectContractService,
    IReadAllInvitedProjectContract,
    IReadAllProjectContract
} from "@/services/projectContractService.ts";

const Content = ({checkProjectIsMineAction}) => {
    const params = useParams();

    const {
        filter,
        initialFilter,
        isOpenFilter,
        showFilter,
        hideFilter,
        resetFilter,
        changeFilter
    } = useFilter<IReadAllProjectContract | IReadAllInvitedProjectContract>({
        contract_number: "",
        start_date: "",
        end_date: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectContractAction = useMutation({
        mutationFn: (data: IReadAllProjectContract | IReadAllInvitedProjectContract) => (!checkProjectIsMineAction.isPending && checkProjectIsMineAction.data?.data?.result === "1") ? readAllProjectContractService(data) : (!checkProjectIsMineAction.isPending && checkProjectIsMineAction.data?.data?.result === "0") ? readAllInvitedProjectContractService(data) : null,
    });

    useLayoutEffect(() => {
        if (!checkProjectIsMineAction.isPending && checkProjectIsMineAction.data?.data?.result) {
            readAllProjectContractAction.mutate({
                ...filter,
                project_id: params.id
            });
        }
    }, [checkProjectIsMineAction]);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    (checkProjectIsMineAction.isPending || readAllProjectContractAction.isPending) && (
                        <Loading
                            withCard
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    (!checkProjectIsMineAction.isPending && !readAllProjectContractAction.isPending) && (
                        <TabBar checkProjectIsMineAction={checkProjectIsMineAction}/>
                    )
                }

                {
                    (!checkProjectIsMineAction.isPending && !readAllProjectContractAction.isPending) && (
                        <DataTable
                            checkProjectIsMineAction={checkProjectIsMineAction}
                            readAllProjectContractAction={readAllProjectContractAction}
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