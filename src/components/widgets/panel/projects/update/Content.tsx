// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast";

// services
import {readProjectService, updateProjectService , IReadProject, IUpdateProject} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const updateProjectSchema = Yup.object().shape({
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
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectAction = useMutation({
        mutationFn: (data: IReadProject) => readProjectService(data),
    });

    const updateProjectAction = useMutation({
        mutationFn: (data: IUpdateProject) => updateProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProjectForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            logo: {},
            type_id: readProjectAction.data?.data?.project_info?.type_id ? readProjectAction.data?.data?.project_info.type_id : "",
            title: readProjectAction.data?.data?.project_info?.title ? readProjectAction?.data.data?.project_info.title : "",
            description: readProjectAction.data?.data?.project_info?.description ? readProjectAction.data?.data?.project_info.description : "",
            producer: readProjectAction.data?.data?.project_info?.user_id ? readProjectAction.data?.data?.project_info.user_id : "",
            count_of_parts: readProjectAction.data?.data?.project_info?.count_of_parts ? readProjectAction.data?.data?.project_info.count_of_parts : 0,
            time_of_parts: readProjectAction.data?.data?.project_info?.time_of_parts ? readProjectAction.data?.data?.project_info.time_of_parts : 0,
            location: readProjectAction.data?.data?.project_info?.location ? readProjectAction.data?.data?.project_info.location : "",
        },
        validationSchema: updateProjectSchema,
        onSubmit: async (result) => {
            updateProjectAction.mutate({
                ...result,
                project_id: params.id
            });
        }
    });

    useLayoutEffect(() => {
        readProjectAction.mutate({project_id: params.id});
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readProjectAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={950}
                        />
                    )
                }

                {
                    !readProjectAction.isPending && (
                        <FormData
                            readProjectAction={readProjectAction}
                            updateProjectForm={updateProjectForm}
                            updateProjectAction={updateProjectAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
