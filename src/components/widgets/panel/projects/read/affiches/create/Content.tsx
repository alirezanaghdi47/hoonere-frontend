// libraries
import {useNavigate, useParams} from "react-router-dom";
import Loadable from '@loadable/component';
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import Navigation from "@/components/widgets/panel/projects/read/affiches/create/Navigation.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";

// services
import {createProjectAfficheService} from "@/services/projectAffichesService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {ICreateProjectScreenPlay} from "@/types/serviceType.ts";

// utils
import {
    createProjectAfficheP1Schema,
    createProjectAfficheP2Schema,
    createProjectAfficheP3Schema
} from "@/utils/validations.ts";
import {
    convertGregorianToJalali,
    convertJalaliToGregorian,
    generateTimeWithSecond,
    toEnglishDigits
} from "@/utils/functions.ts";

// lazy components
const FormDataP1 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP1.tsx'));
const FormDataP2 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP2.tsx'));
const FormDataP3 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/create/FormDataP3.tsx'));

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();
    const {step, changeStep, nextStep, prevStep, currentStep, resetStep} = useStep(null, 1);

    const createProjectAfficheAction = useMutation({
        mutationFn: (data: ICreateProjectScreenPlay) => createProjectAfficheService(data),
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
            type: "",
            is_off: 0,
            affiche_date: convertGregorianToJalali(new Date()),
            start_date: "",
            coming_time: "",
            start_time: "",
            address: "",
            lat: "",
            lon: "",
            auto_motivation_sentence: 1,
            motivation_sentence: "",
        },
        validationSchema: createProjectAfficheP1Schema,
        onSubmit: async (result) => {
            changeStep({
                ...result,
                affiche_date: convertJalaliToGregorian(toEnglishDigits(result.affiche_date)),
                start_date: convertJalaliToGregorian(toEnglishDigits(result.start_date)),
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
                    currentStep === 3 && (
                        <FormDataP3
                            createProjectAfficheP3Form={createProjectAfficheP3Form}
                            prevStep={prevStep}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default Content;
