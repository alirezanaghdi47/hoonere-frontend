// libraries
import Num2persian from 'num2persian';

// components
import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/update/Actions.tsx";

// hooks
import usePart from "@/hooks/usePart";

// modules
import Typography from "@/modules/Typography";
import NumberInput from "@/modules/NumberInput";

const CreateAmountFormData = ({article, section, updateProjectContractInsertionForm}) => {
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
                        value={updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.total_price}
                        onChange={(value) => {
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 1)}].payment_state`, 0);
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number + 1)}].payments`, []);
                            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مبلغ قرارداد ${value} ریال می باشد. `);
                            updateProjectContractInsertionForm.setFieldValue(`sections[${updateProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 1)}].content`, "");
                            updateProjectContractInsertionForm.setFieldValue(`articles[${updateProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].total_price`, value);
                        }}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    ریال معادل
                    &nbsp;
                    {Num2persian(updateProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.total_price)}
                    &nbsp;
                    ریال می باشد.
                </Typography>
            </div>
        </Section>
    )
}

export default CreateAmountFormData;