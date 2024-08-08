// libraries
import {useFormik} from "formik";
import {LuPlus} from "react-icons/lu";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Textarea from "@/modules/Textarea.tsx";
import Button from "@/modules/Button.tsx";
import TextInput from "@/modules/TextInput.tsx";

// utils
import {createArticleSchema, createSectionSchema} from "@/utils/validations.ts";
import {addArticleForInsertion, addSectionForInsertion} from "@/utils/functions.ts";

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

export const Contract = ({children, createProjectContractForm}) => {
    const {part, currentPart, changePart, resetPart, changeCurrentPart} = usePart(null, "read");

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
                        articles={createProjectContractForm.values.articles}
                        resetPart={resetPart}
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const Article = ({children, article, createProjectContractForm}) => {
    const {part, currentPart, changePart, resetPart, changeCurrentPart} = usePart(null, "read");

    return (
        <div className="d-flex flex-column justify-content-start items-center gap-5 w-100">
            {children}

            {
                currentPart === "read" && (
                    <BlankSection changeCurrentPart={changeCurrentPart}/>
                )
            }

            {
                currentPart === "create" && (
                    <CreateSection
                        article={article}
                        sections={createProjectContractForm.values.sections}
                        resetPart={resetPart}
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const Section = ({children, section}) => {
    return (
        <div className={`d-flex flex-column justify-content-start items-center gap-5 w-100 ${section.isOff ? " opacity-25" : ""}`}>
            {children}
        </div>
    )
}

export const CreateArticle = ({articles, resetPart, createProjectContractForm}) => {
    const createArticleForm = useFormik({
        initialValues: {
            article: "",
        },
        validationSchema: createArticleSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addArticleForInsertion(articles, result.article);

            createProjectContractForm.setFieldValue("articles", data);

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

export const CreateSection = ({article , sections, resetPart, createProjectContractForm}) => {
    const createSectionForm = useFormik({
        initialValues: {
            section: "",
        },
        validationSchema: createSectionSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addSectionForInsertion(sections, result.section, article.number);

            createProjectContractForm.setFieldValue("sections", data);

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
