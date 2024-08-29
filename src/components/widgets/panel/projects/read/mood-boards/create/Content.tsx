// libraries
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/mood-boards/create/FormData.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {createProjectMoodBoardService , ICreateProjectMoodBoard} from "@/services/projectMoodBoardService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const createProjectMoodBoardSchema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان مود بورد الزامی است"),
    type: Yup.string().trim().required("نوع مود بورد الزامی است"),
    image: Yup.mixed().when('type', {
        is: (value) => value === "image",
        then: (schema) => schema.test("fileExist", "محتوای مود بورد الزامی است", (value: File) => {
            return Object.keys(value).length !== 0;
        }).test("fileSize", "حجم تصویر ارسالی حداکثر 1 مگابایت باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return value.size <= 1 * 1_024_000;
            }
        }).test("fileType", "فرمت تصویر ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
            }
        }).required("محتوای مود بورد الزامی است"),
    }),
    audio: Yup.mixed().when('type', {
        is: (value) => value === "audio",
        then: (schema) => schema.test("fileExist", "محتوای مود بورد الزامی است", (value: File) => {
            return Object.keys(value).length !== 0;
        }).test("fileSize", "حجم صدای ارسالی حداکثر 5 مگابایت باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return value.size <= 5 * 1_024_000;
            }
        }).test("fileType", "فرمت صدای ارسالی باید از نوع (mp3 , wav , ogg) باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return ['audio/mp3', 'audio/wav', 'audio/ogg'].includes(value.type);
            }
        }),
    }),
    video: Yup.string().when("type", {
        is: (value) => value === "video",
        then: (schema) => schema.trim().required("محتوای مود بورد الزامی است")
    }),
    text: Yup.string().when("type", {
        is: (value) => value === "text",
        then: (schema) => schema.trim().required("محتوای مود بورد الزامی است")
    }),
});

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