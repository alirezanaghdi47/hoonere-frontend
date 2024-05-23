// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/members/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import toast from "@/modules/Toast.tsx";

// services
import {updateProjectMemberService, readProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {updateProjectMemberSchema} from "@/utils/validations.ts";
import {removeItemFromObject} from "@/utils/functions.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectMemberAction = useMutation({
        mutationFn: (data) => readProjectMemberService(data),
    });

    const updateProjectMemberAction = useMutation({
        mutationFn: (data) => updateProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/members");
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProjectMemberForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            foa_parent_id: readProjectMemberAction.data?.data?.member_info?.foa_parent_id ? readProjectMemberAction.data?.data?.member_info.foa_parent_id : "",
            foa_child_id: readProjectMemberAction.data?.data?.member_info?.foa_child_id ? readProjectMemberAction.data?.data?.member_info.foa_child_id : "",
            user_id: readProjectMemberAction.data?.data?.member_info?.user_id ? readProjectMemberAction.data?.data?.member_info.user_id : "",
            name: readProjectMemberAction.data?.data?.member_info?.name ? readProjectMemberAction.data?.data?.member_info.name : "",
        },
        validationSchema: updateProjectMemberSchema,
        onSubmit: async (result) => {
            if (result.name) {
                updateProjectMemberAction.mutate({
                    ...removeItemFromObject(result, ["user_id"]),
                    project_id: params.id,
                    member_id: params.subId,
                });
            } else if (result.user_id) {
                updateProjectMemberAction.mutate({
                    ...removeItemFromObject(result, ["name"]),
                    project_id: params.id,
                    member_id: params.subId,
                });
            }
        }
    });

    useLayoutEffect(() => {
        readProjectMemberAction.mutate({
            project_id: params.id,
            member_id: params.subId
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap gap-5 w-100 mt-lg-n20">
                {
                    readProjectMemberAction?.isPending && (
                        <Loading
                            width="100%"
                            height={300}
                            withCard
                        />
                    )
                }

                {
                    !readProjectMemberAction?.isPending && (
                        <FormData
                            readProjectMemberAction={readProjectMemberAction}
                            updateProjectMemberForm={updateProjectMemberForm}
                            updateProjectMemberAction={updateProjectMemberAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
