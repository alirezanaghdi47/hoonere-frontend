// libraries
import {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loadable from "@loadable/component";
import {useMutation} from "@tanstack/react-query";
import {useReactToPrint} from 'react-to-print';
import {format} from "date-fns-jalali";
import {LuDownload, LuFileSignature, LuMessageCircle, LuX} from "react-icons/lu";

// components
const SignatureModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/invited/SignatureModal.tsx"));
const SendCommentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/invited/SendCommentModal.tsx"));

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography";
import Modal from "@/modules/Modal";
import IconButton from "@/modules/IconButton";

// services
import {sendProjectContractSignatureConfirmCodeService , ISendProjectContractSignatureConfirmCode} from "@/services/projectContractService.ts";

const Contract = ({children}) => {
    return (
        <ul className='vstack list-unstyled m-0 p-0'>
            {children}
        </ul>
    )
}

const Article = ({children, article}) => {
    return (
        <li className="mb-2">
            <div className='d-flex justify-content-start align-items-center gap-2 w-100'>
                <Typography
                    size="md"
                    color="dark"
                    isBold
                >
                    ماده
                    &nbsp;
                    {article.number}
                    &nbsp;
                    :
                    &nbsp;
                    {article.content}
                </Typography>
            </div>

            {children}
        </li>
    )
}

const Section = ({children, section}) => {
    return (
        <li className="mb-2">
            <div className='d-flex justify-content-start align-items-center gap-2 w-100'>
                <Typography
                    size="sm"
                    color="dark"
                    lineHeight="lg"
                >
                    بند
                    &nbsp;
                    {section.number}
                    &nbsp;
                    :
                    &nbsp;
                    {section.content}
                </Typography>
            </div>

            {children}
        </li>
    )
}

const Note = ({note}) => {
    return (
        <li className="mt-2">
            <div className='d-flex justify-content-start align-items-center gap-2 w-100'>
                <Typography
                    size="xs"
                    color="dark"
                    lineHeight="lg"
                >
                    تبصره
                    &nbsp;
                    {note.number}
                    &nbsp;
                    :
                    &nbsp;
                    {note.content}
                </Typography>
            </div>
        </li>
    )
}

const EmployersSection = ({section, employers, typeId}) => {
    return (
        <Section section={section}>
            <ul className="vstack list-unstyled m-0 p-0 ps-5">
                {
                    employers.map(member => {
                        // رسمی و حقیقی
                        if (typeId === "1" && member.user_info.user_type === "1") {
                            return (
                                <li
                                    key={member?.user_info?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {(member?.user_info?.first_name && member?.user_info?.last_name) ? member?.user_info?.first_name + " " + member?.user_info?.last_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به کد ملی :
                                        &nbsp;
                                        {member?.user_info?.national_code ? member?.user_info?.national_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.user_info?.address ? member?.user_info?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.user_info?.postal_code ? member?.user_info?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.user_info?.mobile ? member?.user_info?.mobile : "نا معلوم"}
                                    </Typography>
                                </li>
                            )
                        }

                        // رسمی و حقوقی
                        if (typeId === "1" && member.user_info.user_type === "2") {
                            return (
                                <li
                                    key={member?.user_info?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {member?.user_info?.company_name ? member?.user_info?.company_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به شماره ثبت :
                                        &nbsp;
                                        {member?.user_info?.register_code ? member?.user_info?.register_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شناسه ملی :
                                        &nbsp;
                                        {member?.user_info?.economic_code ? member?.user_info?.economic_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.user_info?.address ? member?.user_info?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.user_info?.postal_code ? member?.user_info?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.user_info?.telephone ? member?.user_info?.telephone : "نا معلوم"}
                                    </Typography>

                                    {
                                        member?.user_info?.representatives.length !== 0 && (
                                            <div
                                                className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                                                <Typography
                                                    size="sm"
                                                    color="dark"
                                                >
                                                    به نمایندگی :
                                                </Typography>

                                                <ul className="vstack justify-content-start gap-5 p-0 m-0">
                                                    {
                                                        member?.user_info?.representatives.map((representative, index) =>
                                                            <li
                                                                key={representative.id}
                                                                className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-2"
                                                            >
                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {index + 1} .
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.full_name}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.national_code}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.post}
                                                                </Typography>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        }

                        // غیر رسمی و حقیقی
                        if (typeId === "2" && member.user_type === "1") {
                            return (
                                <li
                                    key={member?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {(member?.first_name && member?.last_name) ? member?.first_name + " " + member?.last_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به کد ملی :
                                        &nbsp;
                                        {member?.national_code ? member?.national_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.address ? member?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.postal_code ? member?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.mobile ? member?.mobile : "نا معلوم"}
                                    </Typography>
                                </li>
                            )
                        }

                        // غیر رسمی و حقوقی
                        if (typeId === "2" && member.user_type === "2") {
                            return (
                                <li
                                    key={member?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {member?.company_name ? member?.company_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به شماره ثبت :
                                        &nbsp;
                                        {member?.register_code ? member?.register_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شناسه ملی :
                                        &nbsp;
                                        {member?.economic_code ? member?.economic_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.address ? member?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.postal_code ? member?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.telephone ? member?.telephone : "نا معلوم"}
                                    </Typography>

                                    {
                                        member?.representatives.length !== 0 && (
                                            <div
                                                className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                                                <Typography
                                                    size="sm"
                                                    color="dark"
                                                >
                                                    به نمایندگی :
                                                </Typography>

                                                <ul className="vstack justify-content-start gap-5 p-0 m-0">
                                                    {
                                                        member?.representatives.map((representative, index) =>
                                                            <li
                                                                key={representative.id}
                                                                className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-2"
                                                            >
                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {index + 1} .
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.full_name}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.national_code}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.post}
                                                                </Typography>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        }
                    })
                }
            </ul>

            <ul className="vstack list-unstyled m-0 p-0 ps-10">
                {
                    section?.notes?.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                        />
                    )
                }
            </ul>
        </Section>
    )
}

const ContractorsSection = ({section, contractors, typeId}) => {
    return (
        <Section section={section}>
            <ul className="vstack list-unstyled m-0 p-0 ps-5">
                {
                    contractors.map(member => {
                        // رسمی و حقیقی
                        if (typeId === "1" && member.user_info.user_type === "1") {
                            return (
                                <li
                                    key={member?.user_info?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {(member?.user_info?.first_name && member?.user_info?.last_name) ? member?.user_info?.first_name + " " + member?.user_info?.last_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به شماره ملی :
                                        &nbsp;
                                        {member?.user_info?.national_code ? member?.user_info?.national_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.user_info?.address ? member?.user_info?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.user_info?.postal_code ? member?.user_info?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.user_info?.mobile ? member?.user_info?.mobile : "نا معلوم"}
                                    </Typography>
                                </li>
                            )
                        }

                        // رسمی و حقوقی
                        if (typeId === "1" && member.user_info.user_type === "2") {
                            return (
                                <li
                                    key={member?.user_info?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {member?.user_info?.company_name ? member?.user_info?.company_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به شماره ثبت :
                                        &nbsp;
                                        {member?.user_info?.register_code ? member?.user_info?.register_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شناسه ملی :
                                        &nbsp;
                                        {member?.user_info?.economic_code ? member?.user_info?.economic_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.user_info?.address ? member?.user_info?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.user_info?.postal_code ? member?.user_info?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.user_info?.telephone ? member?.user_info?.telephone : "نا معلوم"}
                                    </Typography>

                                    {
                                        member?.user_info?.representatives.length > 0 && (
                                            <div
                                                className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                                                <Typography
                                                    size="sm"
                                                    color="dark"
                                                >
                                                    به نمایندگی :
                                                </Typography>

                                                <ul className="vstack justify-content-start gap-5 p-0 m-0">
                                                    {
                                                        member?.user_info?.representatives.map((representative, index) =>
                                                            <li
                                                                key={representative.id}
                                                                className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-2"
                                                            >
                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {index + 1} .
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.full_name}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.national_code}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.post}
                                                                </Typography>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        }

                        // غیر رسمی و حقیقی
                        if (typeId === "2" && member.user_type === "1") {
                            return (
                                <li
                                    key={member?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {(member?.first_name && member?.last_name) ? member?.first_name + " " + member?.last_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به شماره ملی :
                                        &nbsp;
                                        {member?.national_code ? member?.national_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.address ? member?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.postal_code ? member?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.mobile ? member?.mobile : "نا معلوم"}
                                    </Typography>
                                </li>
                            )
                        }

                        // غیر رسمی و حقوقی
                        if (typeId === "2" && member.user_type === "2") {
                            return (
                                <li
                                    key={member?.id}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {member?.company_name ? member?.company_name : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        به شماره ثبت :
                                        &nbsp;
                                        {member?.register_code ? member?.register_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شناسه ملی :
                                        &nbsp;
                                        {member?.economic_code ? member?.economic_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        نشانی :
                                        &nbsp;
                                        {member?.address ? member?.address : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        کدپستی :
                                        &nbsp;
                                        {member?.postal_code ? member?.postal_code : "نا معلوم"}
                                    </Typography>

                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        شماره تماس :
                                        &nbsp;
                                        {member?.telephone ? member?.telephone : "نا معلوم"}
                                    </Typography>

                                    {
                                        member?.representatives.length !== 0 && (
                                            <div
                                                className="d-flex flex-wrap justify-content-start align-items-start gap-2 w-100">

                                                <Typography
                                                    size="sm"
                                                    color="dark"
                                                >
                                                    به نمایندگی :
                                                </Typography>

                                                <ul className="vstack justify-content-start gap-5 p-0 m-0">
                                                    {
                                                        member?.representatives.map((representative, index) =>
                                                            <li
                                                                key={representative.id}
                                                                className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-2"
                                                            >
                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {index + 1} .
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.full_name}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.national_code}
                                                                </Typography>

                                                                <Typography
                                                                    size="sm"
                                                                    color="dark"
                                                                >
                                                                    {representative.post}
                                                                </Typography>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        }
                    })
                }
            </ul>

            <ul className="vstack list-unstyled m-0 p-0 ps-10">
                {
                    section?.notes?.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                        />
                    )
                }
            </ul>
        </Section>
    )
}

const PaymentSection = ({section, totalPrice, payments, paymentState}) => {
    return (
        <Section section={section}>
            {
                paymentState === "1" && (
                    <ul className="vstack list-unstyled m-0 p-0 ps-10">
                        {
                            payments?.map((payment, i) =>
                                <li
                                    key={i}
                                    className='d-flex flex-wrap justify-content-start align-items-center gap-2 mt-2'
                                >
                                    <Typography
                                        size="sm"
                                        color="dark"
                                    >
                                        {payment.percent}
                                        &nbsp;
                                        درصد مبلغ قرارداد معادل
                                        &nbsp;
                                        {Math.ceil(Number(totalPrice) * (Number(payment.percent) / 100)).toLocaleString()}
                                        &nbsp;
                                        ریال در تاریخ
                                        &nbsp;
                                        {format(payment.date, "dd-MM-yyyy")}
                                        &nbsp;
                                        پرداخت گردد.
                                    </Typography>
                                </li>
                            )
                        }
                    </ul>
                )
            }

            <ul className="vstack list-unstyled m-0 p-0 ps-10">
                {
                    section?.notes?.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                        />
                    )
                }
            </ul>
        </Section>
    )
}

const RegularSection = ({section}) => {
    return (
        <Section section={section}>
            <ul className="vstack list-unstyled m-0 p-0 ps-10">
                {
                    section?.notes?.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                        />
                    )
                }
            </ul>
        </Section>
    )
}

const DataModal = ({contract}) => {
    const params = useParams();
    const navigate = useNavigate();
    const printRef = useRef(null);
    const {
        modal: signatureModal,
        _handleShowModal: _handleShowSignatureModal,
        _handleHideModal: _handleHideSignatureModal
    } = useModal();
    const {
        modal: sendCommentModal,
        _handleShowModal: _handleShowSendCommentModal,
        _handleHideModal: _handleHideSendCommentModal
    } = useModal();

    const _handlePrint = useReactToPrint({
        documentTitle: `contract`,
        content: () => printRef.current,
    });

    const sendProjectContractSignatureConfirmCodeAction = useMutation({
        mutationFn: (data: ISendProjectContractSignatureConfirmCode) => sendProjectContractSignatureConfirmCodeService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                _handleShowSignatureModal(contract);
            }
        }
    });

    return (
        <>
            <style>
                {`
                    @media print {
                      @page {
                        size: A4 portrait;
                      }
                    }
                `}
            </style>

            <Modal
                isOpen={true}
                onClose={() => navigate(-1)}
                position='center'
                width="xl"
            >
                <Modal.Header>
                    <Typography
                        variant='h3'
                        size="lg"
                        color="dark"
                        isBold
                    >
                        جزییات قرارداد دعوت شده
                    </Typography>

                    <div className='d-flex justify-content-end align-items-center gap-5'>
                        {
                            contract?.status_id === "2" && (
                                <IconButton
                                    size="sm"
                                    color="light-success"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="امضای دیجیتال"
                                    onClick={() => sendProjectContractSignatureConfirmCodeAction.mutate({
                                        project_id: params.id,
                                        contract_id: params.subId
                                    })}
                                >
                                    <LuFileSignature size={20}/>
                                </IconButton>
                            )
                        }

                        <IconButton
                            size="sm"
                            color="light-info"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="کامنت گذاری"
                            onClick={() => _handleShowSendCommentModal(contract)}
                        >
                            <LuMessageCircle size={20}/>
                        </IconButton>

                        <IconButton
                            size="sm"
                            color="light-dark"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="دانلود قرارداد"
                            onClick={_handlePrint}
                        >
                            <LuDownload size={20}/>
                        </IconButton>

                        <IconButton
                            size="sm"
                            color="light-danger"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="خروج"
                            onClick={() => navigate(-1)}
                        >
                            <LuX size={20}/>
                        </IconButton>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div
                        ref={printRef}
                        style={{pageBreakAfter: "always"}}
                    >
                        <table>
                            <thead>
                            <tr>
                                <td>
                                    <div className="page__header">
                                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                            <Typography
                                                size="lg"
                                                color="light"
                                                isBold
                                            >
                                                پروژه :
                                                &nbsp;
                                                {contract?.project_title}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>
                                    <div className="page">
                                        <Contract>
                                            {
                                                contract?.articles.map(article =>
                                                    <Article
                                                        key={article.id}
                                                        article={article}
                                                    >
                                                        <ul className="vstack list-unstyled m-0 p-0 ps-10 mt-5">
                                                            {
                                                                article.number === 1 && (
                                                                    <EmployersSection
                                                                        section={{
                                                                            number: 1,
                                                                            content: "کارفرما",
                                                                            notes: contract?.notes.filter(note => note.article_number === 1 && note.section_number === 1)
                                                                        }}
                                                                        employers={contract?.type_id === "1" ? contract?.members.filter(member => member.side_id === "1") : contract?.informal_members.filter(member => member.side_id === "1")}
                                                                        typeId={contract?.type_id}
                                                                    />
                                                                )
                                                            }

                                                            {
                                                                article.number === 1 && (
                                                                    <ContractorsSection
                                                                        section={{
                                                                            number: 2,
                                                                            content: "مجری",
                                                                            notes: contract?.notes.filter(note => note.article_number === 1 && note.section_number === 2)
                                                                        }}
                                                                        contractors={contract?.type_id === "1" ? contract?.members.filter(member => member.side_id === "2") : contract?.informal_members.filter(member => member.side_id === "2")}
                                                                        typeId={contract?.type_id}
                                                                    />
                                                                )
                                                            }

                                                            {
                                                                article.number === 4 && article.sections.find(section => section.number === 1) && (
                                                                    <RegularSection
                                                                        section={{
                                                                            number: article.sections.find(section => section.article_number === 4 && section.number === 1)?.number,
                                                                            content: article.sections.find(section => section.article_number === 4 && section.number === 1)?.content,
                                                                            notes: contract?.notes.filter(note => note.article_number === 4 && note.section_number === 1)
                                                                        }}
                                                                    />
                                                                )
                                                            }

                                                            {
                                                                article.number === 5 && (
                                                                    <PaymentSection
                                                                        section={{
                                                                            number: 1,
                                                                            content: contract?.payment_state === "1" ? "کلیه پرداخت ها بر اساس فاز های زیر پرداخت میگردد" : article.sections.find(section => section.article_number === 5 && section.number === 1)?.content,
                                                                            notes: contract?.notes.filter(note => note.article_number === 5 && note.section_number === 1)
                                                                        }}
                                                                        totalPrice={contract?.total_price}
                                                                        payments={contract?.payments}
                                                                        paymentState={contract?.payment_state}
                                                                    />
                                                                )
                                                            }

                                                            {
                                                                article.sections.filter(section => !((section.article_number === 4 && section.number === 1) || (section.article_number === 5 && section.number === 1) || !section.content)).map(section => {
                                                                    return (
                                                                        <RegularSection
                                                                            key={section.id}
                                                                            section={{
                                                                                ...section,
                                                                                notes: contract?.notes.filter(note => article.sections.filter(section => !((section.article_number === 5 && section.number === 1) || !section.content))?.map(section => section.article_number).includes(note.article_number) && article.sections.filter(section => !((section.article_number === 5 && section.number === 1) || !section.content))?.map(section => section.number).includes(note.section_number))
                                                                            }}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </Article>
                                                )
                                            }
                                        </Contract>
                                    </div>
                                </td>
                            </tr>
                            </tbody>

                            <tfoot>
                            {/* employers & contractors sign */}
                            <tr>
                                <td>
                                    <div className="position-sticky bottom-0 w-100 mt-5">
                                        <table
                                            className="table table-borderless border-2 border-solid border-secondary mb-0">
                                            <colgroup>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                                <col width={100}/>
                                            </colgroup>

                                            <tbody>
                                            <tr className="border-2 border-solid border-secondary">
                                                <td
                                                    colSpan={6}
                                                    rowSpan={1}
                                                    className="bg-secondary text-start align-center border-right-2 border-solid border-secondary p-2"
                                                >
                                                    <Typography
                                                        size="xs"
                                                        color="dark"
                                                        isBold
                                                    >
                                                        کارفرما ها
                                                    </Typography>
                                                </td>
                                                <td
                                                    colSpan={6}
                                                    rowSpan={1}
                                                    className="bg-secondary text-start align-center p-2"
                                                >
                                                    <Typography
                                                        size="xs"
                                                        color="dark"
                                                        isBold
                                                    >
                                                        مجری ها
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr className="border-2 border-solid border-secondary">
                                                <td
                                                    colSpan={6}
                                                    rowSpan={1}
                                                    className="text-start align-center border-right-2 border-solid border-secondary px-2 py-4"
                                                >
                                                    <ul className='vstack list-unstyled gap-5 w-100 mb-0 p-0'>
                                                        {
                                                            contract?.type_id === "1" ? contract?.members.filter(member => member.side_id === "1")?.map(employer =>
                                                                <li
                                                                    key={employer.id}
                                                                    className=""
                                                                >
                                                                    {
                                                                        employer?.user_info?.user_type === "1" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {(employer?.user_info?.first_name && employer?.user_info?.last_name) ? employer?.user_info?.first_name + " " + employer?.user_info?.last_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }

                                                                    {
                                                                        employer?.user_info?.user_type === "2" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {employer?.user_info?.company_name ? employer?.user_info?.company_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                </li>
                                                            ) : contract?.informal_members.filter(member => member.side_id === "1")?.map(employer =>
                                                                <li
                                                                    key={employer.id}
                                                                    className=""
                                                                >
                                                                    {
                                                                        employer?.user_type === "1" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {(employer?.first_name && employer?.last_name) ? employer?.first_name + " " + employer?.last_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }

                                                                    {
                                                                        employer?.user_type === "2" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {employer?.company_name ? employer?.company_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </td>
                                                <td
                                                    colSpan={6}
                                                    rowSpan={1}
                                                    className="text-start align-center px-2 py-4"
                                                >
                                                    <ul className='vstack list-unstyled gap-5 w-100 mb-0 p-0'>
                                                        {
                                                            contract?.type_id === "1" ? contract?.members.filter(member => member.side_id === "2")?.map(contractor =>
                                                                <li
                                                                    key={contractor.id}
                                                                    className=""
                                                                >
                                                                    {
                                                                        contractor?.user_info.user_type === "1" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {(contractor?.user_info?.first_name && contractor?.user_info?.last_name) ? contractor?.user_info?.first_name + " " + contractor?.user_info?.last_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }

                                                                    {
                                                                        contractor?.user_info.user_type === "2" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {contractor?.user_info?.company_name ? contractor?.user_info?.company_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                </li>
                                                            ) : contract?.informal_members.filter(member => member.side_id === "2")?.map(contractor =>
                                                                <li
                                                                    key={contractor.id}
                                                                    className=""
                                                                >
                                                                    {
                                                                        contractor.user_type === "1" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {(contractor?.first_name && contractor?.last_name) ? contractor?.first_name + " " + contractor?.last_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }

                                                                    {
                                                                        contractor.user_type === "2" && (
                                                                            <Typography
                                                                                size="xs"
                                                                                color="dark"
                                                                            >
                                                                                {contractor?.company_name ? contractor?.company_name : "نا معلوم"}
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="page__footer"/>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>

            {
                signatureModal.isOpen && (
                    <SignatureModal
                        modal={signatureModal}
                        _handleHideModal={_handleHideSignatureModal}
                        sendProjectContractSignatureConfirmCodeAction={sendProjectContractSignatureConfirmCodeAction}
                    />
                )
            }

            {
                sendCommentModal.isOpen && (
                    <SendCommentModal
                        modal={sendCommentModal}
                        _handleHideModal={_handleHideSendCommentModal}
                    />
                )
            }
        </>
    )
}

export default DataModal;