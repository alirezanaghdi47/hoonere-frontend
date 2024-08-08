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
import {createArticleSchema, createSectionSchema, createNoteSchema} from "@/utils/validations.ts";
import {addArticleForContract, addNoteForContract, addSectionForContract} from "@/utils/functions.ts";

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

export const BlankNote = ({changeCurrentPart}) => {
    return (
        <div
            className="w-95 ms-auto"
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
                    افزودن تبصره جدید
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
                        sections={createProjectContractForm.values.sections}
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

export const Section = ({children, article, section, createProjectContractForm}) => {
    const {part, currentPart, changePart, resetPart, changeCurrentPart} = usePart(null, "read");

    return (
        <div
            className={`d-flex flex-column justify-content-start items-center gap-5 w-100 ${section.isOff ? " opacity-25" : ""}`}>
            {children}

            {
                !section.isOff && currentPart === "read" && (
                    <BlankNote changeCurrentPart={changeCurrentPart}/>
                )
            }

            {
                !section.isOff && currentPart === "create" && (
                    <CreateNote
                        article={article}
                        section={section}
                        notes={createProjectContractForm.values.notes}
                        resetPart={resetPart}
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const Note = ({children , article , section , note , createProjectContractForm}) => {
    return (
        <div className="d-flex flex-column justify-content-start items-center gap-5 w-95 ms-auto">
            {children}
        </div>
    )
}

export const CreateArticle = ({articles , sections, resetPart, createProjectContractForm}) => {
    const createArticleForm = useFormik({
        initialValues: {
            article: "",
        },
        validationSchema: createArticleSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addArticleForContract(articles, sections, result.article);

            createProjectContractForm.setFieldValue("articles", data.articles);
            createProjectContractForm.setFieldValue("sections", data.sections);

            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length + 1} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

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
            const data = addSectionForContract(sections, result.section, article.number);

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

export const CreateNote = ({article , section , notes, resetPart, createProjectContractForm}) => {
    const createNoteForm = useFormik({
        initialValues: {
            note: "",
        },
        validationSchema: createNoteSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addNoteForContract(notes, result.note, article.number, section.number);

            createProjectContractForm.setFieldValue("notes", data);

            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="w-95 ms-auto">
            <div className="d-flex justify-content-center align-items-center gap-5 w-100 mb-5">
                <Form.Group>
                    <Form.Label
                        label="تبصره"
                        required
                        size="sm"
                        color="dark"
                    />

                    <Textarea
                        id="note"
                        name="note"
                        value={createNoteForm.values.note}
                        onChange={(value) => createNoteForm.setFieldValue("note", value)}
                    />

                    <Form.Error
                        error={createNoteForm.errors.note}
                        touched={createNoteForm.touched.note}
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="light-danger"
                    onClick={() => createNoteForm.handleReset(createNoteForm)}
                >
                    انصراف
                </Button>

                <Button
                    color="success"
                    onClick={createNoteForm.handleSubmit}
                >
                    افزودن
                </Button>
            </div>
        </div>
    )
}