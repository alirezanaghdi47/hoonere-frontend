// libraries
import {LuPen, LuTrash} from "react-icons/lu";

// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/update/Actions.tsx";

// hooks
import usePart from "@/hooks/usePart";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";

// utils
import {removeSectionForInsertion} from "@/utils/functions.ts";

const CreateRegularFormData = ({article, section, updateProjectContractInsertionForm}) => {
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
            updateProjectContractInsertionForm={updateProjectContractInsertionForm}
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
                            const data = removeSectionForInsertion(updateProjectContractInsertionForm.values.sections, article.number, section.number);

                            updateProjectContractInsertionForm.setFieldValue("sections", data);
                        }}
                    >
                        <LuTrash
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                </div>
            </div>
        </Section>
    )
}

export default CreateRegularFormData;