// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loadable from '@loadable/component';
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
const FormDataP1 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP1.tsx'));
const FormDataP2 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP2.tsx'));
const FormDataP3 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP3.tsx'));

import Navigation from "@/components/widgets/panel/projects/read/affiches/create/Navigation.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";
import useFilter from "@/hooks/useFilter.tsx";

// services
import {createProjectAfficheService,} from "@/services/projectAffichesService.ts";
import {readAllProjectScreenPlayService} from "@/services/projectScreenPlayService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {ICreateProjectAffiche, IReadAllProjectScreenPlay} from "@/types/serviceType.ts";

// utils
import {
    createProjectAfficheP1Schema,
    createProjectAfficheP2Schema,
    createProjectAfficheP3Schema
} from "@/utils/validations.ts";
import {convertJalaliToGregorian, generateTimeWithSecond} from "@/utils/functions.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();
    const {step, changeStep, nextStep, prevStep, currentStep, resetStep} = useStep<ICreateProjectAffiche>(null, 1);

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
        mutationFn: (data: IReadAllProjectScreenPlay) => readAllProjectScreenPlayService({
            ...data,
            project_id: params.id,
        }),
    });

    const createProjectAfficheAction = useMutation({
        mutationFn: (data: ICreateProjectAffiche) => createProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                resetStep();

                navigate(auth.panel_url + "projects/" + params.id + "/affiches");
            } else {
                toast("error", data.message);
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
            affiche_date: new Date(),
            start_date: "",
            coming_time: "",
            start_time: "",
            addresses: [],
            auto_motivation_sentence: 1,
            motivation_sentence: "",
        },
        validationSchema: createProjectAfficheP1Schema,
        onSubmit: async (result) => {
            changeStep({
                ...result,
                affiche_date: convertJalaliToGregorian(result.affiche_date),
                start_date: convertJalaliToGregorian(result.start_date),
                coming_time: generateTimeWithSecond(result.coming_time),
                start_time: generateTimeWithSecond(result.coming_time),
            });

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
        readAllProjectScreenPlayAction.mutate(filter);
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
                            width="100%"
                            height={300}
                        />
                    )
                }

                {
                    !readAllProjectScreenPlayAction.isPending && currentStep === 3 && (
                        <FormDataP3
                            createProjectAfficheP3Form={createProjectAfficheP3Form}
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
