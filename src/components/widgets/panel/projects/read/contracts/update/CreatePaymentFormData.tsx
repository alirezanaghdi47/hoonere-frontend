// libraries
import Loadable from "@loadable/component";
import {format} from "date-fns-jalali";
import {LuPen, LuTrash} from "react-icons/lu";

// components
const CreatePaymentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreatePaymentModal.tsx"));

import {Section, Note} from "@/components/widgets/panel/projects/read/contracts/update/Actions.tsx";
import Forbidden from "@/components/partials/panel/Forbidden.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";
import usePart from "@/hooks/usePart.tsx";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Button from "@/modules/Button";

// utils
import {removeNoteForContract} from "@/utils/functions.ts";
import SelectBox from "@/modules/SelectBox";

const options = [
    {id: 1, label: "پرداخت بر اساس فاز بندی", value: "1"},
    {id: 2, label: "پرداخت بر اساس فاکتور", value: "2"},
    {id: 3, label: "پرداخت دقیقه ای", value: "3"},
    {id: 4, label: "پرداخت روزانه", value: "4"},
    {id: 5, label: "پرداخت ماهانه", value: "5"}
];

const PaymentActionBar = ({article, section, updateProjectContractForm}) => {
    return (
        <div className="hstack justify-content-start gap-5 p-0 m-0">
            <div className='d-flex justify-content-start align-items-center gap-5 w-300px'>
                <Typography
                    size="sm"
                    color="dark"
                    className="w-150px"
                >
                    نحوه پرداخت :
                </Typography>

                <SelectBox
                    id="payment_state"
                    name="payment_state"
                    options={options}
                    value={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state}
                    onChange={(value) => {
                        updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);

                        if (value === "1") {
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number - 1)}].content`, ` مبلغ قرارداد ${updateProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price} ریال می باشد. `);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                        } else if (value === "2") {
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number - 1)}].content`, ` مبلغ قرارداد ${updateProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price} ریال می باشد. `);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس فاکتور های تایید شده توسط کارفرما پرداخت میگردد.");
                        } else if (value === "3") {
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number - 1)}].content`, ` مبلغ قرارداد ${updateProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price} ریال دقیقه ای می باشد. `);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس میزان حضور دقیقه ای در پروژه توسط کارفرما پرداخت میگردد.");
                        } else if (value === "4") {
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number - 1)}].content`, ` مبلغ قرارداد ${updateProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price} ریال روزانه می باشد. `);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس میزان حضور روزانه در پروژه توسط کارفرما پرداخت میگردد.");
                        } else if (value === "5") {
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number - 1)}].content`, ` مبلغ قرارداد ${updateProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price} ریال ماهانه می باشد. `);
                            updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس میزان حضور ماهانه در پروژه توسط کارفرما پرداخت میگردد.");
                        }
                    }}
                />
            </div>
        </div>
    )
}

const BlankPaymentWithPhasesCard = ({article, section, updateProjectContractForm}) => {
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <div className='d-flex flex-wrap justify-content-start align-items-center gap-5'>
                <Typography
                    size="sm"
                    color="dark"
                >
                    فاز بندی :
                </Typography>

                <Button
                    color="light-dark"
                    size="sm"
                    onClick={() => _handleShowModal({article: article, section: section})}
                >
                    انتخاب فاز
                </Button>
            </div>

            {
                modal.isOpen && (
                    <CreatePaymentModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        updateProjectContractForm={updateProjectContractForm}
                    />
                )
            }
        </>
    )
}

const PaymentWithPhasesCard = ({article, payment, updateProjectContractForm}) => {
    return (
        <li className='d-flex flex-wrap justify-content-start align-items-center gap-5 border border-dashed border-secondary rounded-2 p-5'>
            <Typography
                size="sm"
                color="dark"
            >
                {payment.percent}
                &nbsp;
                درصد مبلغ قرارداد معادل
                &nbsp;
                {Math.ceil(updateProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price * (payment.percent / 100))}
                &nbsp;
                ریال در تاریخ
                &nbsp;
                {format(payment.date, "dd-MM-yyyy")}
                &nbsp;
                پرداخت گردد.
            </Typography>

            <div className='ms-auto'>
                <IconButton
                    color="light-danger"
                    size="sm"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="حذف فاز"
                    onClick={() => updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payments`, updateProjectContractForm.values.articles[updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)].payments.filter(item => JSON.stringify(item) !== JSON.stringify(payment)))}
                >
                    <LuTrash
                        size={20}
                        color="currentColor"
                    />
                </IconButton>
            </div>
        </li>
    )
}

