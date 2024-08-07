// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/screen-plays/create/FormData.tsx";

// helpers
import toast from "@/helpers/toast"

// services
import {createProjectScreenPlayService} from "@/services/projectScreenPlayService";

// stores
import useAuthStore from "@/stores/authStore";

// types
import {ICreateProjectScreenPlay} from "@/types/serviceType.ts";

// utils
import {createProjectScreenPlaySchema} from "@/utils/validations.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const createProjectScreenPlayAction = useMutation({
        mutationFn: (data: ICreateProjectScreenPlay) => createProjectScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/screen-plays");
            } else {
                toast("error", data.message);
            }
        }
    });

    const createProjectScreenPlayForm = useFormik({
        initialValues: {
            description: "",
            address: "",
            time_type_id: "",
            location_side_id: "",
            part: "",
            sequence: "",
            fields: []
        },
        validationSchema: createProjectScreenPlaySchema,
        onSubmit: async (result) => {
            createProjectScreenPlayAction.mutate({
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
                    createProjectScreenPlayForm={createProjectScreenPlayForm}
                    createProjectScreenPlayAction={createProjectScreenPlayAction}
                />
            </div>
        </div>
    )
}

export default Content;
