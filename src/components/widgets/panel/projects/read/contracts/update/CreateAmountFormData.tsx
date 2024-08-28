// libraries
import Num2persian from 'num2persian';
import {LuPen, LuTrash} from "react-icons/lu";

// components
import {Section , Note} from "@/components/widgets/panel/projects/read/contracts/update/Actions.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";
import NumberInput from "@/modules/NumberInput";
import IconButton from "@/modules/IconButton";

// utils
import {removeNoteForContract} from "@/utils/functions.ts";

const CreateAmountFormData = ({article, section, updateProjectContractForm}) => {
    const {
        part: notePart,
        currentPart: noteCurrentPart,
        changePart: noteChangePart,
        resetPart: noteResetPart,
        changeCurrentPart: noteChangeCurrentPart
    } = usePart(null, "read");

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
            updateProjectContractForm={updateProjectContractForm}
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
                        value={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.total_price}
                        onChange={(value) => {
                            updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number + 1)}].payment_state`, "1");
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
                    ریال
                    &nbsp;
                    {updateProjectContractForm.values.articles.find(item => item.number === article.number + 1)?.payment_state === "3" && `دقیقه ای  `}
                    {updateProjectContractForm.values.articles.find(item => item.number === article.number + 1)?.payment_state === "4" && `روزانه  `}
                    {updateProjectContractForm.values.articles.find(item => item.number === article.number + 1)?.payment_state === "5" && `ماهانه  `}
                    می باشد.
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
                        part={notePart}
                        currentPart={noteCurrentPart}
                        resetPart={noteResetPart}
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

                            <div className='ms-auto'>
                                <IconButton
                                    color="light-warning"
                                    size="sm"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="ویرایش تبصره"
                                    onClick={() => {
                                        noteChangePart({
                                            article_number: note.article_number,
                                            section_number: note.section_number,
                                            number: note.number
                                        });
                                        noteChangeCurrentPart("update");
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
                                    data-tooltip-content="حذف تبصره"
                                    onClick={() => {
                                        const notes = removeNoteForContract(updateProjectContractForm.values.notes, note.number);
                                        updateProjectContractForm.setFieldValue("notes", notes);
                                    }}
                                >
                                    <LuTrash
                                        size={20}
                                        color="currentColor"
                                    />
                                </IconButton>
                            </div>
                        </div>
                    </Note>
                )
            }
        </Section>
    )
}

export default CreateAmountFormData;