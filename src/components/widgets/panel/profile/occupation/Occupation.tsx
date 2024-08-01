// libraries
import {useEffect, useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import Loadable from "@loadable/component";
import {useFormik} from "formik";

// components
const CreateJobFormData = Loadable(() => import("@/components/widgets/panel/profile/occupation/CreateJobFormData.tsx"));

import FormData from "@/components/widgets/panel/profile/occupation/ResumeFormData.tsx";
import Jobs from "@/components/widgets/panel/profile/occupation/Jobs.tsx";

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

    useEffect(() => {
        // @ts-ignore
        if (updateOccupationForm.errors.fields_of_activity) toast("error", updateOccupationForm.errors.fields_of_activity);
    }, [updateOccupationForm.errors.fields_of_activity, updateOccupationForm.touched.fields_of_activity]);

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    return (
        <>
            {
                currentPart === "read" && (
                    <Jobs
                        changeCurrentPart={changeCurrentPart}
                        readAllJobAction={readAllJobAction}
                        updateOccupationForm={updateOccupationForm}
                    />
                )
            }

            {
                currentPart === "create" && (
                    <CreateJobFormData
                        resetPart={resetPart}
                        updateOccupationForm={updateOccupationForm}
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