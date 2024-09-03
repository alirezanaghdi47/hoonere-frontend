// libraries
import Loadable from "@loadable/component";
import {format} from "date-fns-jalali";
import {LuTrash} from "react-icons/lu";

// components
const CreatePaymentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/insertions/create/CreatePaymentModal.tsx"));

import {Section} from "@/components/widgets/panel/projects/read/contracts/insertions/create/Actions.tsx";
import Forbidden from "@/components/partials/panel/Forbidden.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import RadioBox from "@/modules/RadioBox";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Button from "@/modules/Button";

const PaymentActionBar = ({article, section, createProjectContractInsertionForm}) => {
    return (
        <ul className="hstack justify-content-start gap-5 p-0 m-0">
            <li className="d-flex justify-content-start align-items-center gap-2">
                <RadioBox
                    id="payment-status"
                    name="payment-status"
                    value="1"
                    checked={createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.payment_state === "1"}
                    onChange={(value) => {
                        createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "");
                        createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);
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
                    checked={createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.payment_state === "2"}
                    onChange={(value) => {
                        createProjectContractInsertionForm.setFieldValue(`sections[${createProjectContractInsertionForm.values.sections.findIndex(item => item.number === section.number && item.article_number === section.article_number)}].content`, "کلیه پرداخت ها به مجری بر اساس فاکتور های تایید شده توسط کارفرما پرداخت میگردد.");
                        createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].payment_state`, value);
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

const BlankPaymentWithPhasesCard = ({article, section, createProjectContractInsertionForm}) => {
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
                        createProjectContractInsertionForm={createProjectContractInsertionForm}
                    />
                )
            }
        </>
    )
}

const PaymentWithPhasesCard = ({article, payment, createProjectContractInsertionForm}) => {
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
                {Math.ceil(createProjectContractInsertionForm.values.articles.find(item => item.number === article.number - 1)?.total_price * (payment.percent / 100))}
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
                    onClick={() => createProjectContractInsertionForm.setFieldValue(`articles[${createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)}].payments`, createProjectContractInsertionForm.values.articles[createProjectContractInsertionForm.values.articles.findIndex(item => item.number === article.number)].payments.filter(item => JSON.stringify(item) !== JSON.stringify(payment)))}
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

const PaymentWithPhases = ({article, section, createProjectContractInsertionForm}) => {
    return (
        <Section section={section}>
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
                        createProjectContractInsertionForm={createProjectContractInsertionForm}
                    />

                    {
                        createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.payments?.map((payment, i) =>
                            <PaymentWithPhasesCard
                                key={i}
                                article={article}
                                payment={payment}
                                createProjectContractInsertionForm={createProjectContractInsertionForm}
                            />
                        )
                    }
                </ul>
            </div>
        </Section>
    )
}

const PaymentWithBill = ({article, section}) => {
    return (
        <Section section={section}>
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
        </Section>
    )
}

const CreatePaymentFormData = ({article, section, createProjectContractInsertionForm}) => {
    return (
        createProjectContractInsertionForm.values.articles.find(item => item.number === article.number - 2)?.start_date &&
        createProjectContractInsertionForm.values.articles.find(item => item.number === article.number - 2)?.end_date &&
        Math.min(createProjectContractInsertionForm.values.articles.find(item => item.number === article.number - 1).total_price) > 0
    ) ? (
        <>
            <PaymentActionBar
                article={article}
                section={section}
                createProjectContractInsertionForm={createProjectContractInsertionForm}
            />

            {
                createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.payment_state === "1" && (
                    <PaymentWithPhases
                        article={article}
                        section={section}
                        createProjectContractInsertionForm={createProjectContractInsertionForm}
                    />
                )
            }

            {
                createProjectContractInsertionForm.values.articles.find(item => item.number === article.number)?.payment_state === "2" && (
                    <PaymentWithBill
                        article={article}
                        section={section}
                    />
                )
            }
        </>
    ) : (
        <Forbidden
            title="ابتدا بند های از پیش تعریف شده را کامل نمایید"
            width="100%"
            height={300}
        />
    )
}

export default CreatePaymentFormData;