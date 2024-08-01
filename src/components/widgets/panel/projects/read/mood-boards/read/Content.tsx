// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/mood-boards/read/DataModal.tsx";

// services
import {readProjectMoodBoardService} from "@/services/projectMoodboardsService.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readProjectAfficheAction = useMutation({
        mutationFn: (data) => readProjectMoodBoardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(data?.data?.moodboard_info);
            }
        }
    });

    useLayoutEffect(() => {
        readProjectAfficheAction.mutate({
            project_id: params.id,
            moodboard_id: params.subId,
        })
    }, []);

    return !readProjectAfficheAction.isPending && readProjectAfficheAction.data?.data?.moodboard_info && Object.keys(readProjectAfficheAction.data?.data?.moodboard_info).length > 0 && (
        <DataModal moodBoard={data}/>
    )
}

export default Content;