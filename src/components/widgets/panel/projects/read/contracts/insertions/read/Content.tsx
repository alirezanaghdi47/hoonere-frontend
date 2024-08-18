// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/contracts/insertions/read/DataModal.tsx";

// services
import {readProjectContractInsertionService} from "@/services/projectContractService.ts";

// types
import {IReadProjectContractInsertion} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readProjectContractInsertionAction = useMutation({
        mutationFn: (data: IReadProjectContractInsertion) => readProjectContractInsertionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                console.log(data?.data?.contract_info)
                setData(prevState => ({
                    ...prevState,
                    ...data?.data?.insertion_info,
                    start_date: data?.data?.contract_info?.start_date,
                    end_date: data?.data?.contract_info?.end_date,
                    type_id: data?.data?.contract_info?.type_id,
                    members: data?.data?.contract_info?.members,
                    informal_members: data?.data?.contract_info?.informal_members
                }));
            }
        }
    });

    useLayoutEffect(() => {
        readProjectContractInsertionAction.mutate({
            project_id: params.id,
            contract_id: params.subId,
            insertion_id: params.subSubId,
            get_last: 1
        })
    }, []);

    return !readProjectContractInsertionAction.isPending && readProjectContractInsertionAction.data?.data?.insertion_info && Object.keys(readProjectContractInsertionAction.data?.data?.insertion_info).length > 0 && (
        <DataModal insertion={data}/>
    )
}

export default Content;