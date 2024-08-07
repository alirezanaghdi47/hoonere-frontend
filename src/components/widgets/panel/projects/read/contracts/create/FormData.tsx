// libraries
import {useParams} from "react-router-dom";
import {LuTrash} from "react-icons/lu";

// components
import {Contract, Article} from "@/components/partials/panel/projects/read/contracts/create/Tools.tsx";
import CreateEmployerFormData
    from "@/components/widgets/panel/projects/read/contracts/create/CreateEmployerFormData.tsx";
import CreateContractorFormData
    from "@/components/widgets/panel/projects/read/contracts/create/CreateContractorFormData.tsx";
import CreateExecutionTimeFormData
    from "@/components/widgets/panel/projects/read/contracts/create/CreateExecutionTimeFormData.tsx";
import CreateAmountFormData from "@/components/widgets/panel/projects/read/contracts/create/CreateAmountFormData.tsx";
import CreatePaymentFormData from "@/components/widgets/panel/projects/read/contracts/create/CreatePaymentFormData.tsx";
import CreateRegularFormData from "@/components/widgets/panel/projects/read/contracts/create/CreateRegularFormData.tsx";

// modules
import Accordion from "@/modules/Accordion";
import Button from "@/modules/Button";
import IconButton from "@/modules/IconButton";

// stores
import useAuthStore from "@/stores/authStore";

// utils
import {removeArticle} from "@/utils/functions.ts";

const FormData = ({createProjectContractForm, createProjectContractAction}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                    <div className="row gy-5 w-100">
                        <div className="col-12">
                            <Contract createProjectContractForm={createProjectContractForm}>
                                <Accordion>
                                    {
                                        createProjectContractForm.values.articles?.map(article =>
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

                                                                    const result = removeArticle(createProjectContractForm.values.articles, createProjectContractForm.values.sections, createProjectContractForm.values.notes, article.number);

                                                                    createProjectContractForm.setFieldValue("notes", result.notes);
                                                                    createProjectContractForm.setFieldValue("sections", result.sections);
                                                                    createProjectContractForm.setFieldValue("articles", result.articles);

                                                                    createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length - 1} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);
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
                                                    createProjectContractForm={createProjectContractForm}
                                                >
                                                    {
                                                        article.number === 1 && (
                                                            <CreateEmployerFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 1, content: ""}}
                                                                createProjectContractForm={createProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 1 && (
                                                            <CreateContractorFormData
                                                                key={`${article.number}-2`}
                                                                article={article}
                                                                section={{number: 2, article_number: 1, content: ""}}
                                                                createProjectContractForm={createProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 3 && (
                                                            <CreateExecutionTimeFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 3, content: ""}}
                                                                createProjectContractForm={createProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 4 && (
                                                            <CreateAmountFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 4, content: ""}}
                                                                createProjectContractForm={createProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 5 && (
                                                            <CreatePaymentFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 5, content: ""}}
                                                                createProjectContractForm={createProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        createProjectContractForm.values.sections.filter(section => section.article_number === article.number && !section.isStatic).map(section =>
                                                            <CreateRegularFormData
                                                                key={`${article.number}-${section.number}`}
                                                                article={article}
                                                                section={section}
                                                                createProjectContractForm={createProjectContractForm}
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
                    onClick={createProjectContractForm.handleSubmit}
                    isLoading={createProjectContractAction.isPending}
                >
                    افزودن قرارداد
                </Button>
            </div>
        </>
    )
}

export default FormData;