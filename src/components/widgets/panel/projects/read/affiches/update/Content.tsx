// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loadable from '@loadable/component';
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
const FormDataP2 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/update/FormDataP2.tsx'));
const FormDataP3 = Loadable(() => import('@/components/widgets/panel/projects/read/affiches/update/FormDataP3.tsx'));

import Navigation from "@/components/widgets/panel/projects/read/affiches/update/Navigation.tsx";
import FormDataP1 from "@/components/widgets/panel/projects/read/affiches/update/FormDataP1.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useStep from "@/hooks/useStep.tsx";
import useFilter from "@/hooks/useFilter.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {
    readAllProjectAfficheActorService,
    readAllProjectAfficheAddressService,
    readAllProjectAfficheMemberService,
    readAllProjectAfficheReceptionService,
    readAllProjectAfficheScreenPlayService,
    readProjectAfficheService,
    updateProjectAfficheService,
    IUpdateProjectAffiche,
    IReadAllProjectAfficheActor,
    IReadAllProjectAfficheMember,
    IReadAllProjectAfficheReception,
    IReadAllProjectAfficheScreenPlay,
    IReadProjectAffiche,
    IReadAllProjectAfficheAddress,
} from "@/services/projectAfficheService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const updateProjectAfficheP1Schema = Yup.object().shape({
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

