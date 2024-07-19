// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/mood-boards/update/FormData.tsx";

// helpers
import toast from "@/helpers/toast.jsx";

// services
import {readProjectMoodBoardService, updateProjectMoodBoardService} from "@/services/projectMoodboardsService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IReadProjectAffiche} from "@/types/serviceType.ts";

// utils
import {updateProjectMoodBoardSchema} from "@/utils/validations.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectMoodBoardAction = useMutation({
        mutationFn: (data: IReadProjectAffiche) => readProjectMoodBoardService(data),
    });

    const updateProjectMoodBoardAction = useMutation({
        mutationFn: (data) => updateProjectMoodBoardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/mood-boards");
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProjectMoodBoardForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            type: "",
            image: {},
            audio: {},
            video: "",
            text: "",
        },
        validationSchema: updateProjectMoodBoardSchema,
        onSubmit: async (result) => {
            updateProjectMoodBoardAction.mutate({
                ...result,
                content: result.image || result.audio || result.video || result.text
            });
        }
    });

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-column  justify-content-center gap-5 w-100 mt-lg-n20">
                <FormData
                    updateProjectMoodBoardForm={updateProjectMoodBoardForm}
                    updateProjectMoodBoardAction={updateProjectMoodBoardAction}
                />
            </div>
        </div>
    )
}

export default Content;