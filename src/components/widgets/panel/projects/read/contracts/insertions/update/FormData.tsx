// libraries
import {useLocation, useParams} from "react-router-dom";
import {LuPen, LuTrash} from "react-icons/lu";

// components
import {Contract, Article} from "@/components/widgets/panel/projects/read/contracts/insertions/update/Actions.tsx";
import CreateEmployerFormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/CreateEmployerFormData.tsx";
import CreateContractorFormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/CreateContractorFormData.tsx";
import CreateExecutionTimeFormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/CreateExecutionTimeFormData.tsx";
import CreateAmountFormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/CreateAmountFormData.tsx";
import CreatePaymentFormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/CreatePaymentFormData.tsx";
import CreateRegularFormData from "@/components/widgets/panel/projects/read/contracts/insertions/update/CreateRegularFormData.tsx";

// hooks
import usePart from "@/hooks/usePart";

// modules
import Accordion from "@/modules/Accordion";
import Button from "@/modules/Button";
import IconButton from "@/modules/IconButton";

// stores
import useAuthStore from "@/stores/authStore";

// utils
import {removeArticleForInsertion} from "@/utils/functions.ts";

const FormData = ({readProjectContractSectionAction , updateProjectContractInsertionForm, updateProjectContractInsertionAction}) => {
    const location = useLocation();
    const params = useParams();
    const {auth} = useAuthStore();
    const {
        part: articlePart,
        currentPart: articleCurrentPart,
        changePart: articleChangePart,
        resetPart: articleResetPart,
        changeCurrentPart: articleChangeCurrentPart
    } = usePart(null, "read");

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                    <div className="row gy-5 w-100">
                        <div className="col-12">
                            <Contract updateProjectContractInsertionForm={updateProjectContractInsertionForm}>
                                <Accordion>
                                    {
                                        updateProjectContractInsertionForm.values.articles?.map(article =>
                                            <Accordion.Item
                                                key={article.number}
                                                title={article.content}
                                                number={article.number}
                                                initialEntered={article.number === 1}
                                                endAdornment={
                                                    article.is_added === "1" ? (
                                                        <div
                                                            className="d-flex justify-content-end align-items-center gap-5 ms-auto">
                                                            <div>
                                                                <IconButton
                                                                    color="light-warning"
                                                                    size="sm"
                                                                    data-tooltip-id="my-tooltip"
                                                                    data-tooltip-content="ویرایش ماده"
                                                                    onClick={(e) => {
                                                                        articleChangePart({
                                                                            number: article.number
                                                                        });
                                                                        articleChangeCurrentPart("update");
                                                                    }}
                                                                >
                                                                    <LuPen
                                                                        size={20}
                                                                        color="currentColor"
                                                                    />
                                                                </IconButton>
                                                            </div>

                                                            <div>
                                                                <IconButton
                                                                    color="light-danger"
                                                                    size="sm"
                                                                    data-tooltip-id="my-tooltip"
                                                                    data-tooltip-content="حذف ماده"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();

                                                                        const data = removeArticleForInsertion(updateProjectContractInsertionForm.values.articles, updateProjectContractInsertionForm.values.sections, article.number);

                                                                        updateProjectContractInsertionForm.setFieldValue("sections", data.sections);
                                                                        updateProjectContractInsertionForm.setFieldValue("articles", data.articles);
                                                                    }}
                                                                >
                                                                    <LuTrash
                                                                        size={20}
                                                                        color="currentColor"
                                                                    />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    ) : null
                                                }
                                            >
                                                <Article
                                                    article={article}
                                                    updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                    part={articlePart}
                                                    currentPart={articleCurrentPart}
                                                    resetPart={articleResetPart}
                                                    changeCurrentPart={articleChangeCurrentPart}
                                                >
                                                    {
                                                        article.number === 1 && (
                                                            <CreateEmployerFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 1, content: ""}}
                                                                updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 1 && (
                                                            <CreateContractorFormData
                                                                key={`${article.number}-2`}
                                                                article={article}
                                                                section={{number: 2, article_number: 1, content: ""}}
                                                                updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 2 && (
                                                            <CreateExecutionTimeFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 2, content: ""}}
                                                                updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 3 && (
                                                            <CreateAmountFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 3, content: ""}}
                                                                updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 4 && (
                                                            <CreatePaymentFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 4, content: ""}}
                                                                updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        updateProjectContractInsertionForm.values.sections.filter(section => section.article_number === article.number && !section.isStatic).map(section =>
                                                            <CreateRegularFormData
                                                                key={`${article.number}-${section.number}`}
                                                                article={article}
                                                                section={section}
                                                                updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }
                                                </Article>
                                            </Accordion.Item>
                                        )
                                    }
                                </Accordion>
                            </Contract>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    href={auth.panel_url + `projects/${params.id}/contracts/${params.subId}/insertions`}
                    color="light-danger"
                >
                    انصراف
                </Button>

                <Button
                    color="warning"
                    onClick={updateProjectContractInsertionForm.handleSubmit}
                    isLoading={updateProjectContractInsertionAction.isPending}
                >
                    ویرایش
                    &nbsp;
                    {location.hash === "#is_supplement=0" ? "الحاقیه" : "متمم"}
                </Button>
            </div>
        </>
    )
}

export default FormData;