// libraries
import {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {LuPlus} from "react-icons/lu";

// ?????
import {addArticleForInsertion , addSectionForInsertion} from "@/components/widgets/panel/projects/read/contracts/insertions/Action.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";
import Form from "@/modules/Form";
import Textarea from "@/modules/Textarea";
import Button from "@/modules/Button";
import TextInput from "@/modules/TextInput";

const createArticleSchema = Yup.object().shape({
    article: Yup.string().trim().required("ماده الزامی است"),
});

const createSectionSchema = Yup.object().shape({
    section: Yup.string().trim().required("بند الزامی است"),
});

export const BlankArticle = ({changeCurrentPart}) => {
    const article = document.querySelector("div.szh-accordion__item-content");

    return (
        <div
            data-article-number={article?.getAttribute("data-article-number")}
            className="w-100"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-50px bg-light rounded-2 p-5 cursor-pointer">
                <LuPlus
                    size={20}
                    color="currentColor"
                    className="text-muted"
                />

                <Typography
                    variant="p"
                    size="sm"
                    color="muted"
                >
                    افزودن ماده جدید
                </Typography>
            </div>
        </div>
    )
}

export const BlankSection = ({changeCurrentPart}) => {
    return (
        <div
            className="w-100"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-50px bg-light rounded-2 p-5 cursor-pointer">
                <LuPlus
                    size={20}
                    color="currentColor"
                    className="text-muted"
                />

                <Typography
                    variant="p"
                    size="sm"
                    color="muted"
                >
                    افزودن بند جدید
                </Typography>
            </div>
        </div>
    )
}

export const Contract = ({children , updateProjectContractInsertionForm}) => {
    const {part, currentPart, changePart, resetPart , changeCurrentPart} = usePart(null, "read");

    useEffect(() => {
        changePart({
            articlesLength: updateProjectContractInsertionForm.values.articles.length,
            sections: updateProjectContractInsertionForm.values.sections
        });
    }, [updateProjectContractInsertionForm.values.articles]);

    return (
        <div className="d-flex flex-column justify-content-start items-center gap-5 w-100">
            {children}

            {
                currentPart === "read" && (
                    <BlankArticle changeCurrentPart={changeCurrentPart}/>
                )
            }

            {
                currentPart === "create" && (
                    <CreateArticle
                        articles={updateProjectContractInsertionForm.values.articles}
                        resetPart={resetPart}
                        updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                    />
                )
            }
        </div>
    )
}

export const Article = ({children, article, part, currentPart, resetPart , changeCurrentPart, updateProjectContractInsertionForm}) => {
    return (
        <div className="d-flex flex-column justify-content-start items-center gap-5 w-100">
            {
                currentPart !== "update" && (
                    children
                )
            }

            {
                currentPart === "update" && article.number === part?.number && (
                    <UpdateArticle
                        article={article}
                        resetPart={resetPart}
                        updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                    />
                )
            }

            {
                currentPart === "read" && (
                    <BlankSection changeCurrentPart={changeCurrentPart}/>
                )
            }

            {
                currentPart === "create" && (
                    <CreateSection
                        article={article}
                        sections={updateProjectContractInsertionForm.values.sections}
                        resetPart={resetPart}
                        updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                    />
                )
            }
        </div>
    )
}

export const Section = ({children, article, section, part, currentPart, resetPart , changeCurrentPart, updateProjectContractInsertionForm}) => {
    return (
        <div
            className="d-flex flex-column justify-content-start items-center gap-5 w-100">
            {
                currentPart !== "update" && (
                    children
                )
            }

            {
                currentPart === "update" && article.number === part?.article_number && section.number === part?.number && (
                    <UpdateSection
                        section={section}
                        resetPart={resetPart}
                        updateProjectContractInsertionForm={updateProjectContractInsertionForm}
                    />
                )
            }
        </div>
    )
}

export const CreateArticle = ({articles, resetPart, updateProjectContractInsertionForm}) => {
    const createArticleForm = useFormik({
        initialValues: {
            article: "",
        },
        validationSchema: createArticleSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addArticleForInsertion(articles, result.article);

            updateProjectContractInsertionForm.setFieldValue("articles", data);
            
            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center align-items-center gap-5 w-100 mb-5">
                <Form.Group>
                    <Form.Label
                        label="ماده"
                        required
                        size="sm"
                        color="dark"
                    />

                    <TextInput
                        id="article"
                        name="article"
                        value={createArticleForm.values.article}
                        onChange={(value) => createArticleForm.setFieldValue("article", value)}
                    />

                    <Form.Error
                        error={createArticleForm.errors.article}
                        touched={createArticleForm.touched.article}
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="light-danger"
                    onClick={() => createArticleForm.handleReset(createArticleForm)}
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    onClick={createArticleForm.handleSubmit}
                >
                    افزودن
                </Button>
            </div>
        </div>
    )
}

export const UpdateArticle = ({article, resetPart, updateProjectContractInsertionForm}) => {
    const createArticleForm = useFormik({
        initialValues: {
            article: article?.content? article.content :"",
        },
        validationSchema: createArticleSchema,
        onSubmit: async (result, {resetForm}) => {
            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].content`, result.article);

            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center align-items-center gap-5 w-100 mb-5">
                <Form.Group>
                    <Form.Label
                        label="ماده"
                        required
                        size="sm"
                        color="dark"
                    />

                    <TextInput
                        id="article"
                        name="article"
                        value={createArticleForm.values.article}
                        onChange={(value) => createArticleForm.setFieldValue("article", value)}
                    />

                    <Form.Error
                        error={createArticleForm.errors.article}
                        touched={createArticleForm.touched.article}
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="light-danger"
                    onClick={() => createArticleForm.handleReset(createArticleForm)}
                >
                    انصراف
                </Button>

                <Button
                    color="warning"
                    onClick={createArticleForm.handleSubmit}
                >
                    ویرایش
                </Button>
            </div>
        </div>
    )
}

export const CreateSection = ({article,  sections, resetPart, updateProjectContractInsertionForm}) => {
    const createSectionForm = useFormik({
        initialValues: {
            section: "",
        },
        validationSchema: createSectionSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addSectionForInsertion(sections, result.section, article.number);

            updateProjectContractInsertionForm.setFieldValue("sections", data);

            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center align-items-center gap-5 w-100 mb-5">
                <Form.Group>
                    <Form.Label
                        label="بند"
                        required
                        size="sm"
                        color="dark"
                    />

                    <Textarea
                        id="section"
                        name="section"
                        value={createSectionForm.values.section}
                        onChange={(value) => createSectionForm.setFieldValue("section", value)}
                    />

                    <Form.Error
                        error={createSectionForm.errors.section}
                        touched={createSectionForm.touched.section}
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="light-danger"
                    onClick={() => createSectionForm.handleReset(createSectionForm)}
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    onClick={createSectionForm.handleSubmit}
                >
                    افزودن
                </Button>
            </div>
        </div>
    )
}

export const UpdateSection = ({section, resetPart, updateProjectContractInsertionForm}) => {
    const createSectionForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            section: section?.content ? section.content : "",
        },
        validationSchema: createSectionSchema,
        onSubmit: async (result, {resetForm}) => {
            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.article_number === section.article_number && item.number === section.number)}].content`, result.section);

            // resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center align-items-center gap-5 w-100 mb-5">
                <Form.Group>
                    <Form.Label
                        label="بند"
                        required
                        size="sm"
                        color="dark"
                    />

                    <Textarea
                        id="section"
                        name="section"
                        value={createSectionForm.values.section}
                        onChange={(value) => createSectionForm.setFieldValue("section", value)}
                    />

                    <Form.Error
                        error={createSectionForm.errors.section}
                        touched={createSectionForm.touched.section}
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="light-danger"
                    onClick={() => createSectionForm.handleReset(createSectionForm)}
                >
                    انصراف
                </Button>

                <Button
                    color="warning"
                    onClick={createSectionForm.handleSubmit}
                >
                    ویرایش
                </Button>
            </div>
        </div>
    )
}
