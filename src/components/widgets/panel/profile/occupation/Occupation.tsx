// libraries
import {useEffect, useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import CreateJobFormData from "@/components/widgets/panel/profile/occupation/CreateJobFormData.tsx";
import FormData from "@/components/widgets/panel/profile/occupation/ResumeFormData.tsx";
import Jobs from "@/components/widgets/panel/profile/occupation/Jobs.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Toast from "@/modules/Toast";

// services
import {readAllMyJobService, updateOccupationService} from "@/services/profileService.ts";
import {readAllJobService} from "@/services/publicService.ts";

// types
import {IUpdateOccupation} from "@/types/serviceType.ts";

// utils
import {occupationSchema} from "@/utils/validations.ts";

const Occupation = ({readMyProfileAction}) => {
    const {currentPart, resetPart, changeCurrentPart} = usePart(null , "read");

    const readAllMyJobAction = useMutation({
        mutationFn: () => readAllMyJobService(),
    });

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const updateOccupationAction = useMutation({
        mutationFn: (data: IUpdateOccupation) => updateOccupationService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                Toast("error", data.message);
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
        if (updateOccupationForm.errors.fields_of_activity) Toast("error", updateOccupationForm.errors.fields_of_activity);
    }, [updateOccupationForm.errors.fields_of_activity, updateOccupationForm.touched.fields_of_activity]);

    useLayoutEffect(() => {
        readAllJobAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllMyJobAction.mutate();
    }, []);

    return (
        <>
            {
                readAllMyJobAction.isPending && (
                    <Loading
                        withCard
                        width="100%"
                        height={200}
                    />
                )
            }

            {
                !readAllMyJobAction.isPending && currentPart === "read" && (
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