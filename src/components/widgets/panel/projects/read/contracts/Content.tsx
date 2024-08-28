// libraries
import {useLayoutEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
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
    readAllProjectContractService
} from "@/services/projectContractService.ts";

// types
import {IReadAllProjectContract} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();
    const location = useLocation();

    const {
        filter,
        initialFilter,
        isOpenFilter,
        showFilter,
        hideFilter,
        resetFilter,
        changeFilter
    } = useFilter<IReadAllProjectContract>({
        contract_number: "",
        start_date: "",
        end_date: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectContractAction = useMutation({
        mutationFn: (data: IReadAllProjectContract) => location.hash === "#is_invited=0" ? readAllProjectContractService(data) : readAllInvitedProjectContractService(data),
    });

    useLayoutEffect(() => {
        readAllProjectContractAction.mutate({
            ...filter,
            project_id: params.id
        });
    }, [location.hash]);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectContractAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={500}
                        />
                    )
                }

                {
                    !readAllProjectContractAction.isPending && (
                        <TabBar/>
                    )
                }

                {
                    !readAllProjectContractAction.isPending && (
                        <DataTable
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