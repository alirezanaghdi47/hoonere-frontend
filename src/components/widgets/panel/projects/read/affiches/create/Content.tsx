// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loadable from '@loadable/component';
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
const FormDataP2 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP2.tsx'));
const FormDataP3 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP3.tsx'));

import Navigation from "@/components/widgets/panel/projects/read/affiches/create/Navigation.tsx";
import FormDataP1 from "@/components/widgets/panel/projects/read/affiches/create/FormDataP1.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";
import useFilter from "@/hooks/useFilter.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {createProjectAfficheService , ICreateProjectAffiche} from "@/services/projectAfficheService.ts";
import {readAllProjectScreenPlayService , IReadAllProjectScreenPlay} from "@/services/projectScreenPlayService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const createProjectAfficheP1Schema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان آفیش الزامی است"),
    description: Yup.string().trim().required("توضیحات آفیش الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا آفیش الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان آفیش الزامی است"),
    is_off: Yup.number(),
    type: Yup.string().trim().required("نوع فنی آفیش الزامی است"),
    affiche_date: Yup.string().trim().required("تاریخ آفیش الزامی است"),
    start_date: Yup.string().trim().required("تاریخ اجرای آفیش الزامی است"),
    coming_time: Yup.string().trim().required("ساعت حضور آفیش الزامی است"),
    start_time: Yup.string().trim().required("ساعت کلید آفیش الزامی است"),
    addresses: Yup.array().of(Yup.object().shape({
        address: Yup.string().trim(),
        lat: Yup.number(),
        lon: Yup.number(),
    })).min(1, "آدرس آفیش الزامی است"),
    auto_motivation_sentence: Yup.number(),
    motivation_sentence: Yup.string().when("auto_motivation_sentence", {
        is: (value) => value === 0,
        then: (schema) => schema.trim().required("جمله انگیزشی آفیش الزامی است")
    }),
});

const createProjectAfficheP2Schema = Yup.object().shape({
    actors: Yup.array().of(Yup.object().shape({
        actor_id: Yup.string().trim().required("بازیگر الزامی است"),
        full_name: Yup.string(),
        role: Yup.string().trim().required("نقش بازیگر الزامی است"),
        coming_time: Yup.string().trim().required("ساعت حضور بازیگر الزامی است"),
        makeup_time: Yup.string().trim().required("ساعت گریم بازیگر الزامی است"),
    })),
    members: Yup.array().of(Yup.object().shape({
        member_id: Yup.string().trim().required("عوامل الزامی است"),
        full_name: Yup.string(),
        coming_time: Yup.string().trim().required("ساعت حضور عوامل الزامی است"),
        description: Yup.string().trim(),
    })),
    receptions: Yup.array().of(Yup.object().shape({
        member_id: Yup.string().trim().required("عوامل پذیرایی الزامی است"),
        full_name: Yup.string().trim(),
        reception_type: Yup.string().trim().required("نوع پذیرایی الزامی است"),
    })),
});

const createProjectAfficheP3Schema = Yup.object().shape({
    screenplays: Yup.array().of(Yup.string().trim())
});

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();
    const {step, changeStep, nextStep, prevStep, currentStep, resetStep} = useStep<any>(null, 1);

    const {
        filter,
        initialFilter,
        isOpenFilter,
        showFilter,
        hideFilter,
        resetFilter,
        changeFilter
    } = useFilter<IReadAllProjectScreenPlay>({
        text: "",
        part: "",
        sequence: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectScreenPlayAction = useMutation({
        mutationFn: (data: IReadAllProjectScreenPlay) => readAllProjectScreenPlayService(data),
    });

    const createProjectAfficheAction = useMutation({
        mutationFn: (data: ICreateProjectAffiche) => createProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                resetStep();

                navigate(auth.panel_url + "projects/" + params.id + "/affiches");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const createProjectAfficheP1Form = useFormik({
        initialValues: {
            title: "",
            description: "",
            time_type_id: "",
            location_side_id: "",
            type: "",
            is_off: 0,
            affiche_date: format(Date.now() , "yyyy-MM-dd"),
            start_date: "",
            coming_time: "",
            start_time: "",
            addresses: [],
            auto_motivation_sentence: 1,
            motivation_sentence: "",
        },
        validationSchema: createProjectAfficheP1Schema,
        onSubmit: async (result) => {
            changeStep(result);

            nextStep();
        }
    });

    const createProjectAfficheP2Form = useFormik({
        initialValues: {
            actors: [],
            members: [],
            receptions: []
        },
        validationSchema: createProjectAfficheP2Schema,
        onSubmit: async (result) => {
            changeStep({
                ...step,
                ...result
            });

            nextStep();
        }
    });

    const createProjectAfficheP3Form = useFormik({
        initialValues: {
            screenplays: []
        },
        validationSchema: createProjectAfficheP3Schema,
        onSubmit: async (result) => {
            createProjectAfficheAction.mutate({
                ...step,
                ...result,
                project_id: params.id
            });
        }
    });

    useLayoutEffect(() => {
        readAllProjectScreenPlayAction.mutate({
            ...filter,
            project_id: params.id,
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                <Navigation currentStep={currentStep}/>

                {
                    currentStep === 1 && (
                        <FormDataP1
                            createProjectAfficheP1Form={createProjectAfficheP1Form}
                        />
                    )
                }

                {
                    currentStep === 2 && (
                        <FormDataP2
                            createProjectAfficheP2Form={createProjectAfficheP2Form}
                            prevStep={prevStep}
                        />
                    )
                }

                {
                    readAllProjectScreenPlayAction.isPending && currentStep === 3 && (
                        <Loading
                            withCard
                            width="100%"
                            height={300}
                        />
                    )
                }

                {
                    !readAllProjectScreenPlayAction.isPending && currentStep === 3 && (
                        <FormDataP3
                            createProjectAfficheP3Form={createProjectAfficheP3Form}
                            createProjectAfficheAction={createProjectAfficheAction}
                            readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                            prevStep={prevStep}
                            filter={filter}
                            initialFilter={initialFilter}
                            changeFilter={changeFilter}
                            isOpenFilter={isOpenFilter}
                            showFilter={showFilter}
                            hideFilter={hideFilter}
                            resetFilter={resetFilter}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default Content;
