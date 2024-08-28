// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/contracts/invited/DataModal.tsx";

// services
import {readInvitedProjectContractService,} from "@/services/projectContractService.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readInvitedProjectContractAction = useMutation({
        mutationFn: (data) => readInvitedProjectContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState, ...data?.data?.contract_info , project_title: data?.data?.project_title}));
            }
        }
    });

    useLayoutEffect(() => {
        readInvitedProjectContractAction.mutate({
            project_id: params.id,
            contract_id: params.subId,
            get_last: 1
        });
    }, []);

    return !readInvitedProjectContractAction.isPending && readInvitedProjectContractAction.data?.data?.contract_info && Object.keys(readInvitedProjectContractAction.data?.data?.contract_info).length > 0 && (
        <DataModal contract={data}/>
    )
}

export default Content;