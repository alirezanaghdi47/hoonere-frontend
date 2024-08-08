// libraries
import {useParams} from "react-router-dom";
import {LuTrash} from "react-icons/lu";

// components
import {Contract, Article} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";
import CreateRegularFormData from "@/components/widgets/panel/projects/read/contracts/insertions/create/CreateRegularFormData.tsx";

// modules
import Accordion from "@/modules/Accordion";
import Button from "@/modules/Button";
import IconButton from "@/modules/IconButton";

// stores
import useAuthStore from "@/stores/authStore";

// utils
import {removeArticleForInsertion} from "@/utils/functions.ts";

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
                                                    <div className='ms-auto'>
                                                        <IconButton
                                                            color="light-danger"
                                                            size="sm"
                                                            data-tooltip-id="my-tooltip"
                                                            data-tooltip-content="حذف ماده"
                                                            onClick={(e) => {
                                                                e.stopPropagation();

                                                                const data = removeArticleForInsertion(createProjectContractForm.values.articles, createProjectContractForm.values.sections, article.number);

                                                                createProjectContractForm.setFieldValue("sections", data.sections);
                                                                createProjectContractForm.setFieldValue("articles", data.articles);
                                                            }}
                                                        >
                                                            <LuTrash
                                                                size={20}
                                                                color="currentColor"
                                                            />
                                                        </IconButton>
                                                    </div>
                                                }
                                            >
                                                <Article
                                                    article={article}
                                                    createProjectContractForm={createProjectContractForm}
                                                >
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
                    href={auth.panel_url + `projects/${params.id}/contracts/${params.subId}/insertions`}
                    color="light-danger"
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    onClick={createProjectContractForm.handleSubmit}
                    isLoading={createProjectContractAction.isPending}
                >
                    افزودن الحاقیه
                </Button>
            </div>
        </>
    )
}

export default FormData;