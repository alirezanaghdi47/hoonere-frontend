// libraries
import {useEffect, useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import Resume from "@/components/widgets/panel/profile/occupation/Resume.tsx";
import CreateJob from "@/components/widgets/panel/profile/occupation/CreateJob.tsx";
import Jobs from "@/components/widgets/panel/profile/occupation/Jobs.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import toast from "@/modules/Toast.tsx";

// services
import {myJobsService, updateOccupationService} from "@/services/profileService.ts";
import {allJobService} from "@/services/publicService.ts";

// utils
import {occupationSchema} from "@/utils/validations.ts";

const Occupation = ({myProfileAction}) => {
    const {currentPart, resetPart, changeCurrentPart} = usePart();

    const allJobAction = useMutation({
        mutationFn: () => allJobService(),
    });

    const myJobsAction = useMutation({
        mutationFn: () => myJobsService(),
    });

    const updateOccupationAction = useMutation({
        mutationFn: (data) => updateOccupationService(data),
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
            fields_of_activity: myJobsAction?.data?.data?.fieldsOfActivity ? myJobsAction?.data?.data?.fieldsOfActivity : [],
            resume_file: {},
            resume_text: myProfileAction?.data?.data?.userInfo?.resume_text ? myProfileAction?.data?.data?.userInfo?.resume_text : "",
        },
        validationSchema: occupationSchema,
        onSubmit: async (result) => {
            updateOccupationAction.mutate(result);
        },
    });

    useLayoutEffect(() => {
        allJobAction.mutate();
        myJobsAction.mutate();
    }, []);

    useEffect(() => {
        if (updateOccupationForm.errors.fields_of_activity) toast("error", updateOccupationForm.errors.fields_of_activity);
    }, [updateOccupationForm.errors.fields_of_activity, updateOccupationForm.touched.fields_of_activity]);

    return (
        <>
            {
                !myJobsAction.isPending ? (
                    <>
                        {
                            !currentPart && (
                                <Jobs
                                    allJobAction={allJobAction}
                                    updateOccupationForm={updateOccupationForm}
                                    changeCurrentPart={changeCurrentPart}
                                />
                            )
                        }

                        {
                            currentPart === "add" && (
                                <CreateJob
                                    allJobAction={allJobAction}
                                    updateOccupationForm={updateOccupationForm}
                                    resetPart={resetPart}
                                />
                            )
                        }
                    </>
                ) : (
                    <Loading
                        width="100%"
                        height={300}
                    />
                )
            }

            {
                !myProfileAction.isPending ? (
                    <Resume
                        myProfileAction={myProfileAction}
                        updateOccupationForm={updateOccupationForm}
                        updateOccupationAction={updateOccupationAction}
                    />
                ) : (
                    <Loading
                        width="100%"
                        height={420}
                    />
                )
            }
        </>
    )
}

export default Occupation;