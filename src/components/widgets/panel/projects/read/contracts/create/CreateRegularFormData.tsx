// libraries
import {LuTrash} from "react-icons/lu";

// components
import {Note, Section} from "@/components/partials/panel/projects/read/contracts/Tools.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Checkbox from "@/modules/Checkbox.tsx";

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
                        <Checkbox
                            id={`${article.number}-${section.number}`}
                            name={`${article.number}-${section.number}`}
                            value={true}
                            checked={!createProjectContractForm.values.sections.find(item => item.number === section.number && item.article_number === section.article_number)?.isOff}
                            onChange={(value) => createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].isOff`, createProjectContractForm.values.sections.find(item => item.number === section.number && item.article_number === section.article_number)?.isOff ? false : true)}
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
                                createProjectContractForm.setFieldValue("sections", createProjectContractForm.values.sections.filter(item => item.number !== section.number || item.article_number !== section.article_number));
                                createProjectContractForm.setFieldValue("notes" , createProjectContractForm.values.notes.filter(item => item.section_number !== section.number || item.article_number !== section.article_number));
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
                                    <IconButton
                                        color="light-danger"
                                        size="sm"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="حذف تبصره"
                                        className='ms-auto'
                                        onClick={() => createProjectContractForm.setFieldValue("notes", createProjectContractForm.values.notes.filter(item => item.number !== note.number || item.section_number !== note.section_number || item.article_number !== note.article_number))}
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