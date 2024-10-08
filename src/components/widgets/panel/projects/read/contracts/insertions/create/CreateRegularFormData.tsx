// libraries
import {LuTrash} from "react-icons/lu";

// ?????
import {removeSectionForInsertion} from "@/components/widgets/panel/projects/read/contracts/insertions/Action.tsx";

// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";

const CreateRegularFormData = ({article, section, createProjectContractInsertionForm}) => {
    return (
        <Section section={section}>
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

                {
                    section.isAdded && (
                        <div className='ms-auto'>
                            <IconButton
                                color="light-danger"
                                size="sm"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="حذف بند"
                                onClick={() => {
                                    const data = removeSectionForInsertion(createProjectContractInsertionForm.values.sections, article.number, section.number);

                                    createProjectContractInsertionForm.setFieldValue("sections", data);
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
        </Section>
    )
}

export default CreateRegularFormData;