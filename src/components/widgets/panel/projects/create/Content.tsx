// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/create/FormData.tsx";

// modules
import toast from "@/modules/Toast.tsx";

// services
import {createProjectService} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {createProjectSchema} from "@/utils/validations.ts";
import {toEnglishDigits} from "@/utils/functions.ts";

const Content = () => {
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const createProjectAction = useMutation({
        mutationFn: (data) => createProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects");
            } else {
                toast("error", data.message);
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
            count_of_parts: 0,
            time_of_parts: 0,
            location: "",
        },
        validationSchema: createProjectSchema,
        onSubmit: async (result) => {
            createProjectAction.mutate({
                ...result,
                count_of_parts: toEnglishDigits(result.count_of_parts),
                time_of_parts: toEnglishDigits(result.time_of_parts),
            });
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
