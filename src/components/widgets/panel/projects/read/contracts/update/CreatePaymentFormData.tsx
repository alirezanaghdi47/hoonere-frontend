// libraries
import Loadable from "@loadable/component";
import {format} from "date-fns-jalali";
import {LuPen, LuTrash} from "react-icons/lu";

// components
const CreatePaymentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/update/CreatePaymentModal.tsx"));

import {Section, Note} from "@/components/partials/panel/projects/read/contracts/update/Tools.tsx";
import Forbidden from "@/components/partials/panel/Forbidden.tsx";

// hooks
import useModal from "@/hooks/useModal";
import usePart from "@/hooks/usePart";

// modules
import RadioBox from "@/modules/RadioBox";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Button from "@/modules/Button";

// utils
import {removeNote} from "@/utils/functions.ts";

const PaymentActionBar = ({article, section, updateProjectContractForm}) => {
    return (
        <ul className="hstack justify-content-start gap-5 p-0 m-0">
            <li className="d-flex justify-content-start align-items-center gap-2">
                <RadioBox
                    id="payment-status"
                    name="payment-status"
                    value="1"
                    checked={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "1"}
                    onChange={(value) => {
                        updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                        updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);
                    }}
                />

                <Typography
                    size="sm"
                    color="muted"
                    isBold
                >
                    پرداخت بر اساس فاز بندی
                </Typography>
            </li>

            <li className="d-flex justify-content-start align-items-center gap-2">
                <RadioBox
                    id="payment-status"
                    name="payment-status"
                    value="2"
                    checked={updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "2"}
                    onChange={(value) => {
                        updateProjectContractForm.setFieldValue(`sections[${updateProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس فاکتور های تایید شده توسط کارفرما پرداخت میگردد.");
                        updateProjectContractForm.setFieldValue(`articles[${updateProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);
                    }}
                />

                <Typography
                    size="sm"
                    color="muted"
                    isBold
                >
                    پرداخت بر اساس فاکتور
                </Typography>
            </li>
        </ul>
    )
}

const BlankPaymentWithPhasesCard = ({article, section, updateProjectContractForm}) => {
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <li className='d-flex flex-wrap justify-content-start align-items-center gap-5'>
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
            </li>

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
                                        const notes = removeNote(updateProjectContractForm.values.notes, note.number);
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
                    کلیه پرداخت ها به مجری بر اساس فاکتور های تایید شده توسط کارفرما پرداخت میگردد
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
                                        const notes = removeNote(updateProjectContractForm.values.notes, note.number);
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
                updateProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "2" && (
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