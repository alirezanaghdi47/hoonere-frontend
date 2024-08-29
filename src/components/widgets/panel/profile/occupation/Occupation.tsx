// libraries
import {useEffect, useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

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
import {readAllMyJobService, updateOccupationService , IUpdateOccupation} from "@/services/profileService.ts";
import {readAllJobService} from "@/services/publicService.ts";

const occupationSchema = Yup.object().shape({
    fields_of_activity: Yup.array().of(Yup.object().shape({
        foa_parent_id: Yup.number(),
        foa_child_id: Yup.number(),
    })).min(1, "حداقل یک زمینه شغلی باید انتخاب شود"),
    resume_file: Yup.mixed().nullable().test("fileSize", "حجم تصویر حداکثر 2 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 2 * 1_024_000;
        }
    }).test("fileType", "فرمت تصویر یا فایل ارسالی باید از نوع (png , jpg , jpeg) و یا pdf باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].includes(value.type);
        }
    }),
    resume_text: Yup.string().trim().required("رزومه متنی الزامی است")
});

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