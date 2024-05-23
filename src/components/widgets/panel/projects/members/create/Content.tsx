// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {useBoolean} from "usehooks-ts";

// components
import FormData from "@/components/widgets/panel/projects/members/create/FormData.tsx";

// modules
import toast from "@/modules/Toast.tsx";

// services
import {createProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {createProjectMemberSchema} from "@/utils/validations.ts";
import {removeItemFromObject} from "@/utils/functions.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const {value: isFullName, setValue: setIsFullName} = useBoolean(false);

    const createProjectMemberAction = useMutation({
        mutationFn: (data) => createProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/members");
            } else {
                toast("error", data.message);
            }
        }
    });

    const createProjectMemberForm = useFormik({
        initialValues: {
            foa_parent_id: "",
            foa_child_id: "",
            user_id: "",
            name: "",
        },
        validationSchema: createProjectMemberSchema,
        onSubmit: async (result) => {
            if (isFullName && result.name) {
                createProjectMemberAction.mutate({
                    ...removeItemFromObject(result, ["user_id"]),
                    project_id: params.id,
                });
            } else if (!isFullName && result.user_id) {
                createProjectMemberAction.mutate({
                    ...removeItemFromObject(result, ["name"]),
                    project_id: params.id,
                });
            }
        }
    });

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap gap-5 w-100 mt-lg-n20">
                <FormData
                    createProjectMemberForm={createProjectMemberForm}
                    createProjectMemberAction={createProjectMemberAction}
                    isFullName={isFullName}
                    setIsFullName={setIsFullName}
                />
            </div>
        </div>
    )
}

export default Content;
