// libraries
import {useEffect} from "react";
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

//utils
import {createArticleSchema, createSectionSchema, createNoteSchema} from "@/utils/validations.ts";
import {addArticle, addNote, addSection} from "@/utils/functions.ts";

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

export const Contract = ({children, updateProjectContractForm}) => {
    const {
        part: part2,
        currentPart: currentPart2,
        changePart,
        resetPart: resetPart2,
        changeCurrentPart: changeCurrentPart2
    } = usePart(null, "read");

    useEffect(() => {
        changePart({
            articlesLength: updateProjectContractForm.values.articles.length,
            sections: updateProjectContractForm.values.sections
        });
    }, [updateProjectContractForm.values.articles]);

    return (
        <div className="d-flex flex-column justify-content-start items-center gap-5 w-100">
            {children}

            {
                currentPart2 === "read" && (
                    <BlankArticle changeCurrentPart={changeCurrentPart2}/>
                )
            }

            {
                currentPart2 === "create" && (
                    <CreateArticle
                        part={part2}
                        resetPart={resetPart2}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const Article = ({children, article, part, currentPart, resetPart , changeCurrentPart, updateProjectContractForm}) => {
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
                        updateProjectContractForm={updateProjectContractForm}
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
                        resetPart={resetPart}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const Section = ({children, article, section, part, currentPart, resetPart , changeCurrentPart, updateProjectContractForm}) => {
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
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }

            {
                currentPart === "read" && (
                    <BlankNote changeCurrentPart={changeCurrentPart}/>
                )
            }

            {
                currentPart === "create" && (
                    <CreateNote
                        article={article}
                        section={section}
                        resetPart={resetPart}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const Note = ({children, article, section, note, part, currentPart, resetPart, updateProjectContractForm}) => {
    return (
        <div className="d-flex flex-column justify-content-start items-center gap-5 w-95 ms-auto">
            {
                currentPart !== "update" && (
                    children
                )
            }

            {
                currentPart === "update" && article.number === part?.article_number && section.number === part?.section_number && note.number === part?.number && (
                    <UpdateNote
                        note={note}
                        resetPart={resetPart}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </div>
    )
}

export const CreateArticle = ({part, resetPart, updateProjectContractForm}) => {
    const createArticleForm = useFormik({
        initialValues: {
            article: "",
        },
        validationSchema: createArticleSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = addArticle(updateProjectContractForm.values.articles, part?.sections, result.article);

            updateProjectContractForm.setFieldValue("articles", data.articles);
            updateProjectContractForm.setFieldValue("sections", data.sections);

            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${updateProjectContractForm.values.articles.length + 1} ماده و ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length} نسخه تنظیم گردیده و هر کدام از ${updateProjectContractForm.values.articles[0].employers.length + updateProjectContractForm.values.articles[0].contractors.length} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

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

export const UpdateArticle = ({article, resetPart, updateProjectContractForm}) => {
    const createArticleForm = useFormik({
        initialValues: {
            article: article?.content? article.content :"",
        },
        validationSchema: createArticleSchema,
        onSubmit: async (result, {resetForm}) => {
            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].content`, result.article);

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

export const CreateSection = ({article, resetPart, updateProjectContractForm}) => {
    const createSectionForm = useFormik({
        initialValues: {
            section: "",
        },
        validationSchema: createSectionSchema,
        onSubmit: async (result, {resetForm}) => {
            const sections = addSection(updateProjectContractForm.values.sections, result.section, article?.number);

            updateProjectContractForm.setFieldValue("sections", sections);

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

export const UpdateSection = ({section, resetPart, updateProjectContractForm}) => {
    const createSectionForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            section: section?.content ? section.content : "",
        },
        validationSchema: createSectionSchema,
        onSubmit: async (result, {resetForm}) => {
            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.article_number === section.article_number && item.section_number === section.number)}].content`, result.section);

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
                    color="warning"
                    onClick={createSectionForm.handleSubmit}
                >
                    ویرایش
                </Button>
            </div>
        </div>
    )
}

export const CreateNote = ({article , section, resetPart, updateProjectContractForm}) => {
    const createNoteForm = useFormik({
        initialValues: {
            note: "",
        },
        validationSchema: createNoteSchema,
        onSubmit: async (result, {resetForm}) => {
            const notes = addNote(updateProjectContractForm.values.notes, result.note, article?.number, section?.number);

            updateProjectContractForm.setFieldValue("notes", notes);

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

export const UpdateNote = ({note, resetPart, updateProjectContractForm}) => {
    const updateNoteForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            note: note?.content ? note.content : "",
        },
        validationSchema: createNoteSchema,
        onSubmit: async (result, {resetForm}) => {
            updateProjectContractForm.setFieldValue(`notes[${updateProjectContractForm.values.notes.findIndex(item => item.article_number === note.article_number && item.section_number === note.section_number && item.number === note.number)}].content`, result.note);

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
                        value={updateNoteForm.values.note}
                        onChange={(value) => updateNoteForm.setFieldValue("note", value)}
                    />

                    <Form.Error
                        error={updateNoteForm.errors.note}
                        touched={updateNoteForm.touched.note}
                    />
                </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-5 w-100">
                <Button
                    color="light-danger"
                    onClick={() => updateNoteForm.handleReset(updateNoteForm)}
                >
                    انصراف
                </Button>

                <Button
                    color="warning"
                    onClick={updateNoteForm.handleSubmit}
                >
                    ویرایش
                </Button>
            </div>
        </div>
    )
}
