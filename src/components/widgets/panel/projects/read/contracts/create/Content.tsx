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
                        contractors: [1, 2],
                        employers: [1]
                    })
                } else if (article.number === 3) {
                    return ({
                        ...article,
                        start_date: "",
                        end_date: ""
                    })
                } else if (article.number === 4) {
                    return ({
                        ...article,
                        total_price: 0,
                    })
                } else if (article.number === 5) {
                    return ({
                        ...article,
                        payment_state: "1",
                        payments: [],
                    })
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
                    })
                }  else {
                    return ({
                        ...section,
                        isOff: false,
                        isAdded: false,
                        isStatic: false
                    })
                }
            }) : [],
            notes: []
        },
        validationSchema: createProjectContractSchema,
        onSubmit: async (result) => {
            createProjectContractAction.mutate({
                ...result,
                project_id: params.id,
            });
        }
    });

    useLayoutEffect(() => {
        readAllProjectContractArticleAction.mutate();
    }, []);

    useLayoutEffect(() => {
        readAllProjectContractSectionAction.mutate();
    }, []);

    console.log(createProjectContractForm.values.sections)

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
