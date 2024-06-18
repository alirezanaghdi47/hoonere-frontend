// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {useBoolean} from "usehooks-ts";

// components
import FormData from "@/components/widgets/panel/projects/members/create/FormData.tsx";

// modules
import toast from "@/helpers/toast.tsx";

// services
import {createProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {ICreateProjectMember} from "@/types/serviceType.ts";

// utils
import {createProjectMemberWithFullNameSchema, createProjectMemberWithUserNameSchema} from "@/utils/validations.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const {value: isFullName, setValue: setIsFullName} = useBoolean(false);

    const createProjectMemberAction = useMutation({
        mutationFn: (data: ICreateProjectMember) => createProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/members");
            } else {
                toast("error", data.message);
            }
        }
    });

    const createProjectMemberFormWithFullName = useFormik({
        initialValues: {
            foa_parent_id: "",
            foa_child_id: "",
            name: "",
        },
        validationSchema: createProjectMemberWithFullNameSchema,
        onSubmit: async (result) => {
            createProjectMemberAction.mutate({
                ...result,
                project_id: params.id,
            });
        }
    });

    const createProjectMemberFormWithUserName = useFormik({
        initialValues: {
            foa_parent_id: "",
            foa_child_id: "",
            user_id: "",
        },
        validationSchema: createProjectMemberWithUserNameSchema,
        onSubmit: async (result) => {
            createProjectMemberAction.mutate({
                ...result,
                project_id: params.id,
            });
        }
    });

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                <FormData
                    createProjectMemberFormWithUserName={createProjectMemberFormWithUserName}
                    createProjectMemberFormWithFullName={createProjectMemberFormWithFullName}
                    createProjectMemberAction={createProjectMemberAction}
                    isFullName={isFullName}
                    setIsFullName={setIsFullName}
                />
            </div>
        </div>
    )
}

export default Content;
