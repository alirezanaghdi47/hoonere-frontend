// libraries
import {LuPen, LuTrash} from "react-icons/lu";

// ?????
import {removeNoteForContract , removeSectionForContract , toggleSectionForContract} from "@/components/widgets/panel/projects/read/contracts/Action.tsx";

// components
import {Note, Section} from "@/components/widgets/panel/projects/read/contracts/update/Actions.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";

const CreateRegularFormData = ({article, section, updateProjectContractForm}) => {
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
            <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
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
                    lineHeight="lg"
                >
                    {section.content}
                </Typography>

                <div className='ms-auto'>
                    <IconButton
                        color="light-warning"
                        size="sm"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="ویرایش بند"
                        onClick={() => {
                            sectionChangePart({
                                article_number: section.article_number,
                                number: section.number
                            });
                            sectionChangeCurrentPart("update");
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
                        data-tooltip-content="حذف بند"
                        onClick={() => {
                            const data = removeSectionForContract(updateProjectContractForm.values.sections, updateProjectContractForm.values.notes, article.number, section.number);

                            updateProjectContractForm.setFieldValue("notes", data.notes);
                            updateProjectContractForm.setFieldValue("sections", data.sections);
                        }}
                    >
                        <LuTrash
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                </div>
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
                                    onClick={() => {
                                        const notes = removeNoteForContract(updateProjectContractForm.values.notes, note.number);
                                        updateProjectContractForm.setFieldValue("notes", notes);
                                    }}
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

export default CreateRegularFormData;