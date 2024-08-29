// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/create/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {
    createProjectOfficialContractService,
    createProjectUnOfficialContractService,
    ICreateProjectOfficialContract,
    ICreateProjectUnOfficialContract
} from "@/services/projectContractService.ts";
import {readAllProjectContractArticleService, readAllProjectContractSectionService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {getObjectValueByKey} from "@/utils/functions.ts";

const createProjectContractSchema = Yup.object().shape({
    articles: Yup.array(),
    sections: Yup.array(),
    notes: Yup.array(),
});

const Content = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readAllProjectContractArticleAction = useMutation({
        mutationFn: () => readAllProjectContractArticleService(),
    });

    const readAllProjectContractSectionAction = useMutation({
        mutationFn: () => readAllProjectContractSectionService(),
    });

    const createProjectOfficialContractAction = useMutation({
        mutationFn: (data: ICreateProjectOfficialContract) => createProjectOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const createProjectUnOfficialContractAction = useMutation({
        mutationFn: (data: ICreateProjectUnOfficialContract) => createProjectUnOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts");
            } else {
                Toast("error", data.message);
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
                        payment_state: "1",
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
                    (section.number === 1 && section.article_number === 1) ||
                    (section.number === 2 && section.article_number === 1) ||
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
            const articleNumbers = Array(result.articles.length).fill(null).map((_, index) => index + 1);
            const sectionArticleNumbers = [...new Set(result.sections.map(section => section.article_number))];

            if (!articleNumbers.every(item => sectionArticleNumbers.includes(item))) {
                return Toast("error", "همه ی ماده ها حداقل باید شامل یک بند باشند");
            }

            const totalPercent = getObjectValueByKey(createProjectContractForm.values.articles, "payments").reduce((acc, value) => {
                return acc += value.percent;
            }, 0);

            if (getObjectValueByKey(createProjectContractForm.values.articles, "payment_state") === "1" && totalPercent < 100) {
                return Toast("error", "مجموع درصد فازبندی قرار داد کمتر از 100 است.");
            }

            if (location.hash === "#official") {
                createProjectOfficialContractAction.mutate({
                    ...result,
                    project_id: params.id,
                    sections: createProjectContractForm.values.sections.filter(section => !section.isOff),
                    employers: getObjectValueByKey(createProjectContractForm.values.articles, "employers")?.map(item => item.id.toString()),
                    contractors: getObjectValueByKey(createProjectContractForm.values.articles, "contractors")?.map(item => item.id.toString()),
                    start_date: getObjectValueByKey(createProjectContractForm.values.articles, "start_date"),
                    end_date: getObjectValueByKey(createProjectContractForm.values.articles, "end_date"),
                    total_price: getObjectValueByKey(createProjectContractForm.values.articles, "total_price"),
                    payment_state: getObjectValueByKey(createProjectContractForm.values.articles, "payment_state"),
                    payments: getObjectValueByKey(createProjectContractForm.values.articles, "payments")
                });
            } else if (location.hash === "#un-official") {
                createProjectUnOfficialContractAction.mutate({
                    ...result,
                    project_id: params.id,
                    sections: createProjectContractForm.values.sections.filter(section => !section.isOff),
                    employers: getObjectValueByKey(createProjectContractForm.values.articles, "employers"),
                    contractors: getObjectValueByKey(createProjectContractForm.values.articles, "contractors"),
                    start_date: getObjectValueByKey(createProjectContractForm.values.articles, "start_date"),
                    end_date: getObjectValueByKey(createProjectContractForm.values.articles, "end_date"),
                    total_price: getObjectValueByKey(createProjectContractForm.values.articles, "total_price"),
                    payment_state: getObjectValueByKey(createProjectContractForm.values.articles, "payment_state"),
                    payments: getObjectValueByKey(createProjectContractForm.values.articles, "payments")
                });
            }
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
                    (readAllProjectContractArticleAction.isPending && readAllProjectContractSectionAction.isPending) && (
                        <Loading
                            withCard
                            width="100%"
                            height={1200}
                        />
                    )
                }

                {
                    (!readAllProjectContractArticleAction.isPending && !readAllProjectContractSectionAction.isPending) && (
                        <FormData
                            createProjectContractForm={createProjectContractForm}
                            createProjectContractAction={location.hash === "#official" ? createProjectOfficialContractAction : createProjectUnOfficialContractAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
