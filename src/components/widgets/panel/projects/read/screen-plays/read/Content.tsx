// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/screen-plays/read/DataModal.tsx";

// services
import {readProjectScreenPlayService} from "@/services/projectScreenPlayService";

// types
import {IReadProjectScreenPlay} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readProjectScreenPlayAction = useMutation({
        mutationFn: (data: IReadProjectScreenPlay) => readProjectScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(data?.data?.screenplay_info);
            }
        }
    });

    useLayoutEffect(() => {
        readProjectScreenPlayAction.mutate({
            project_id: params.id,
            screenplay_id: params.subId
        });
    }, []);

    return !readProjectScreenPlayAction.isPending && readProjectScreenPlayAction.data?.data?.screenplay_info && Object.keys(readProjectScreenPlayAction.data?.data?.screenplay_info).length > 0 && (
        <DataModal screenPlay={data}/>
    )
}

export default Content;