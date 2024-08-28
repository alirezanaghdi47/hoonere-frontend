// libraries
import {useEffect} from "react";
import {format} from "date-fns-jalali";
import {LuTrash} from "react-icons/lu";

// components
import {Section, Note} from "@/components/widgets/panel/projects/read/contracts/create/Actions.tsx";

// modules
import Typography from "@/modules/Typography";
import DatePicker from "@/modules/DatePicker";
import IconButton from "@/modules/IconButton";

// utils
import {removeNoteForContract} from "@/utils/functions.ts";

const CreateExecutionTimeFormData = ({article, section, createProjectContractForm}) => {

    useEffect(() => {
        if (
            createProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date &&
            createProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date
        ) {
            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مدت اجرای موضوع قرارداد از تاریخ ${format(createProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date , "dd-MM-yyyy")} لغایت ${format(createProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date , "dd-MM-yyyy")} است. `);
        }
    }, [createProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date , createProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date]);

    return (
        <Section
            article={article}
            section={section}
            createProjectContractForm={createProjectContractForm}
        >
            <div className='d-flex flex-wrap justify-content-start align-items-center gap-5 w-100'>
                <Typography
                    size="sm"
                    color="muted"
                    isBold
                    className="w-30px"
                >
                    {section.number}-{article.number}
                </Typography>

                <Typography
                    size="sm"
                    color="dark"
                >
                    مدت اجرای موضوع قرارداد از تاریخ :
                </Typography>

                <div className="w-100px">
                    <DatePicker
                        id="start_date"
                        name="start_date"
                        value={createProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date}
                        onChange={(value) => {
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, "1");
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , "");
                            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, "");
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].start_date`, value);
                        }}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    لغایت
                </Typography>

                <div className="w-100px">
                    <DatePicker
                        id="end_date"
                        name="end_date"
                        minDate={createProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date}
                        value={createProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date}
                        onChange={(value) => {
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, "1");
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, value);
                        }}
                        disabled={!createProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    است .
                </Typography>
            </div>

            {
                createProjectContractForm.values.notes.filter(note => note.section_number === section.number && note.article_number === section.article_number).map(note =>
                    <Note
                        key={`${article.number}-${section.number}-${note.number}`}
                        article={article}
                        section={section}
                        note={note}
                        createProjectContractForm={createProjectContractForm}
                    >
                        <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                            <Typography
                                size="xs"
                                color="muted"
                                isBold
                                className="w-60px"
                            >
                                تبصره
                                &nbsp;
                                {note.number}
                            </Typography>

                            <Typography
                                size="xs"
                                color="dark"
                                lineHeight="lg"
                            >
                                {note.content}
                            </Typography>

                            {
                                note.isAdded && (
                                    <div className='ms-auto'>
                                        <IconButton
                                            color="light-danger"
                                            size="sm"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="حذف تبصره"
                                            onClick={() => {
                                                const notes = removeNoteForContract(createProjectContractForm.values.notes , note.number);
                                                createProjectContractForm.setFieldValue("notes", notes);
                                            }}
                                        >
                                            <LuTrash
                                                size={20}
                                                color="currentColor"
                                            />
                                        </IconButton>
                                    </div>
                                )
                            }
                        </div>
                    </Note>
                )
            }
        </Section>
    )
}

export default CreateExecutionTimeFormData;