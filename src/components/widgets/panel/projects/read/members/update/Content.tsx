// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/members/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {updateProjectMemberService, readProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IUpdateProjectMember, IReadProjectMember} from "@/types/serviceType.ts";

// utils
import {updateProjectMemberWithUserNameSchema, updateProjectMemberWithFullNameSchema} from "@/utils/validations.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectMemberAction = useMutation({
        mutationFn: (data: IReadProjectMember) => readProjectMemberService(data),
    });

    const updateProjectMemberAction = useMutation({
        mutationFn: (data: IUpdateProjectMember) => updateProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/members");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProjectMemberFormWithFullName = useFormik({
        enableReinitialize: true,
        initialValues: {
            foa_parent_id: readProjectMemberAction.data?.data?.member_info?.foa_parent_id ? readProjectMemberAction.data?.data?.member_info.foa_parent_id : "",
            foa_child_id: readProjectMemberAction.data?.data?.member_info?.foa_child_id ? readProjectMemberAction.data?.data?.member_info.foa_child_id : "",
            name: readProjectMemberAction.data?.data?.member_info?.name ? readProjectMemberAction.data?.data?.member_info.name : "",
        },
        validationSchema: updateProjectMemberWithFullNameSchema,
        onSubmit: async (result) => {
            updateProjectMemberAction.mutate({
                ...result,
                project_id: params.id,
                member_id: params.subId,
            });
        }
    });

    const updateProjectMemberFormWithUserName = useFormik({
        enableReinitialize: true,
        initialValues: {
            foa_parent_id: readProjectMemberAction.data?.data?.member_info?.foa_parent_id ? readProjectMemberAction.data?.data?.member_info.foa_parent_id : "",
            foa_child_id: readProjectMemberAction.data?.data?.member_info?.foa_child_id ? readProjectMemberAction.data?.data?.member_info.foa_child_id : "",
            user_id: readProjectMemberAction.data?.data?.member_info?.user_id ? readProjectMemberAction.data?.data?.member_info.user_id : "",
        },
        validationSchema: updateProjectMemberWithUserNameSchema,
        onSubmit: async (result) => {
            updateProjectMemberAction.mutate({
                ...result,
                project_id: params.id,
                member_id: params.subId,
            });
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
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readProjectMemberAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={400}
                        />
                    )
                }

                {
                    !readProjectMemberAction.isPending && (
                        <FormData
                            readProjectMemberAction={readProjectMemberAction}
                            updateProjectMemberFormWithUserName={updateProjectMemberFormWithUserName}
                            updateProjectMemberFormWithFullName={updateProjectMemberFormWithFullName}
                            updateProjectMemberAction={updateProjectMemberAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
