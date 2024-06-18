// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import toast from "@/helpers/toast.tsx";

// services
import {readProjectService, updateProjectService} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IReadProject, IUpdateProject} from "@/types/serviceType.ts";

// utils
import {updateProjectSchema} from "@/utils/validations.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectAction = useMutation({
        mutationFn: (data: IReadProject) => readProjectService(data),
    });

    const updateProjectAction = useMutation({
        mutationFn: (data: IUpdateProject) => updateProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects");
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProjectForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            logo: {},
            type_id: readProjectAction.data?.data?.project_info?.type_id ? readProjectAction.data?.data?.project_info.type_id : "",
            title: readProjectAction.data?.data?.project_info?.title ? readProjectAction?.data.data?.project_info.title : "",
            description: readProjectAction.data?.data?.project_info?.description ? readProjectAction.data?.data?.project_info.description : "",
            producer: readProjectAction.data?.data?.project_info?.user_id ? readProjectAction.data?.data?.project_info.user_id : "",
            count_of_parts: readProjectAction.data?.data?.project_info?.count_of_parts ? readProjectAction.data?.data?.project_info.count_of_parts : 0,
            time_of_parts: readProjectAction.data?.data?.project_info?.time_of_parts ? readProjectAction.data?.data?.project_info.time_of_parts : 0,
            location: readProjectAction.data?.data?.project_info?.location ? readProjectAction.data?.data?.project_info.location : "",
        },
        validationSchema: updateProjectSchema,
        onSubmit: async (result) => {
            updateProjectAction.mutate({
                ...result,
                project_id: params.id
            });
        }
    });

    useLayoutEffect(() => {
        readProjectAction.mutate({project_id: params.id});
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readProjectAction.isPending && (
                        <Loading
                            width="100%"
                            height={950}
                        />
                    )
                }

                {
                    !readProjectAction.isPending && (
                        <FormData
                            readProjectAction={readProjectAction}
                            updateProjectForm={updateProjectForm}
                            updateProjectAction={updateProjectAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
