// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import DataList from "@/components/widgets/panel/projects/members/DataList.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// services
import {readAllProjectMemberService} from "@/services/projectMemberService.ts";

const Content = () => {
    const params = useParams();

    const readAllProjectMemberAction = useMutation({
        mutationFn: (data) => readAllProjectMemberService(data),
    });

    useLayoutEffect(() => {
        readAllProjectMemberAction.mutate({project_id: params?.id});
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectMemberAction?.isPending && (
                        <Loading
                            width="100%"
                            height={350}
                        />
                    )
                }

                {
                    !readAllProjectMemberAction?.isPending && (
                        <DataList readAllProjectMemberAction={readAllProjectMemberAction}/>
                    )
                }
            </div>
        </div>
    )

}

export default Content;