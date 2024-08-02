// libraries
import {useEffect} from "react";
import {format} from "date-fns-jalali";
import {LuPen, LuTrash} from "react-icons/lu";

// components
import {Section, Note} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import DatePicker from "@/modules/DatePicker.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {removeNote} from "@/utils/functions.ts";

const CreateExecutionTimeFormData = ({article, section, updateProjectContractForm}) => {
    const {
        part: notePart,
        currentPart: noteCurrentPart,
        changePart: noteChangePart,
        resetPart: noteResetPart,
        changeCurrentPart: noteChangeCurrentPart
    } = usePart(null, "read");

    const {
        part: sectionPart,
        currentPart: sectionCurrentPart,
        changePart: sectionChangePart,
        resetPart: sectionResetPart,
        changeCurrentPart: sectionChangeCurrentPart
    } = usePart(null, "read");

    useEffect(() => {
        if (
            updateProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date &&
            updateProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date
        ) {
            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مدت اجرای موضوع قرارداد از تاریخ ${format(updateProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date , "dd-MM-yyyy")} لغایت ${format(updateProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date , "dd-MM-yyyy")} است. `);
        }
    }, [updateProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date , updateProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date]);

    return (
        <Section
            article={article}
            section={section}
            updateProjectContractForm={updateProjectContractForm}
            part={sectionPart}
            currentPart={sectionCurrentPart}
            resetPart={sectionResetPart}
            changeCurrentPart={sectionChangeCurrentPart}
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
                        value={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date}
                        onChange={(value) => {
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, 0);
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , "");
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, "");
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].start_date`, value);
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
                        minDate={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date}
                        value={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.end_date}
                        onChange={(value) => {
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, 0);
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, value);
                        }}
                        disabled={!updateProjectContractForm.values.articles.find(item => item.number === article.number)?.start_date}
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
                updateProjectContractForm.values.notes.filter(note => note.section_number === section.number && note.article_number === section.article_number).map(note =>
                    <Note
                        key={`${article.number}-${section.number}-${note.number}`}
                        article={article}
                        section={section}
                        note={note}
                        updateProjectContractForm={updateProjectContractForm}
                        part={notePart}
                        currentPart={noteCurrentPart}
                        resetPart={noteResetPart}
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

                            <div className='ms-auto'>
                                <IconButton
                                    color="light-warning"
                                    size="sm"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="ویرایش تبصره"
                                    onClick={() => {
                                        noteChangePart({
                                            article_number: note.article_number,
                                            section_number: note.section_number,
                                            number: note.number
                                        });
                                        noteChangeCurrentPart("update");
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
                                    data-tooltip-content="حذف تبصره"
                                    onClick={() => updateProjectContractForm.setFieldValue("notes", removeNote(updateProjectContractForm.values.notes, note.number))}
                                >
                                    <LuTrash
                                        size={20}
                                        color="currentColor"
                                    />
                                </IconButton>
                            </div>
                        </div>
                    </Note>
                )
            }
        </Section>
    )
}

export default CreateExecutionTimeFormData;