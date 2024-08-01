// libraries
import Loadable from "@loadable/component";
import {format} from "date-fns-jalali";
import {LuTrash} from "react-icons/lu";

// components
const CreatePaymentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/create/CreatePaymentModal.tsx"));

import {Section, Note} from "@/components/partials/panel/projects/read/contracts/create/Tools.tsx";
import Forbidden from "@/components/partials/panel/Forbidden.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import RadioBox from "@/modules/RadioBox.tsx";
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Button from "@/modules/Button.tsx";

// utils
import {cloneObject, removeNote} from "@/utils/functions.ts";

const PaymentActionBar = ({article, section, createProjectContractForm}) => {
    return (
        <ul className="hstack justify-content-start gap-5 p-0 m-0">
            <li className="d-flex justify-content-start align-items-center gap-2">
                <RadioBox
                    id="payment-status"
                    name="payment-status"
                    value="1"
                    checked={createProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "1"}
                    onChange={(value) => {
                        createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                        createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);
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
                    checked={createProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "2"}
                    onChange={(value) => {
                        createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس فاکتور های تایید شده توسط کارفرما پرداخت میگردد.");
                        createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);
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

const BlankPaymentWithPhasesCard = ({article, section, createProjectContractForm}) => {
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
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }
        </>
    )
}

const PaymentWithPhasesCard = ({article, payment, createProjectContractForm}) => {
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
                {Math.ceil(createProjectContractForm.values.articles.find(item => item.number === article.number - 1)?.total_price * (payment.percent / 100))}
                &nbsp;
                ریال در تاریخ
                &nbsp;
                {format(payment.date, "dd-MM-yyyy")}
                &nbsp;
                پرداخت گردد.
            </Typography>

            <IconButton
                color="light-danger"
                size="sm"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="حذف فاز"
                className='ms-auto'
                onClick={() => createProjectContractForm.setFieldValue(`articles[${createProjectContractForm.values.articles.findIndex(item => item.number === article.number)}].payments`, createProjectContractForm.values.articles[createProjectContractForm.values.articles.findIndex(item => item.number === article.number)].payments.filter(item => JSON.stringify(item) !== JSON.stringify(payment)))}
            >
                <LuTrash
                    size={20}
                    color="currentColor"
                />
            </IconButton>
        </li>
    )
}

const PaymentWithPhases = ({article, section, createProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            createProjectContractForm={createProjectContractForm}
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
                        createProjectContractForm={createProjectContractForm}
                    />

                    {
                        createProjectContractForm.values.articles.find(item => item.number === article.number)?.payments?.map((payment, i) =>
                            <PaymentWithPhasesCard
                                key={i}
                                article={article}
                                payment={payment}
                                createProjectContractForm={createProjectContractForm}
                            />
                        )
                    }
                </ul>
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

const PaymentWithBill = ({article, section, createProjectContractForm}) => {
    return (
        <Section
            article={article}
            section={section}
            createProjectContractForm={createProjectContractForm}
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

const CreatePaymentFormData = ({article, section, createProjectContractForm}) => {
    return (
        createProjectContractForm.values.articles.find(item => item.number === article.number - 2)?.start_date &&
        createProjectContractForm.values.articles.find(item => item.number === article.number - 2)?.end_date &&
        Math.min(createProjectContractForm.values.articles.find(item => item.number === article.number - 1).total_price) > 0
    ) ? (
        <>
            <PaymentActionBar
                article={article}
                section={section}
                createProjectContractForm={createProjectContractForm}
            />

            {
                createProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "1" && (
                    <PaymentWithPhases
                        article={article}
                        section={section}
                        createProjectContractForm={createProjectContractForm}
                    />
                )
            }

            {
                createProjectContractForm.values.articles.find(item => item.number === article.number)?.payment_state === "2" && (
                    <PaymentWithBill
                        article={article}
                        section={section}
                        createProjectContractForm={createProjectContractForm}
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