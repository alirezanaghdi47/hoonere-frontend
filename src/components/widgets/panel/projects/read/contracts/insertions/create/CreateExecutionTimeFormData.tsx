// libraries
import {useEffect} from "react";
import {format} from "date-fns-jalali";

// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";

// modules
import Typography from "@/modules/Typography";
import DatePicker from "@/modules/DatePicker";

const CreateExecutionTimeFormData = ({article, section, createProjectContractInsertionForm}) => {

    useEffect(() => {
        if (
            createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date &&
            createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date
        ) {
            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مدت اجرای موضوع قرارداد از تاریخ ${format(createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date , "dd-MM-yyyy")} لغایت ${format(createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date , "dd-MM-yyyy")} است. `);
        }
    }, [createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date , createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date]);

    return (
        <Section section={section}>
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
                        value={createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date}
                        onChange={(value) => {
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, 0);
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , "");
                            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, "");
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].start_date`, value);
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
                        minDate={createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date}
                        value={createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.end_date}
                        onChange={(value) => {
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payment_state`, 0);
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 2)}].payments`, []);
                            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 2)}].content`, "");
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].end_date`, value);
                        }}
                        disabled={!createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.start_date}
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