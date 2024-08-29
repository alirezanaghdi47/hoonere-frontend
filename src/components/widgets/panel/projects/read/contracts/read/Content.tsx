// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/contracts/read/DataModal.tsx";

// services
import {readProjectOfficialContractService, readProjectUnOfficialContractService , IReadProjectOfficialContract, IReadProjectUnOfficialContract} from "@/services/projectContractService.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readProjectOfficialContractAction = useMutation({
        mutationFn: (data: IReadProjectOfficialContract) => readProjectOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState, ...data?.data?.contract_info , project_title: data?.data?.project_title}));
            }
        }
    });

    const readProjectUnOfficialContractAction = useMutation({
        mutationFn: (data: IReadProjectUnOfficialContract) => readProjectUnOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState, ...data?.data?.contract_info , project_title: data?.data?.project_title}));
            }
        }
    });

    useLayoutEffect(() => {
        if (location.hash === "#official") {
            readProjectOfficialContractAction.mutate({
                project_id: params.id,
                contract_id: params.subId,
                get_last: 1
            });
        } else if (location.hash === "#un-official") {
            readProjectUnOfficialContractAction.mutate({
                project_id: params.id,
                contract_id: params.subId,
                get_last: 1
            });
        }
    }, []);

    return (
        (!readProjectOfficialContractAction.isPending && readProjectOfficialContractAction.data?.data?.contract_info && Object.keys(readProjectOfficialContractAction.data?.data?.contract_info).length > 0) ||
        (!readProjectUnOfficialContractAction.isPending && readProjectUnOfficialContractAction.data?.data?.contract_info && Object.keys(readProjectUnOfficialContractAction.data?.data?.contract_info).length > 0)
    ) && (
        <DataModal contract={data}/>
    )
}

export default Content;