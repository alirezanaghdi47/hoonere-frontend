// libraries
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/mood-boards/create/FormData.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {createProjectMoodBoardService} from "@/services/projectMoodBoardService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {ICreateProjectMoodBoard} from "@/types/serviceType.ts";

// utils
import {createProjectMoodBoardSchema} from "@/utils/validations.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const createProjectMoodBoardAction = useMutation({
        mutationFn: (data: ICreateProjectMoodBoard) => createProjectMoodBoardService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/mood-boards");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const createProjectMoodBoardForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            type: "",
            image: {},
            audio: {},
            video: "",
            text: "",
        },
        validationSchema: createProjectMoodBoardSchema,
        onSubmit: async (result) => {
            createProjectMoodBoardAction.mutate({
                project_id: params.id,
                title: result.title,
                type: result.type,
                content: result.type === "1" ? result.image : result.type === "2" ? result.video : result.type === "3" ? result.audio : result.text
            });
        }
    });

    useEffect(() => {
        if (createProjectMoodBoardForm.values.type) {
            createProjectMoodBoardForm.setFieldValue("image", {});
            createProjectMoodBoardForm.setFieldValue("audio", {});
            createProjectMoodBoardForm.setFieldValue("video", "");
            createProjectMoodBoardForm.setFieldValue("text", "");
        }
    }, [createProjectMoodBoardForm.values.type]);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-column  justify-content-center gap-5 w-100 mt-lg-n20">
                <FormData
                    createProjectMoodBoardForm={createProjectMoodBoardForm}
                    createProjectMoodBoardAction={createProjectMoodBoardAction}
                />
            </div>
        </div>
    )
}

export default Content;