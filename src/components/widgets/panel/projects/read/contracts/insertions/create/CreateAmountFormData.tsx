// libraries
import Num2persian from 'num2persian';

// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";

// modules
import Typography from "@/modules/Typography";
import NumberInput from "@/modules/NumberInput";

const CreateAmountFormData = ({article, section, createProjectContractInsertionForm}) => {
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
                    مبلغ قرارداد :
                </Typography>

                <div className="w-150px">
                    <NumberInput
                        id="total_price"
                        name="total_price"
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                            numeralDecimalScale: 0
                        }}
                        value={createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.total_price}
                        onChange={(value) => {
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 1)}].payment_state`, 0);
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 1)}].payments`, []);
                            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مبلغ قرارداد ${value} ریال می باشد. `);
                            createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 1)}].content`, "");
                            createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].total_price`, value);
                        }}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    ریال معادل
                    &nbsp;
                    {Num2persian(createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.total_price)}
                    &nbsp;
                    ریال می باشد.
                </Typography>
            </div>
        </Section>
    )
}

export default CreateAmountFormData;