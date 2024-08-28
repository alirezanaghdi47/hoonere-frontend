// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/create/FormData.tsx";

// modules
import Toast from "@/modules/Toast";

// services
import {createProjectService} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {ICreateProject} from "@/types/serviceType.ts";

// utils
import {createProjectSchema} from "@/utils/validations.ts";

const Content = () => {
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const createProjectAction = useMutation({
        mutationFn: (data: ICreateProject) => createProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const createProjectForm = useFormik({
        initialValues: {
            logo: {},
            type_id: "",
            title: "",
            description: "",
            producer: "",
            count_of_parts: "",
            time_of_parts: "",
            location: "",
        },
        validationSchema: createProjectSchema,
        onSubmit: async (result) => {
            createProjectAction.mutate(result);
        }
    });

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                <FormData
                    createProjectForm={createProjectForm}
                    createProjectAction={createProjectAction}
                />
            </div>
        </div>
    )
}

export default Content;
