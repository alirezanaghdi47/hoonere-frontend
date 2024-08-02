// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/create/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// services
import {createProjectContractService} from "@/services/projectContractService.ts";
import {readAllProjectContractArticleService, readAllProjectContractSectionService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {createProjectContractSchema} from "@/utils/validations.ts";
import {getValueByKey} from "@/utils/functions.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readAllProjectContractArticleAction = useMutation({
        mutationFn: () => readAllProjectContractArticleService(),
    });

    const readAllProjectContractSectionAction = useMutation({
        mutationFn: () => readAllProjectContractSectionService(),
    });

    const createProjectContractAction = useMutation({
        mutationFn: (data) => createProjectContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts");
            } else {
                toast("error", data.message);
            }
        }
    });

    const createProjectContractForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            articles: readAllProjectContractArticleAction.data?.data?.contract_default_articles ? readAllProjectContractArticleAction.data?.data?.contract_default_articles.map(article => {
                if (article.number === 1) {
                    return ({
                        ...article,
                        is_added: "0",
                        contractors: [],
                        employers: []
                    });
                } else if (article.number === 3) {
                    return ({
                        ...article,
                        is_added: "0",
                        start_date: "",
                        end_date: ""
                    });
                } else if (article.number === 4) {
                    return ({
                        ...article,
                        is_added: "0",
                        total_price: 0,
                    });
                } else if (article.number === 5) {
                    return ({
                        ...article,
                        is_added: "0",
                        payment_state: "",
                        payments: [],
                    });
                } else {
                    return ({
                        ...article,
                        is_added: "0"
                    });
                }
            }) : [],
            sections: readAllProjectContractSectionAction.data?.data?.contract_ready_sections ? readAllProjectContractSectionAction.data?.data.contract_ready_sections.map(section => {
                if (
                    (section.number === 1 && section.article_number === 3) ||
                    (section.number === 1 && section.article_number === 4) ||
                    (section.number === 1 && section.article_number === 5)
                ) {
                    return ({
                        ...section,
                        isOff: false,
                        isAdded: false,
                        isStatic: true
                    });
                } else {
                    return ({
                        ...section,
                        isOff: false,
                        isAdded: false,
                        isStatic: false
                    });
                }
            }) : [],
            notes: []
        },
        validationSchema: createProjectContractSchema,
        onSubmit: async (result) => {
            const totalPercent = getValueByKey(createProjectContractForm.values.articles, "payments").reduce((acc , value) => {
                return acc += value.percent;
            } , 0);

            if (getValueByKey(createProjectContractForm.values.articles, "payment_state") === "1" && totalPercent < 100) return toast("error" , "مجموع درصد فازبندی قرار داد کمتر از 100 است.");

            createProjectContractAction.mutate({
                ...result,
                project_id: params.id,
                employers: getValueByKey(createProjectContractForm.values.articles, "employers")?.map(item => item.id.toString()),
                contractors: getValueByKey(createProjectContractForm.values.articles, "contractors")?.map(item => item.id.toString()),
                start_date: getValueByKey(createProjectContractForm.values.articles, "start_date"),
                end_date: getValueByKey(createProjectContractForm.values.articles, "end_date"),
                total_price: getValueByKey(createProjectContractForm.values.articles, "total_price"),
                payment_state: getValueByKey(createProjectContractForm.values.articles, "payment_state"),
                payments: getValueByKey(createProjectContractForm.values.articles, "payments")
            });
        }
    });

    useLayoutEffect(() => {
        readAllProjectContractArticleAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllProjectContractSectionAction.mutate();
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readAllProjectContractArticleAction.isPending && readAllProjectContractSectionAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={1200}
                        />
                    )
                }

                {
                    !readAllProjectContractArticleAction.isPending && !readAllProjectContractSectionAction.isPending && (
                        <FormData
                            createProjectContractForm={createProjectContractForm}
                            createProjectContractAction={createProjectContractAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
