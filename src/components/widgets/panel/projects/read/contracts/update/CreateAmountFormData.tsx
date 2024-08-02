// libraries
import Num2persian from 'num2persian';
import {LuTrash} from "react-icons/lu";

// components
import {Section , Note} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {removeNote} from "@/utils/functions.ts";

const CreateAmountFormData = ({article, section, updateProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            updateProjectContractForm={updateProjectContractForm}
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
                        value={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.total_price}
                        onChange={(value) => {
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 1)}].payment_state`, 0);
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 1)}].payments`, []);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مبلغ قرارداد ${value} ریال می باشد. `);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 1)}].content`, "");
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].total_price`, value);
                        }}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    ریال معادل
                    &nbsp;
                    {Num2persian(updateProjectContractForm.values.articles.find(item => item.number === article.number)?.total_price)}
                    &nbsp;
                    ریال می باشد.
                </Typography>
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

export default CreateAmountFormData;