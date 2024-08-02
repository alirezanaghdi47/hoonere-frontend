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
            articles: readProjectContractSectionAction.data?.data?.contract_info?.articles ? readProjectContractSectionAction.data?.data?.contract_info?.articles.map(article => {
                if (article.number === 1) {
                    return ({
                        ...article,
                        contractors: readProjectContractSectionAction.data?.data?.contract_info?.members.filter(member => member.side_id === "2").map(member => member.user_info),
                        employers: readProjectContractSectionAction.data?.data?.contract_info?.members.filter(member => member.side_id === "1").map(member => member.user_info)
                    });
                } else if (article.number === 3) {
                    return ({
                        ...article,
                        start_date: readProjectContractSectionAction.data?.data?.contract_info?.start_date,
                        end_date: readProjectContractSectionAction.data?.data?.contract_info?.end_date
                    });
                } else if (article.number === 4) {
                    return ({
                        ...article,
                        total_price: readProjectContractSectionAction.data?.data?.contract_info?.total_price,
                    });
                } else if (article.number === 5) {
                    return ({
                        ...article,
                        payment_state: readProjectContractSectionAction.data?.data?.contract_info?.payment_state,
                        payments: readProjectContractSectionAction.data?.data?.contract_info?.payments.map(payment => ({
                            date: payment.date,
                            percent: Number(payment.percent)
                        })),
                    });
                } else {
                    return article;
                }
            }) : [],
            sections: readProjectContractSectionAction.data?.data?.contract_info?.articles ? [
                ...readProjectContractSectionAction.data?.data?.contract_info?.articles.flatMap(article => article.sections).filter(section => !(section.number === 1 && [1, 3, 4, 5].includes(section.article_number))),
                ...[1, 1, 3, 4, 5].map(item => ({
                    article_number: item,
                    content: "",
                    isAdded: false,
                    isOff: false,
                    isStatic: true,
                    last_article: "0",
                    number: 1,
                }))
            ] : [],
            notes: readProjectContractSectionAction.data?.data?.contract_info?.articles ? readProjectContractSectionAction.data?.data?.contract_info?.articles.flatMap(article => article.notes).filter(note => note !== undefined).map(note => ({
                ...note,
                isAdded: true,
            })) : []
        },
        validationSchema: updateProjectContractSchema,
        onSubmit: async (result) => {
            const totalPercent = getValueByKey(updateProjectContractForm.values.articles, "payments").reduce((acc, value) => {
                return acc += value.percent;
            }, 0);

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
        readProjectContractSectionAction.mutate({
            project_id: params.id,
            contract_id: params.subId
        });
    }, []);

    console.log(readProjectContractSectionAction.data?.data?.contract_info)

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    readProjectContractSectionAction.isPending && (
                        <Loading
                            withCard
                            width="100%"
                            height={1200}
                        />
                    )
                }

                {
                    !readProjectContractSectionAction.isPending && (
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
