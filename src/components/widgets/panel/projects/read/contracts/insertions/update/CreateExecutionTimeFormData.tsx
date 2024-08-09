// libraries
import {useEffect} from "react";
import {format} from "date-fns-jalali";

// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/update/Actions.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";
import DatePicker from "@/modules/DatePicker";

const CreateExecutionTimeFormData = ({article, section, updateProjectContractInsertionForm}) => {
    const {
        part: sectionPart,
        currentPart: sectionCurrentPart,
        changePart: sectionChangePart,
        resetPart: sectionResetPart,
        changeCurrentPart: sectionChangeCurrentPart
    } = usePart(null, "read");

    useEffect(() => {
        if (
            updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date &&
            updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date
        ) {
            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مدت اجرای موضوع قرارداد از تاریخ ${format(updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date , "dd-MM-yyyy")} لغایت ${format(updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date , "dd-MM-yyyy")} است. `);
        }
    }, [updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date , updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date]);

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
                        value={updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date}
                        onChange={(value) => {
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, 0);
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , "");
                            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, "");
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].start_date`, value);
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
                        minDate={updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date}
                        value={updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date}
                        onChange={(value) => {
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, 0);
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, value);
                        }}
                        disabled={!updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    است .
                </Typography>
            </div>
        </Section>
    )
}

export default CreateExecutionTimeFormData;