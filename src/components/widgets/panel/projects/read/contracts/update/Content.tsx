// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// services
import {readProjectContractService, updateProjectContractService} from "@/services/projectContractService.ts";
import {readAllProjectContractArticleService, readAllProjectContractSectionService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {updateProjectContractSchema} from "@/utils/validations.ts";
import {getValueByKey} from "@/utils/functions.ts";

const Content = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectContractSectionAction = useMutation({
        mutationFn: (data) => readProjectContractService(data),
    });

    const readAllProjectContractArticleAction = useMutation({
        mutationFn: () => readAllProjectContractArticleService(),
    });

    const readAllProjectContractSectionAction = useMutation({
        mutationFn: () => readAllProjectContractSectionService(),
    });

    const updateProjectContractAction = useMutation({
        mutationFn: (data) => updateProjectContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts");
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProjectContractForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            articles: readAllProjectContractArticleAction.data?.data?.contract_default_articles ? readAllProjectContractArticleAction.data?.data?.contract_default_articles.map(article => {
                if (article.number === 1) {
                    return ({
                        ...article,
                        contractors: [],
                        employers: []
                    });
                } else if (article.number === 3) {
                    return ({
                        ...article,
                        start_date: "",
                        end_date: ""
                    });
                } else if (article.number === 4) {
                    return ({
                        ...article,
                        total_price: 0,
                    });
                } else if (article.number === 5) {
                    return ({
                        ...article,
                        payment_state: "",
                        payments: [],
                    });
                } else {
                    return article;
                }
            }) : [],
            sections: readAllProjectContractSectionAction.data?.data?.contract_ready_sections ? readAllProjectContractSectionAction.data?.data.contract_ready_sections.map(section => {
                if (
                    (section.number === 1 && section.article_number === 3) ||
                    (section.number === 1 && section.article_number === 4) ||
                    (section.number === 1 && section.article_number === 5) ||
                    (section.number === 1 && section.article_number === 11)
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
        validationSchema: updateProjectContractSchema,
        onSubmit: async (result) => {
            const totalPercent = getValueByKey(updateProjectContractForm.values.articles, "payments").reduce((acc, value) => {
                return acc += value.percent;
            }, 0);

            console.log(totalPercent);

            if (getValueByKey(updateProjectContractForm.values.articles, "payment_state") === "1" && totalPercent < 100) return toast("error", "مجموع درصد فازبندی قرار داد کمتر از 100 است.");

            updateProjectContractAction.mutate({
                ...result,
                project_id: params.id,
                employers: getValueByKey(updateProjectContractForm.values.articles, "employers")?.map(item => item.id.toString()),
                contractors: getValueByKey(updateProjectContractForm.values.articles, "contractors")?.map(item => item.id.toString()),
                start_date: getValueByKey(updateProjectContractForm.values.articles, "start_date"),
                end_date: getValueByKey(updateProjectContractForm.values.articles, "end_date"),
                total_price: getValueByKey(updateProjectContractForm.values.articles, "total_price"),
                payment_state: getValueByKey(updateProjectContractForm.values.articles, "payment_state"),
                payments: getValueByKey(updateProjectContractForm.values.articles, "payments")
            });
        }
    });

    useLayoutEffect(() => {
        readAllProjectContractArticleAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllProjectContractSectionAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readProjectContractSectionAction.mutate({
            project_id: params.id,
            contract_id: params.subId
        });
    }, []);

    console.log(readProjectContractSectionAction.data)

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
                            updateProjectContractForm={updateProjectContractForm}
                            updateProjectContractAction={updateProjectContractAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
