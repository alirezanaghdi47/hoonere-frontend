// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataTable from "@/components/widgets/panel/projects/read/contracts/DataTable.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter";

// services
import {readAllProjectContractService} from "@/services/projectContractService";

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
    } = useFilter({
        contract_number: "",
        start_date: "",
        end_date: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectContractAction = useMutation({
        mutationFn: (data) => readAllProjectContractService({
            ...data,
            project_id: params.id
        }),
    });

    useLayoutEffect(() => {
        readAllProjectContractAction.mutate({
            ...filter,
            project_id: params.id
        });
    }, []);

    console.log(readAllProjectContractAction.data?.data.contracts)

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