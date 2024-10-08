// libraries
import {useLayoutEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import FormData from "@/components/widgets/panel/projects/read/contracts/update/FormData.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import Toast from "@/modules/Toast"

// services
import {
    readProjectOfficialContractService,
    readProjectUnOfficialContractService,
    updateProjectOfficialContractService,
    updateProjectUnOfficialContractService,
    IReadProjectOfficialContract,
    IReadProjectUnOfficialContract,
    IUpdateProjectOfficialContract,
    IUpdateProjectUnOfficialContract
} from "@/services/projectContractService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {getObjectValueByKey} from "@/utils/functions.ts";

const updateProjectContractSchema = Yup.object().shape({
    articles: Yup.array(),
    sections: Yup.array(),
    notes: Yup.array(),
});

const Content = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const readProjectOfficialContractAction = useMutation({
        mutationFn: (data: IReadProjectOfficialContract) => readProjectOfficialContractService(data),
    });

    const readProjectUnOfficialContractAction = useMutation({
        mutationFn: (data: IReadProjectUnOfficialContract) => readProjectUnOfficialContractService(data),
    });

    const updateProjectOfficialContractAction = useMutation({
        mutationFn: (data: IUpdateProjectOfficialContract) => updateProjectOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProjectUnOfficialContractAction = useMutation({
        mutationFn: (data: IUpdateProjectUnOfficialContract) => updateProjectUnOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                navigate(auth.panel_url + "projects/" + params.id + "/contracts");
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProjectContractForm = useFormik({
            enableReinitialize: true,
            initialValues: location.hash === "#official" ? {
                articles: readProjectOfficialContractAction.data?.data?.contract_info?.articles ? readProjectOfficialContractAction.data?.data?.contract_info?.articles.map(article => {
                    if (article.number === 1) {
                        return ({
                            ...article,
                            contractors: readProjectOfficialContractAction.data?.data?.contract_info?.members.filter(member => member.side_id === "2").map(member => member.user_info),
                            employers: readProjectOfficialContractAction.data?.data?.contract_info?.members.filter(member => member.side_id === "1").map(member => member.user_info)
                        });
                    } else if (article.number === 3) {
                        return ({
                            ...article,
                            start_date: readProjectOfficialContractAction.data?.data?.contract_info?.start_date,
                            end_date: readProjectOfficialContractAction.data?.data?.contract_info?.end_date
                        });
                    } else if (article.number === 4) {
                        return ({
                            ...article,
                            total_price: readProjectOfficialContractAction.data?.data?.contract_info?.total_price,
                        });
                    } else if (article.number === 5) {
                        return ({
                            ...article,
                            payment_state: readProjectOfficialContractAction.data?.data?.contract_info?.payment_state,
                            payments: readProjectOfficialContractAction.data?.data?.contract_info?.payments.map(payment => ({
                                date: payment.date,
                                percent: Number(payment.percent)
                            })),
                        });
                    } else {
                        return article;
                    }
                }) : [],
                sections: readProjectOfficialContractAction.data?.data?.contract_info?.articles ? readProjectOfficialContractAction.data?.data?.contract_info?.articles.flatMap(article => article.sections) : [],
                notes: readProjectOfficialContractAction.data?.data?.contract_info?.articles ? readProjectOfficialContractAction.data?.data?.contract_info?.notes.map(note => ({
                    ...note,
                    isAdded: true,
                })) : []
            } : {
                articles: readProjectUnOfficialContractAction.data?.data?.contract_info?.articles ? readProjectUnOfficialContractAction.data?.data?.contract_info?.articles.map(article => {
                    if (article.number === 1) {
                        return ({
                            ...article,
                            contractors: readProjectUnOfficialContractAction.data?.data?.contract_info?.informal_members.filter(member => member.side_id === "2"),
                            employers: readProjectUnOfficialContractAction.data?.data?.contract_info?.informal_members.filter(member => member.side_id === "1")
                        });
                    } else if (article.number === 3) {
                        return ({
                            ...article,
                            start_date: readProjectUnOfficialContractAction.data?.data?.contract_info?.start_date,
                            end_date: readProjectUnOfficialContractAction.data?.data?.contract_info?.end_date
                        });
                    } else if (article.number === 4) {
                        return ({
                            ...article,
                            total_price: readProjectUnOfficialContractAction.data?.data?.contract_info?.total_price,
                        });
                    } else if (article.number === 5) {
                        return ({
                            ...article,
                            payment_state: readProjectUnOfficialContractAction.data?.data?.contract_info?.payment_state,
                            payments: readProjectUnOfficialContractAction.data?.data?.contract_info?.payments.map(payment => ({
                                date: payment.date,
                                percent: Number(payment.percent)
                            })),
                        });
                    } else {
                        return article;
                    }
                }) : [],
                sections: readProjectUnOfficialContractAction.data?.data?.contract_info?.articles ? readProjectUnOfficialContractAction.data?.data?.contract_info?.articles.flatMap(article => article.sections) : [],
                notes: readProjectUnOfficialContractAction.data?.data?.contract_info?.articles ? readProjectUnOfficialContractAction.data?.data?.contract_info?.notes.map(note => ({
                    ...note,
                    isAdded: true,
                })) : []
            },
            validationSchema: updateProjectContractSchema,
            onSubmit:
                async (result) => {
                    const totalPercent = getObjectValueByKey(updateProjectContractForm.values.articles, "payments").reduce((acc, value) => {
                        return acc += value.percent;
                    }, 0);

                    if (getObjectValueByKey(updateProjectContractForm.values.articles, "payment_state") === "1" && totalPercent < 100) return Toast("error", "مجموع درصد فازبندی قرار داد کمتر از 100 است.");

                    if (location.hash === "#official") {
                        updateProjectOfficialContractAction.mutate({
                            ...result,
                            project_id: params.id,
                            contract_id: params.subId,
                            employers: getObjectValueByKey(updateProjectContractForm.values.articles, "employers")?.map(item => item.id.toString()),
                            contractors: getObjectValueByKey(updateProjectContractForm.values.articles, "contractors")?.map(item => item.id.toString()),
                            start_date: getObjectValueByKey(updateProjectContractForm.values.articles, "start_date"),
                            end_date: getObjectValueByKey(updateProjectContractForm.values.articles, "end_date"),
                            total_price: getObjectValueByKey(updateProjectContractForm.values.articles, "total_price"),
                            payment_state: getObjectValueByKey(updateProjectContractForm.values.articles, "payment_state"),
                            payments: getObjectValueByKey(updateProjectContractForm.values.articles, "payments")
                        });
                    } else if (location.hash === "#un-official") {
                        updateProjectUnOfficialContractAction.mutate({
                            ...result,
                            project_id: params.id,
                            contract_id: params.subId,
                            employers: getObjectValueByKey(updateProjectContractForm.values.articles, "employers"),
                            contractors: getObjectValueByKey(updateProjectContractForm.values.articles, "contractors"),
                            start_date: getObjectValueByKey(updateProjectContractForm.values.articles, "start_date"),
                            end_date: getObjectValueByKey(updateProjectContractForm.values.articles, "end_date"),
                            total_price: getObjectValueByKey(updateProjectContractForm.values.articles, "total_price"),
                            payment_state: getObjectValueByKey(updateProjectContractForm.values.articles, "payment_state"),
                            payments: getObjectValueByKey(updateProjectContractForm.values.articles, "payments")
                        });
                    }
                }
        })
    ;

    useLayoutEffect(() => {
        if (location.hash === "#official") {
            readProjectOfficialContractAction.mutate({
                project_id: params.id,
                contract_id: params.subId,
                get_last: 1
            });
        } else if (location.hash === "#un-official") {
            readProjectUnOfficialContractAction.mutate({
                project_id: params.id,
                contract_id: params.subId,
                get_last: 1
            });
        }
    }, []);

    return (
        <div
            className="d-flex flex-column flex-lg-row justify-content-start align-items-start gap-5 w-100 mw-950px p-5">
            <div className="d-flex flex-wrap justify-content-center gap-5 w-100 mt-lg-n20">
                {
                    (readProjectOfficialContractAction.isPending || readProjectUnOfficialContractAction.isPending) && (
                        <Loading
                            withCard
                            width="100%"
                            height={1200}
                        />
                    )
                }

                {
                    (!readProjectOfficialContractAction.isPending && !readProjectUnOfficialContractAction.isPending) && (
                        <FormData
                            updateProjectContractForm={updateProjectContractForm}
                            updateProjectContractAction={location.hash === "#official" ? updateProjectOfficialContractAction : updateProjectUnOfficialContractAction}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Content;
