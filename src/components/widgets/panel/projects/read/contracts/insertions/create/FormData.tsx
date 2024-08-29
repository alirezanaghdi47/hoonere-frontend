// libraries
import {useLocation, useParams} from "react-router-dom";
import {LuTrash} from "react-icons/lu";

// ?????
import {removeArticleForInsertion} from "@/components/widgets/panel/projects/read/contracts/insertions/Action.tsx";

// components
import {Contract, Article} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";
import CreateEmployerFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreateEmployerFormData.tsx";
import CreateContractorFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreateContractorFormData.tsx";
import CreateExecutionTimeFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreateExecutionTimeFormData.tsx";
import CreateAmountFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreateAmountFormData.tsx";
import CreatePaymentFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreatePaymentFormData.tsx";
import CreateRegularFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreateRegularFormData.tsx";

// modules
import Accordion from "@/modules/Accordion";
import Button from "@/modules/Button";
import IconButton from "@/modules/IconButton";

// stores
import useAuthStore from "@/stores/authStore.ts";

const FormData = ({createProjectContractInsertionForm, createProjectContractInsertionAction}) => {
    const location = useLocation();
    const params = useParams();
    const {auth} = useAuthStore();

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                    <div className="row gy-5 w-100">
                        <div className="col-12">
                            <Contract createProjectContractInsertionForm={createProjectContractInsertionForm}>
                                <Accordion>
                                    {
                                        createProjectContractInsertionForm.values.articles?.map(article =>
                                            <Accordion.Item
                                                key={article.number}
                                                title={article.content}
                                                number={article.number}
                                                initialEntered={article.number === 1}
                                                endAdornment={
                                                    article.is_added === "1" ? (
                                                        <div className='ms-auto'>
                                                            <IconButton
                                                                color="light-danger"
                                                                size="sm"
                                                                data-tooltip-id="my-tooltip"
                                                                data-tooltip-content="حذف ماده"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();

                                                                    const data = removeArticleForInsertion(createProjectContractInsertionForm.values.articles, createProjectContractInsertionForm.values.sections, article.number);

                                                                    createProjectContractInsertionForm.setFieldValue("sections", data.sections);
                                                                    createProjectContractInsertionForm.setFieldValue("articles", data.articles);
                                                                }}
                                                            >
                                                                <LuTrash
                                                                    size={20}
                                                                    color="currentColor"
                                                                />
                                                            </IconButton>
                                                        </div>
                                                    ) : null
                                                }
                                            >
                                                <Article
                                                    article={article}
                                                    createProjectContractInsertionForm={createProjectContractInsertionForm}
                                                >
                                                    {
                                                        article.number === 1 && (
                                                            <CreateEmployerFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 1, content: ""}}
                                                                createProjectContractInsertionForm={createProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 1 && (
                                                            <CreateContractorFormData
                                                                key={`${article.number}-2`}
                                                                article={article}
                                                                section={{number: 2, article_number: 1, content: ""}}
                                                                createProjectContractInsertionForm={createProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 2 && (
                                                            <CreateExecutionTimeFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 2, content: ""}}
                                                                createProjectContractInsertionForm={createProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 3 && (
                                                            <CreateAmountFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 3, content: ""}}
                                                                createProjectContractInsertionForm={createProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 4 && (
                                                            <CreatePaymentFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 4, content: ""}}
                                                                createProjectContractInsertionForm={createProjectContractInsertionForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        createProjectContractInsertionForm.values.sections.filter(section => section.article_number === article.number && !section.isStatic).map(section =>
                                                            <CreateRegularFormData
                                                                key={`${article.number}-${section.number}`}
                                                                article={article}
                                                                section={section}
                                                                createProjectContractInsertionForm={createProjectContractInsertionForm}
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
                    href={auth.panel_url + `projects/${params.id}/contracts`}
                    color="light-danger"
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    onClick={createProjectContractInsertionForm.handleSubmit}
                    isLoading={createProjectContractInsertionAction.isPending}
                >
                    افزودن
                    &nbsp;
                    {location.hash === "#is_supplement=0" ? "الحاقیه" : "متمم"}
                </Button>
            </div>
        </>
    )
}

export default FormData;