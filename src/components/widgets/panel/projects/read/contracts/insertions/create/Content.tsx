// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {
    createProjectContractInsertionService,
    readProjectContractForInsertionService,
    ICreateProjectContractInsertion,
    IReadProjectContractForInsertion
} from "@/services/projectContractService.ts";
import {
    readAllProjectContractInsertionArticleService,
    readAllProjectContractInsertionSectionService
} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {getObjectValueByKey} from "@/utils/functions.ts";

const createProjectContractInsertionSchema = Yup.object().shape({
    articles: Yup.array(),
    sections: Yup.array(),
});

const Content = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readAllProjectContractInsertionArticleAction = useMutation({
        mutationFn: () => readAllProjectContractInsertionArticleService(),
    });

    const readAllProjectContractInsertionSectionAction = useMutation({
        mutationFn: () => readAllProjectContractInsertionSectionService(),
    });

    const readProjectContractForInsertionAction = useMutation({
        mutationFn: (data: IReadProjectContractForInsertion) => readProjectContractForInsertionService(data),
    });

    const createProjectContractInsertionAction = useMutation({
        mutationFn: (data: ICreateProjectContractInsertion) => createProjectContractInsertionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts/" + params.subId + "/insertions");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const createProjectContractInsertionForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            articles: readAllProjectContractInsertionArticleAction.data?.data?.insertion_default_articles ? readAllProjectContractInsertionArticleAction.data?.data?.insertion_default_articles.map(article => {
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
                        start_date: readProjectContractForInsertionAction.data?.data?.contract_info?.start_date,
                        end_date: readProjectContractForInsertionAction.data?.data?.contract_info?.end_date
                    });
                } else if (article.number === 3) {
                    return ({
                        ...article,
                        is_added: "0",
                        total_price: readProjectContractForInsertionAction.data?.data?.contract_info?.total_price,
                    });
                } else if (article.number === 4) {
                    return ({
                        ...article,
                        is_added: "0",
                        payment_state: readProjectContractForInsertionAction.data?.data?.contract_info?.payment_state,
                        payments: readProjectContractForInsertionAction.data?.data?.contract_info?.payments.map(payment => ({
                            date: payment.date,
                            percent: Number(payment.percent)
                        })),
                    });
                } else {
                    return ({
                        ...article,
                        is_added: "0"
                    });
                }
            }) : [],
            sections: readAllProjectContractInsertionSectionAction.data?.data?.insertion_ready_sections ? readAllProjectContractInsertionSectionAction.data?.data?.insertion_ready_sections.map(section => {
                if (
                    (section.number === 1 && section.article_number === 1) ||
                    (section.number === 2 && section.article_number === 1) ||
                    (section.number === 1 && section.article_number === 2) ||
                    (section.number === 1 && section.article_number === 3) ||
                    (section.number === 1 && section.article_number === 4)
                ) {
                    return ({
                        ...section,
                        isAdded: false,
                        isStatic: true
                    });
                } else {
                    return ({
                        ...section,
                        isAdded: false,
                        isStatic: false
                    });
                }
            }) : [],
        },
        validationSchema: createProjectContractInsertionSchema,
        onSubmit: async (result) => {
            const articleNumbers = Array(result.articles.length).fill(null).map((_, index) => index + 1);
            const sectionArticleNumbers = [...new Set(result.sections.map(section => section.article_number))];

            if (!articleNumbers.every(item => sectionArticleNumbers.includes(item))) {
                return Toast("error", "همه ی ماده ها حداقل باید شامل یک بند باشند");
            }

            const totalPercent = getObjectValueByKey(createProjectContractInsertionForm.values.articles, "payments").reduce((acc, value) => {
                return acc += value.percent;
            }, 0);

            if (getObjectValueByKey(createProjectContractInsertionForm.values.articles, "payment_state") === "1" && totalPercent < 100) {
                return Toast("error", "مجموع درصد فازبندی قرار داد کمتر از 100 است.");
            }

            createProjectContractInsertionAction.mutate({
                ...result,
                project_id: params.id,
                contract_id: params.subId,
                is_supplement: location.hash === "#is_supplement=0" ? 0 : 1,
                employers: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "employers")?.map(item => item.id.toString()),
                contractors: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "contractors")?.map(item => item.id.toString()),
                start_date: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "start_date"),
                end_date: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "end_date"),
                total_price: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "total_price"),
                payment_state: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "payment_state"),
                payments: getObjectValueByKey(createProjectContractInsertionForm.values.articles, "payments")
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
            contract_id: params.subId
        });
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    (readAllProjectContractInsertionArticleAction.isPending && readAllProjectContractInsertionSectionAction.isPending) && (
                        <Loading
                            withCard
                            width="100%"
                            height={1200}
                        />
                    )
                }

                {
                    (!readAllProjectContractInsertionArticleAction.isPending && !readAllProjectContractInsertionSectionAction.isPending) && (
                        <FormData
                            createProjectContractInsertionForm={createProjectContractInsertionForm}
                            createProjectContractInsertionAction={createProjectContractInsertionAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
