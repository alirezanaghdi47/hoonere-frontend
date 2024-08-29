// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {
    readProjectContractForInsertionService,
    readProjectContractInsertionService,
    updateProjectContractInsertionService,
    IReadProjectContractForInsertion,
    IReadProjectContractInsertion,
    IUpdateProjectContractInsertion
} from "@/services/projectContractService.ts";
import {
    readAllProjectContractInsertionArticleService,
    readAllProjectContractInsertionSectionService
} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {getObjectValueByKey} from "@/utils/functions.ts";

const updateProjectContractInsertionSchema = Yup.object().shape({
    articles: Yup.array(),
    sections: Yup.array(),
});

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readAllProjectContractInsertionArticleAction = useMutation({
        mutationFn: () => readAllProjectContractInsertionArticleService(),
    });

    const readAllProjectContractInsertionSectionAction = useMutation({
        mutationFn: () => readAllProjectContractInsertionSectionService(),
    });

    const readProjectContractInsertionAction = useMutation({
        mutationFn: (data: IReadProjectContractInsertion) => readProjectContractInsertionService(data),
    });

    const readProjectContractForInsertionAction = useMutation({
        mutationFn: (data: IReadProjectContractForInsertion) => readProjectContractForInsertionService(data),
    });

    const updateProjectContractInsertionAction = useMutation({
        mutationFn: (data: IUpdateProjectContractInsertion) => updateProjectContractInsertionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts/" + params.subId + "/insertions");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProjectContractInsertionForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            articles: readProjectContractInsertionAction.data?.data?.insertion_info?.articles ? readProjectContractInsertionAction.data?.data?.insertion_info?.articles.map(article => {
                if (article.number === 1) {
                    return ({
                        ...article,
                        is_added: "0",
                        contractors: readProjectContractForInsertionAction.data?.data?.contract_info?.type_id === "1" ? readProjectContractForInsertionAction.data?.data?.contract_info?.members.filter(member => member.side_id === "2") : readProjectContractForInsertionAction.data?.data?.contract_info?.informal_members.filter(member => member.side_id === "2"),
                        employers: readProjectContractForInsertionAction.data?.data?.contract_info?.type_id === "1" ? readProjectContractForInsertionAction.data?.data?.contract_info?.members.filter(member => member.side_id === "1") : readProjectContractForInsertionAction.data?.data?.contract_info?.informal_members.filter(member => member.side_id === "1")
                    });
                } else if (article.number === 2) {
                    return ({
                        ...article,
                        is_added: "0",
                        start_date: readProjectContractInsertionAction.data?.data?.insertion_info?.start_date,
                        end_date: readProjectContractInsertionAction.data?.data?.insertion_info?.end_date
                    });
                } else if (article.number === 3) {
                    return ({
                        ...article,
                        is_added: "0",
                        total_price: readProjectContractInsertionAction.data?.data?.insertion_info?.total_price,
                    });
                } else if (article.number === 4) {
                    return ({
                        ...article,
                        is_added: "0",
                        payment_state: readProjectContractInsertionAction.data?.data?.insertion_info?.payment_state,
                        payments: readProjectContractInsertionAction.data?.data?.insertion_info?.payments.map(payment => ({
                            date: payment.date,
                            percent: Number(payment.percent)
                        })),
                    });
                } else {
                    return ({
                        ...article,
                        is_added: "1"
                    });
                }
            }) : [],
            sections: readProjectContractInsertionAction.data?.data?.insertion_info?.articles ? readProjectContractInsertionAction.data?.data?.insertion_info?.articles.flatMap(article => article.sections) : [],
        },
        validationSchema: updateProjectContractInsertionSchema,
        onSubmit: async (result) => {
            const totalPercent = getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "payments").reduce((acc, value) => {
                return acc += value.percent;
            }, 0);

            if (getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "payment_state") === "1" && totalPercent < 100) return Toast("error", "مجموع درصد فازبندی قرار داد کمتر از 100 است.");

            updateProjectContractInsertionAction.mutate({
                ...result,
                project_id: params.id,
                contract_id: params.subId,
                insertion_id: params.subSubId,
                employers: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "employers")?.map(item => item.id.toString()),
                contractors: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "contractors")?.map(item => item.id.toString()),
                start_date: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "start_date"),
                end_date: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "end_date"),
                total_price: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "total_price"),
                payment_state: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "payment_state"),
                payments: getObjectValueByKey(updateProjectContractInsertionForm.values.articles, "payments")
            });
        }
    });

    useLayoutEffect(() => {
        readAllProjectContractInsertionArticleAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllProjectContractInsertionSectionAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readProjectContractForInsertionAction.mutate({
            project_id: params.id,
            contract_id: params.subId,
        });
    }, []);

    useLayoutEffect(() => {
        readProjectContractInsertionAction.mutate({
            project_id: params.id,
            contract_id: params.subId,
            insertion_id: params.subSubId,
            get_last: 1,
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readProjectContractInsertionAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={1200}
                        />
                    )
                }

                {
                    !readProjectContractInsertionAction.isPending && (
                        <FormData
                            updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                            updateProjectContractInsertionAction={updateProjectContractInsertionAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
