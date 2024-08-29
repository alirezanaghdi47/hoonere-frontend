// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/screen-plays/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {readProjectScreenPlayService, updateProjectScreenPlayService , IReadProjectScreenPlay, IUpdateProjectScreenPlay} from "@/services/projectScreenPlayService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const updateProjectScreenPlaySchema = Yup.object().shape({
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

    const readProjectScreenPlayAction = useMutation({
        mutationFn: (data: IReadProjectScreenPlay) => readProjectScreenPlayService(data),
    });

    const updateProjectScreenPlayAction = useMutation({
        mutationFn: (data: IUpdateProjectScreenPlay) => updateProjectScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/screen-plays");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProjectScreenPlayForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            description: readProjectScreenPlayAction.data?.data?.screenplay_info?.description ? readProjectScreenPlayAction.data?.data?.screenplay_info.description : "",
            address: readProjectScreenPlayAction.data?.data?.screenplay_info?.address ? readProjectScreenPlayAction.data?.data?.screenplay_info.address : "",
            time_type_id: readProjectScreenPlayAction.data?.data?.screenplay_info?.time_type_id ? readProjectScreenPlayAction.data?.data?.screenplay_info.time_type_id : "",
            location_side_id: readProjectScreenPlayAction.data?.data?.screenplay_info?.location_side_id ? readProjectScreenPlayAction.data?.data?.screenplay_info.location_side_id : "",
            part: readProjectScreenPlayAction.data?.data?.screenplay_info?.part ? readProjectScreenPlayAction.data?.data?.screenplay_info.part : "",
            sequence: readProjectScreenPlayAction.data?.data?.screenplay_info?.sequence ? readProjectScreenPlayAction.data?.data?.screenplay_info.sequence : "",
            fields: readProjectScreenPlayAction.data?.data?.screenplay_info?.fields ? readProjectScreenPlayAction.data?.data?.screenplay_info.fields : []
        },
        validationSchema: updateProjectScreenPlaySchema,
        onSubmit: async (result) => {
            updateProjectScreenPlayAction.mutate({
                ...result,
                project_id: params.id,
                screenplay_id: params.subId,
            });
        }
    });

    useLayoutEffect(() => {
        readProjectScreenPlayAction.mutate({
            project_id: params.id,
            screenplay_id: params.subId
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readProjectScreenPlayAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={850}
                        />
                    )
                }

                {
                    !readProjectScreenPlayAction.isPending && (
                        <FormData
                            updateProjectScreenPlayForm={updateProjectScreenPlayForm}
                            updateProjectScreenPlayAction={updateProjectScreenPlayAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
