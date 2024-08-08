// libraries
import {LuTrash} from "react-icons/lu";

// components
import {Note, Section} from "@/components/widgets/panel/projects/read/contracts/create/Actions.tsx";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import CheckBox from "@/modules/CheckBox.tsx";

// utils
import {removeNoteForContract, removeSectionForContract, toggleSectionForContract} from "@/utils/functions.ts";

const CreateRegularFormData = ({article, section, createProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            createProjectContractForm={createProjectContractForm}
        >
            <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                {
                    !section.isAdded && (
                        <CheckBox
                            id={`${article.number}-${section.number}`}
                            name={`${article.number}-${section.number}`}
                            value={true}
                            checked={!createProjectContractForm.values.sections.find(item => item.number === section.number && item.article_number === section.article_number)?.isOff}
                            onChange={(value) => {
                                const data = toggleSectionForContract(createProjectContractForm.values.sections, createProjectContractForm.values.notes, article.number, section.number);

                                createProjectContractForm.setFieldValue("notes", data.notes);
                                createProjectContractForm.setFieldValue("sections", data.sections);
                            }}
                        />
                    )
                }

                {
                    !section.isOff && (
                        <Typography
                            size="sm"
                            color="muted"
                            isBold
                            className="w-30px"
                        >
                            {section.number}-{article.number}
                        </Typography>
                    )
                }

                <Typography
                    size="sm"
                    color="dark"
                    lineHeight="lg"
                >
                    {section.content}
                </Typography>

                {
                    section.isAdded && (
                        <div className='ms-auto'>
                            <IconButton
                                color="light-danger"
                                size="sm"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="حذف بند"
                                onClick={() => {
                                    const data = removeSectionForContract(createProjectContractForm.values.sections, createProjectContractForm.values.notes, article.number, section.number);

                                    createProjectContractForm.setFieldValue("notes", data.notes);
                                    createProjectContractForm.setFieldValue("sections", data.sections);
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

export default CreateRegularFormData;