// libraries
import {useParams} from "react-router-dom";
import {LuTrash} from "react-icons/lu";

// components
import {Contract, Article} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";
import CreateEmployerFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateEmployerFormData.tsx";
import CreateContractorFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateContractorFormData.tsx";
import CreateExecutionTimeFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateExecutionTimeFormData.tsx";
import CreateAmountFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateAmountFormData.tsx";
import CreatePaymentFormData from "@/components/widgets/panel/projects/read/contracts/update/CreatePaymentFormData.tsx";
import CreateRegularFormData from "@/components/widgets/panel/projects/read/contracts/update/CreateRegularFormData.tsx";

// modules
import Accordion from "@/modules/Accordion.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cloneObject, removeArticle} from "@/utils/functions.ts";

const FormData = ({updateProjectContractForm, updateProjectContractAction}) => {
    const params = useParams();
    const {auth} = useAuthStore();

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
                                                    article.isAdded ? (
                                                        <IconButton
                                                            color="light-danger"
                                                            size="sm"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="حذف ماده"
                                                            className='ms-auto'
                                                            onClick={(e) => {
                                                                e.stopPropagation();

                                                                const result = removeArticle(cloneObject(updateProjectContractForm.values.articles) , cloneObject(updateProjectContractForm.values.sections) , cloneObject(updateProjectContractForm.values.notes) , article.number);

                                                                updateProjectContractForm.setFieldValue("notes" , result.notes);
                                                                updateProjectContractForm.setFieldValue("sections", result.sections);
                                                                updateProjectContractForm.setFieldValue("articles" , result.articles);
                                                            }}
                                                        >
                                                            <LuTrash
                                                                size={20}
                                                                color="currentColor"
                                                            />
                                                        </IconButton>
                                                    ) : null
                                                }
                                            >
                                                <Article
                                                    article={article}
                                                    updateProjectContractForm={updateProjectContractForm}
                                                >
                                                    {
                                                        article.number === 1 && (
                                                            <CreateEmployerFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1 , article_number: 1 , content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 1 && (
                                                            <CreateContractorFormData
                                                                key={`${article.number}-2`}
                                                                article={article}
                                                                section={{number: 2 , article_number: 1 , content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 3 && (
                                                            <CreateExecutionTimeFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1 , article_number: 3 , content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 4 && (
                                                            <CreateAmountFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1 , article_number: 4 , content: ""}}
                                                                updateProjectContractForm={updateProjectContractForm}
                                                            />
                                                        )
                                                    }

                                                    {
                                                        article.number === 5 && (
                                                            <CreatePaymentFormData
                                                                key={`${article.number}-1`}
                                                                article={article}
                                                                section={{number: 1 , article_number: 5 , content: ""}}
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
                    color="success"
                    onClick={updateProjectContractForm.handleSubmit}
                    isLoading={updateProjectContractAction.isPending}
                >
                    افزودن قرارداد
                </Button>
            </div>
        </>
    )
}

export default FormData;