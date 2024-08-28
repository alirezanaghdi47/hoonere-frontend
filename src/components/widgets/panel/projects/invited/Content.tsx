// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/invited/DataModal.tsx";

// services
import {readInvitedProjectService} from "@/services/projectService.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readInvitedProjectAction = useMutation({
        mutationFn: (data) => readInvitedProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(prevState => ({...prevState, ...data?.data?.project_info}));
            }
        }
    });

    useLayoutEffect(() => {
        readInvitedProjectAction.mutate({
            project_id: params.id
        });
    }, []);

    return !readInvitedProjectAction.isPending && readInvitedProjectAction.data?.data?.project_info && Object.keys(readInvitedProjectAction.data?.data?.project_info).length > 0 && (
        <DataModal
            project={data}
            readInvitedProjectAction={readInvitedProjectAction}
        />
    )
}

export default Content;