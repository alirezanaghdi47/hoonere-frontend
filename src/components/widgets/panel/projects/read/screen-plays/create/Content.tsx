// libraries
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/screen-plays/create/FormData.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {createProjectScreenPlayService , ICreateProjectScreenPlay} from "@/services/projectScreenPlayService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const createProjectScreenPlaySchema = Yup.object().shape({
    description: Yup.string().trim().required("توضیحات فیلم نامه الزامی است"),
    address: Yup.string().trim().required("موقعیت فیلم نامه الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا فیلم نامه الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان فیلم نامه الزامی است"),
    part: Yup.number().min(1, "قسمت فیلم نامه از 1 باید بیشتر باشد").required("قسمت فیلم نامه الزامی است"),
    sequence: Yup.number().min(1, "سکانس فیلم نامه از 1 باید بیشتر باشد").required("سکانس فیلم نامه الزامی است"),
    fields: Yup.array().of(Yup.object().shape({
        title: Yup.string().trim(),
        value: Yup.string().trim(),
    })),
});

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const createProjectScreenPlayAction = useMutation({
        mutationFn: (data: ICreateProjectScreenPlay) => createProjectScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/screen-plays");
            } else {
                Toast("error", data.message);
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
