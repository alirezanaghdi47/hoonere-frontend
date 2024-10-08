// libraries
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/create/FormData.tsx";

// modules
import Toast from "@/modules/Toast";

// services
import {createProjectService , ICreateProject} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const createProjectSchema = Yup.object().shape({
    logo: Yup.mixed().nullable().test("fileSize", "حجم تصویر حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت تصویر ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    type_id: Yup.string().trim().required("نوع پروژه الزامی است"),
    title: Yup.string().trim().required("عنوان پروژه الزامی است"),
    description: Yup.string().trim().required("توضیحات پروژه الزامی است"),
    producer: Yup.string().trim().required("تهیه کننده پروژه الزامی است"),
    count_of_parts: Yup.number().min(1, "حداقل تعداد قسمت پروژه 1 می باشد").required("تعداد قسمت های پروژه الزامی است"),
    time_of_parts: Yup.number().min(1, "حداقل زمان هر قسمت پروژه 1 می باشد").required("مدت زمان هر قسمت پروژه الزامی است"),
    location: Yup.string().trim().required("موقعیت فیلم برداری پروژه الزامی است")
});

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
