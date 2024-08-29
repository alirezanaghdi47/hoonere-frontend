// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useBoolean} from "usehooks-ts";

// components
import FormData from "@/components/widgets/panel/projects/read/members/create/FormData.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {createProjectMemberService , ICreateProjectMember} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const createProjectMemberWithFullNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است")
});

const createProjectMemberWithUserNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
    user_id: Yup.string().trim().required("نام کاربری الزامی است")
});

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const {value: isFullName, setValue: setIsFullName} = useBoolean(false);

    const createProjectMemberAction = useMutation({
        mutationFn: (data: ICreateProjectMember) => createProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/members");
            } else {
                Toast("error", data.message);
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
