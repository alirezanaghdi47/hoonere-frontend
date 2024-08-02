// libraries
import {LuTrash} from "react-icons/lu";

// components
import {Note, Section} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Checkbox from "@/modules/Checkbox.tsx";

// utils
import {removeNote, removeSection, toggleSection} from "@/utils/functions.ts";

const CreateRegularFormData = ({article, section, updateProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            updateProjectContractForm={updateProjectContractForm}
        >
            <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                {
                    !section.isAdded && (
                        <Checkbox
                            id={`${article.number}-${section.number}`}
                            name={`${article.number}-${section.number}`}
                            value={true}
                            checked={!updateProjectContractForm.values.sections.find(item => item.number === section.number && item.article_number === section.article_number)?.isOff}
                            onChange={(value) => {
                                const result = toggleSection(updateProjectContractForm.values.sections, updateProjectContractForm.values.notes, article.number, section.number);

                                updateProjectContractForm.setFieldValue("notes", result.notes);
                                updateProjectContractForm.setFieldValue("sections", result.sections);
                            }}
                        />
                    )
                }

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

                {
                    section.isAdded && (
                        <IconButton
                            color="light-danger"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="حذف بند"
                            className='ms-auto'
                            onClick={() => {
                                const result = removeSection(updateProjectContractForm.values.sections, updateProjectContractForm.values.notes , article.number, section.number);

                                updateProjectContractForm.setFieldValue("notes", result.notes);
                                updateProjectContractForm.setFieldValue("sections", result.sections);
                            }}
                        >
                            <LuTrash
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    )
                }
            </div>

            {
                updateProjectContractForm.values.notes.filter(note => note.section_number === section.number && note.article_number === section.article_number).map(note =>
                    <Note
                        key={`${article.number}-${section.number}-${note.number}`}
                        article={article}
                        section={section}
                        note={note}
                        updateProjectContractForm={updateProjectContractForm}
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
                                    <IconButton
                                        color="light-danger"
                                        size="sm"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="حذف تبصره"
                                        className='ms-auto'
                                        onClick={() => {
                                            const notes = removeNote(updateProjectContractForm.values.notes , note.number);
                                            updateProjectContractForm.setFieldValue("notes", notes);
                                        }}
                                    >
                                        <LuTrash
                                            size={20}
                                            color="currentColor"
                                        />
                                    </IconButton>
                                )
                            }
                        </div>
                    </Note>
                )
            }
        </Section>
    )
}

export default CreateRegularFormData;