const updateProjectAfficheP2Schema = Yup.object().shape({
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

const updateProjectAfficheP3Schema = Yup.object().shape({
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
    } = useFilter<IReadAllProjectAfficheScreenPlay>({
        text: "",
        part: "",
        sequence: "",
        page: 1,
        per_page: 12,
    });

    const readProjectAfficheAction = useMutation({
        mutationFn: (data: IReadProjectAffiche) => readProjectAfficheService(data),
    });

    const readAllProjectAfficheActorAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheActor) => readAllProjectAfficheActorService(data),
    });

    const readAllProjectAfficheAddressAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheAddress) => readAllProjectAfficheAddressService(data),
    });

    const readAllProjectAfficheMemberAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheMember) => readAllProjectAfficheMemberService(data),
    });

    const readAllProjectAfficheReceptionAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheReception) => readAllProjectAfficheReceptionService(data),
    });

    const readAllProjectScreenPlayAction = useMutation({
        mutationFn: (data: IReadAllProjectAfficheScreenPlay) => readAllProjectAfficheScreenPlayService(data),
    });

    const updateProjectAfficheAction = useMutation({
        mutationFn: (data: IUpdateProjectAffiche) => updateProjectAfficheService(data),
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

    const updateProjectAfficheP1Form = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: readProjectAfficheAction.data?.data?.affiche_info?.title ? readProjectAfficheAction.data?.data?.affiche_info.title : "",
            description: readProjectAfficheAction.data?.data?.affiche_info?.description ? readProjectAfficheAction.data?.data?.affiche_info.description : "",
            time_type_id: readProjectAfficheAction.data?.data?.affiche_info?.time_type_id ? readProjectAfficheAction.data?.data?.affiche_info.time_type_id : "",
            location_side_id: readProjectAfficheAction.data?.data?.affiche_info?.location_side_id ? readProjectAfficheAction.data?.data?.affiche_info.location_side_id : "",
            type: readProjectAfficheAction.data?.data?.affiche_info?.type ? readProjectAfficheAction.data?.data?.affiche_info.type : "",
            is_off: readProjectAfficheAction.data?.data?.affiche_info?.is_off ? parseInt(readProjectAfficheAction.data?.data?.affiche_info.is_off) : 0,
            affiche_date: readProjectAfficheAction.data?.data?.affiche_info?.affiche_date ? readProjectAfficheAction.data?.data?.affiche_info.affiche_date : "",
            start_date: readProjectAfficheAction.data?.data?.affiche_info?.start_date ? readProjectAfficheAction.data?.data?.affiche_info.start_date : "",
            coming_time: readProjectAfficheAction.data?.data?.affiche_info?.coming_time ? readProjectAfficheAction.data?.data?.affiche_info.coming_time : "",
            start_time: readProjectAfficheAction.data?.data?.affiche_info?.start_time ? readProjectAfficheAction.data?.data?.affiche_info.start_time : "",
            addresses: readAllProjectAfficheAddressAction.data?.data?.addresses.length > 0 ? readAllProjectAfficheAddressAction.data?.data?.addresses.map(address => ({
                address: address?.address,
                lat: address?.lat,
                lon: address?.lon,
            })) : [],
            auto_motivation_sentence: readProjectAfficheAction.data?.data?.affiche_info?.auto_motivation_sentence ? parseInt(readProjectAfficheAction.data?.data?.affiche_info.auto_motivation_sentence) : 1,
            motivation_sentence: readProjectAfficheAction.data?.data?.affiche_info?.motivation_sentence ? readProjectAfficheAction.data?.data?.affiche_info.motivation_sentence : "",
        },
        validationSchema: updateProjectAfficheP1Schema,
        onSubmit: async (result) => {
            changeStep(result);

            nextStep();
        }
    });

    const updateProjectAfficheP2Form = useFormik({
        enableReinitialize: true,
        initialValues: {
            actors: readAllProjectAfficheActorAction.data?.data?.actors.length > 0 ? readAllProjectAfficheActorAction.data?.data?.actors.map(actor => ({
                actor_id: actor.info?.actor_id,
                coming_time: actor.info?.coming_time,
                full_name: actor.info?.is_fake === "0" ? actor.info?.user_type ? actor.info?.user_type === "1" ? actor.info?.first_name + " " + actor.info?.last_name : actor.info?.company_name : actor.info?.company_name ? actor.info?.company_name : actor.info?.first_name + " " + actor.info?.last_name : actor.info?.first_name + " " + actor.info?.last_name,
                is_fake: actor.info?.is_fake,
                makeup_time: actor.info?.makeup_time,
                role: actor.info?.role
            })) : [],
            members: readAllProjectAfficheMemberAction.data?.data?.members.length > 0 ? readAllProjectAfficheMemberAction.data?.data?.members.map(member => ({
                member_id: member.info?.member_id,
                coming_time: member.info?.coming_time,
                description: member.info?.description,
                foa_child_id: member?.foa_child_id,
                foa_id: member?.foa_id,
                full_name: member.info?.is_fake === "0" ? member.info?.user_type ? member.info?.user_type === "1" ? member.info?.first_name + " " + member.info?.last_name : member.info?.company_name : member.info?.company_name ? member.info?.company_name : member.info?.first_name + " " + member.info?.last_name : member.info?.first_name + " " + member.info?.last_name,
                is_fake: member.info?.is_fake
            })) : [],
            receptions: readAllProjectAfficheReceptionAction.data?.data?.receptions.length > 0 ? readAllProjectAfficheReceptionAction.data?.data?.receptions.map(reception => ({
                member_id: reception.info?.member_id,
                reception_type: reception.info?.reception_type,
                reception_name: reception.info?.reception_name,
                foa_child_id: reception?.foa_child_id,
                foa_id: reception?.foa_id,
                full_name: reception.info?.is_fake === "0" ? reception.info?.user_type ? reception.info?.user_type === "1" ? reception.info?.first_name + " " + reception.info?.last_name : reception.info?.company_name : reception.info?.company_name ? reception.info?.company_name : reception.info?.first_name + " " + reception.info?.last_name : reception.info?.first_name + " " + reception.info?.last_name,
                is_fake: reception.info?.is_fake
            })) : [],
        },
        validationSchema: updateProjectAfficheP2Schema,
        onSubmit: async (result) => {
            changeStep({
                ...step,
                ...result
            });

            nextStep();
        }
    });

    const updateProjectAfficheP3Form = useFormik({
        enableReinitialize: true,
        initialValues: {
            screenplays: readAllProjectScreenPlayAction.data?.data?.selected_screenplays.length > 0 ? readAllProjectScreenPlayAction.data?.data?.selected_screenplays : []
        },
        validationSchema: updateProjectAfficheP3Schema,
        onSubmit: async (result) => {
            updateProjectAfficheAction.mutate({
                ...step,
                ...result,
                project_id: params.id,
                affiche_id: params.subId
            });
        }
    });

    useLayoutEffect(() => {
        readProjectAfficheAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheAddressAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheActorAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheMemberAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectAfficheReceptionAction.mutate({
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    useLayoutEffect(() => {
        readAllProjectScreenPlayAction.mutate({
            ...filter,
            project_id: params.id,
            affiche_id: params.subId,
            get_last: 1,
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                <Navigation currentStep={currentStep}/>

                {
                    readProjectAfficheAction.isPending && currentStep === 1 && (
                        <Loading
                            withCard
                            width="100%"
                            height={900}
                        />
                    )
                }

                {
                    !readProjectAfficheAction.isPending && currentStep === 1 && (
                        <FormDataP1
                            updateProjectAfficheP1Form={updateProjectAfficheP1Form}
                        />
                    )
                }

                {
                    !readAllProjectAfficheActorAction.isPending && !readAllProjectAfficheMemberAction.isPending && !readAllProjectAfficheReceptionAction.isPending && currentStep === 2 && (
                        <FormDataP2
                            updateProjectAfficheP2Form={updateProjectAfficheP2Form}
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
                            readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                            updateProjectAfficheAction={updateProjectAfficheAction}
                            updateProjectAfficheP3Form={updateProjectAfficheP3Form}
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
