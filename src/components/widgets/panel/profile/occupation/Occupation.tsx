// libraries
import {useEffect, useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/profile/occupation/ResumeFormData.tsx";
import CreateJobFormData from "@/components/widgets/panel/profile/occupation/CreateJobFormData.tsx";
import Jobs from "@/components/widgets/panel/profile/occupation/Jobs.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// services
import {updateOccupationService} from "@/services/profileService.ts";
import {readAllJobService} from "@/services/publicService.ts";

// types
import {IUpdateOccupation} from "@/types/serviceType.ts";

// utils
import {occupationSchema} from "@/utils/validations.ts";

const Occupation = ({readMyProfileAction, readAllMyJobAction}) => {
    const {currentPart, resetPart, changeCurrentPart} = usePart(null , "read");

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const updateOccupationAction = useMutation({
        mutationFn: (data: IUpdateOccupation) => updateOccupationService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateOccupationForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            fields_of_activity: readAllMyJobAction.data?.data?.fieldsOfActivity ? readAllMyJobAction.data?.data.fieldsOfActivity : [],
            resume_file: {},
            resume_text: readMyProfileAction.data?.data?.user_info?.resume_text ? readMyProfileAction.data?.data?.user_info.resume_text : "",
        },
        validationSchema: occupationSchema,
        onSubmit: async (result) => {
            updateOccupationAction.mutate(result);
        },
    });

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (updateOccupationForm.errors.fields_of_activity) toast("error", updateOccupationForm.errors.fields_of_activity);
    }, [updateOccupationForm.errors.fields_of_activity, updateOccupationForm.touched.fields_of_activity]);

    return (
        <>
            {
                readAllJobAction.isPending && (
                    <Loading
                        width="100%"
                        height={200}
                    />
                )
            }

            {
                !readAllJobAction.isPending && readAllMyJobAction.data && currentPart === "read" && (
                    <Jobs
                        readAllJobAction={readAllJobAction}
                        updateOccupationForm={updateOccupationForm}
                        changeCurrentPart={changeCurrentPart}
                    />
                )
            }

            {
                !readAllJobAction.isPending && readAllMyJobAction.data && currentPart === "create" && (
                    <CreateJobFormData
                        readAllJobAction={readAllJobAction}
                        updateOccupationForm={updateOccupationForm}
                        resetPart={resetPart}
                    />
                )
            }

            <FormData
                readMyProfileAction={readMyProfileAction}
                updateOccupationForm={updateOccupationForm}
                updateOccupationAction={updateOccupationAction}
            />
        </>
    )
}

export default Occupation;