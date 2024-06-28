// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/screen-plays/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// services
import {readProjectScreenPlayService, updateProjectScreenPlayService} from "@/services/projectScreenPlayService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IReadProjectScreenPlay, IUpdateProjectScreenPlay} from "@/types/serviceType.ts";

// utils
import {updateProjectScreenPlaySchema} from "@/utils/validations.ts";
import {toEnglishDigits} from "@/utils/functions.ts";

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
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/screen-plays");
            } else {
                toast("error", data.message);
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
                part: toEnglishDigits(result.part),
                sequence: toEnglishDigits(result.sequence),
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
