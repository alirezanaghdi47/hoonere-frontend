// libraries
import {useLayoutEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/supplements/create/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// helpers
import toast from "@/helpers/toast";

// services
import {createProjectOfficialContractService} from "@/services/projectContractService";
import {readAllProjectContractArticleService, readAllProjectContractSectionService} from "@/services/publicService";

// stores
import useAuthStore from "@/stores/authStore";

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
        mutationFn: (data) => createProjectOfficialContractService(data),
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
            articles: [],
            sections: readAllProjectContractSectionAction.data?.data?.contract_ready_sections ? readAllProjectContractSectionAction.data?.data.contract_ready_sections.map(section => {
                if (section.number === 1 && section.article_number === 1) {
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
        validationSchema: createProjectContractSchema,
        onSubmit: async (result) => {
            const articleNumbers = Array(result.articles.length).fill(null).map((_, index) => index + 1);
            const sectionArticleNumbers = [...new Set(result.sections.map(section => section.article_number))];

            if (!articleNumbers.every(item => sectionArticleNumbers.includes(item))) {
                return toast("error" , "همه ی ماده ها حداقل باید شامل یک بند باشند");
            }

            createProjectContractAction.mutate({
                ...result,
                project_id: params.id,
                contract_id: params.subId
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
