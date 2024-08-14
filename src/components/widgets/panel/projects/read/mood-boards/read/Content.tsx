// libraries
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataModal from "@/components/widgets/panel/projects/read/mood-boards/read/DataModal.tsx";

// services
import {readProjectMoodBoardService} from "@/services/projectMoodBoardService.ts";

// types
import {IReadProjectMoodBoard} from "@/types/serviceType.ts";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    const readProjectMoodBoardAction = useMutation({
        mutationFn: (data: IReadProjectMoodBoard) => readProjectMoodBoardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                setData(data?.data?.moodboard_info);
            }
        }
    });

    useLayoutEffect(() => {
        readProjectMoodBoardAction.mutate({
            project_id: params.id,
            moodboard_id: params.subId,
        })
    }, []);

    return !readProjectMoodBoardAction.isPending && readProjectMoodBoardAction.data?.data?.moodboard_info && Object.keys(readProjectMoodBoardAction.data?.data?.moodboard_info).length > 0 && (
        <DataModal moodBoard={data}/>
    )
}

export default Content;