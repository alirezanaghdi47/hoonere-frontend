// libraries
import Num2persian from 'num2persian';
import {LuTrash} from "react-icons/lu";

// components
import {Section , Note} from "@/components/partials/panel/projects/read/contracts/create/Tools.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {cloneObject, removeNote} from "@/utils/functions.ts";

const CreateAmountFormData = ({article, section, createProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            createProjectContractForm={createProjectContractForm}
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
                        value={createProjectContractForm.values.articles.find(item => item.number === article.number)?.total_price}
                        onChange={(value) => {
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number + 1)}].payment_state`, 0);
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number + 1)}].payments`, []);
                            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content` , ` مبلغ قرارداد ${value} ریال می باشد. `);
                            createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number + 1)}].content`, "");
                            createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].total_price`, value);
                        }}
                    />
                </div>

                <Typography
                    size="sm"
                    color="dark"
                >
                    ریال معادل
                    &nbsp;
                    {Num2persian(createProjectContractForm.values.articles.find(item => item.number === article.number)?.total_price)}
                    &nbsp;
                    ریال می باشد.
                </Typography>
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
                                        onClick={() => createProjectContractForm.setFieldValue("notes", removeNote(cloneObject(createProjectContractForm.values.notes) , note.number))}
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