// libraries
import {useParams} from "react-router-dom";
import {LuPen, LuTrash} from "react-icons/lu";

// components
import {Contract, Article} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";
import CreateEmployerFormData
    from "@/components/widgets/panel/projects/read/contracts/update/CreateEmployerFormData.tsx";
import CreateContractorFormData
    from "@/components/widgets/panel/projects/read/contracts/update/CreateContractorFormData.tsx";
import CreateExecutionTimeFormData
    from "@/components/widgets/panel/projects/read/contracts/update/CreateExecutionTimeFormData.tsx";
import CreateAmountFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateAmountFormData.tsx";
import CreatePaymentFormData from "@/components/widgets/panel/projects/read/contracts/update/CreatePaymentFormData.tsx";
import CreateRegularFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateRegularFormData.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Accordion from "@/modules/Accordion.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {removeArticle} from "@/utils/functions.ts";

const FormData = ({updateProjectContractForm, updateProjectContractAction}) => {
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
                            <Contract updateProjectContractForm={updateProjectContractForm}>
                                <Accordion>
                                    {
                                        updateProjectContractForm.values.articles?.map(article =>
                                            <Accordion.Item
                                                key={article.number}
                                                title={article.content}
                                                number={article.number}
                                                initialEntered={article.number === 1}
                                                endAdornment={
                                                    !article.isAdded ? (
                                                        <div
                                                            className="d-flex justify-content-end align-items-center gap-5">
                                                            <div className='ms-auto'>
                                                                <IconButton
                                                                    color="light-warning"
                                                                    size="sm"
                                                                    data-tooltip-id="my-tooltip"
                                                                    data-tooltip-content="ویرایش ماده"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();

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

                                                                        const result = removeArticle(updateProjectContractForm.values.articles, updateProjectContractForm.values.sections, updateProjectContractForm.values.notes, article.number);

                                                                        updateProjectContractForm.setFieldValue("notes", result.notes);
                                                                        updateProjectContractForm.setFieldValue("sections", result.sections);
                                                                        updateProjectContractForm.setFieldValue("articles", result.articles);

                                                                        updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length - 1} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);
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
                                                    updateProjectContractForm={updateProjectContractForm}
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
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 1 && (
                                                            <CreateContractorFormData
                                                                key={`${article.number}-2`}
                                                                article={article}
                                                                section={{number: 2, article_number: 1, content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 3 && (
                                                            <CreateExecutionTimeFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 3, content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 4 && (
                                                            <CreateAmountFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 4, content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 5 && (
                                                            <CreatePaymentFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1, article_number: 5, content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        updateProjectContractForm.values.sections.filter(section => section.article_number === article.number && !section.isStatic).map(section =>
                                                            <CreateRegularFormData
                                                                key={`${article.number}-${section.number}`}
                                                                article={article}
                                                                section={section}
                                                                updateProjectContractForm={updateProjectContractForm}
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
                    color="warning"
                    onClick={updateProjectContractForm.handleSubmit}
                    isLoading={updateProjectContractAction.isPending}
                >
                    ویرایش قرارداد
                </Button>
            </div>
        </>
    )
}

export default FormData;