const PaymentWithPhases = ({
                               article,
                               section,
                               updateProjectContractForm,
                               sectionPart,
                               sectionCurrentPart,
                               sectionResetPart,
                               sectionChangeCurrentPart,
                               notePart,
                               noteCurrentPart,
                               noteResetPart,
                               noteChangePart,
                               noteChangeCurrentPart
                           }) => {
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
            <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                <Typography
                    size="sm"
                    color="muted"
                    isBold
                    className="w-30px"
                >
                    {section.number}-{article.number}
                </Typography>

                <ul className="vstack justify-content-center gap-5 p-0 m-0">
                    <BlankPaymentWithPhasesCard
                        article={article}
                        section={section}
                        updateProjectContractForm={updateProjectContractForm}
                    />

                    {
                        updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payments?.map((payment, i) =>
                            <PaymentWithPhasesCard
                                key={i}
                                article={article}
                                payment={payment}
                                updateProjectContractForm={updateProjectContractForm}
                            />
                        )
                    }
                </ul>
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

const PaymentWithBill = ({
                             article,
                             section,
                             updateProjectContractForm,
                             sectionPart,
                             sectionCurrentPart,
                             sectionResetPart,
                             sectionChangeCurrentPart,
                             notePart,
                             noteCurrentPart,
                             noteResetPart,
                             noteChangePart,
                             noteChangeCurrentPart
                         }) => {
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
                >
                    {updateProjectContractForm.values.sections.find(item => item.number === section.number && item.article_number === article.number)?.content}
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

const CreatePaymentFormData = ({article, section, updateProjectContractForm}) => {
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
        updateProjectContractForm.values.articles.find(item => item.number === article.number - 2)?.start_date &&
        updateProjectContractForm.values.articles.find(item => item.number === article.number - 2)?.end_date &&
        Math.min(updateProjectContractForm.values.articles.find(item => item.number === article.number - 1).total_price) > 0
    ) ? (
        <>
            <PaymentActionBar
                article={article}
                section={section}
                updateProjectContractForm={updateProjectContractForm}
            />

            {
                updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "1" && (
                    <PaymentWithPhases
                        article={article}
                        section={section}
                        updateProjectContractForm={updateProjectContractForm}
                        sectionPart={sectionPart}
                        sectionCurrentPart={sectionCurrentPart}
                        sectionResetPart={sectionResetPart}
                        sectionChangeCurrentPart={sectionChangeCurrentPart}
                        notePart={notePart}
                        noteCurrentPart={noteCurrentPart}
                        noteResetPart={noteResetPart}
                        noteChangePart={noteChangePart}
                        noteChangeCurrentPart={noteChangeCurrentPart}
                    />
                )
            }

            {
                updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state !== "1" && (
                    <PaymentWithBill
                        article={article}
                        section={section}
                        updateProjectContractForm={updateProjectContractForm}
                        sectionPart={sectionPart}
                        sectionCurrentPart={sectionCurrentPart}
                        sectionResetPart={sectionResetPart}
                        sectionChangeCurrentPart={sectionChangeCurrentPart}
                        notePart={notePart}
                        noteCurrentPart={noteCurrentPart}
                        noteResetPart={noteResetPart}
                        noteChangePart={noteChangePart}
                        noteChangeCurrentPart={noteChangeCurrentPart}
                    />
                )
            }
        </>
    ) : (
        <Forbidden
            title="ابتدا بند های از پیش تعریف شده را کامل نمایید"
            width="100%"
            height={200}
        />
    )
}

export default CreatePaymentFormData;