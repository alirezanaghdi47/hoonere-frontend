// libraries
import {forwardRef, useImperativeHandle, useRef} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useReactToPrint} from "react-to-print";
import {format} from "date-fns-jalali";

// modules
import Typography from "@/modules/Typography";

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
                    size="lg"
                    color="muted"
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
                    size="md"
                    color="muted"
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
                    color="muted"
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

const EmployersSection = ({employers, section}) => {
    return (
        <Section section={section}>
            <ul className="vstack list-unstyled m-0 p-0 ps-5">
                {
                    employers.map(member => {
                        if (member.user_info.user_type === "1") {
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
                        } else {
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

                                    {/*{*/}
                                    {/*    employer?.representatives.length !== 0 && (*/}
                                    {/*        <Typography*/}
                                    {/*            size="sm"*/}
                                    {/*            color="dark"*/}
                                    {/*        >*/}
                                    {/*            به نمایندگی :*/}
                                    {/*            &nbsp;*/}
                                    {/*            <ul className="hstack justify-content-start gap-2 p-0 m-0">*/}
                                    {/*                {*/}
                                    {/*                    employer?.representatives.map(representative =>*/}
                                    {/*                        <li*/}
                                    {/*                            key={representative.id}*/}
                                    {/*                            className="d-flex justify-content-start align-items-center gap-2"*/}
                                    {/*                        >*/}
                                    {/*                            <Typography*/}
                                    {/*                                size="sm"*/}
                                    {/*                                color="dark"*/}
                                    {/*                            >*/}
                                    {/*                                {representative.full_name}*/}
                                    {/*                            </Typography>*/}
                                    {/*                        </li>*/}
                                    {/*                    )*/}
                                    {/*                }*/}
                                    {/*            </ul>*/}
                                    {/*        </Typography>*/}
                                    {/*    )*/}
                                    {/*}*/}
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

const ContractorsSection = ({contractors, section}) => {
    return (
        <Section section={section}>
            <ul className="vstack list-unstyled m-0 p-0 ps-5">
                {
                    contractors.map(member => {
                        if (member.user_info.user_type === "1") {
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
                        } else {
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

                                    {/*<Typography*/}
                                    {/*    size="sm"*/}
                                    {/*    color="dark"*/}
                                    {/*>*/}
                                    {/*    به نمایندگی :*/}
                                    {/*    &nbsp;*/}
                                    {/*    {*/}
                                    {/*        member?.representatives.length !== 0 && (*/}
                                    {/*            <Typography*/}
                                    {/*                size="sm"*/}
                                    {/*                color="dark"*/}
                                    {/*            >*/}
                                    {/*                به نمایندگی :*/}
                                    {/*                &nbsp;*/}
                                    {/*                <ul className="hstack justify-content-start gap-2 p-0 m-0">*/}
                                    {/*                    {*/}
                                    {/*                        member?.representatives.map(representative =>*/}
                                    {/*                            <li*/}
                                    {/*                                key={representative.id}*/}
                                    {/*                                className="d-flex justify-content-start align-items-center gap-2"*/}
                                    {/*                            >*/}
                                    {/*                                <Typography*/}
                                    {/*                                    size="sm"*/}
                                    {/*                                    color="dark"*/}
                                    {/*                                >*/}
                                    {/*                                    {representative.full_name}*/}
                                    {/*                                </Typography>*/}
                                    {/*                            </li>*/}
                                    {/*                        )*/}
                                    {/*                    }*/}
                                    {/*                </ul>*/}
                                    {/*            </Typography>*/}
                                    {/*        )*/}
                                    {/*    }*/}
                                    {/*</Typography>*/}
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

const Print = forwardRef((props, ref) => {
    const printRef = useRef();

    const _handlePrint = useReactToPrint({
        documentTitle: `contract-${ref?.current?.contract_info?.contract_number}`,
        content: () => printRef.current,
    });

    useImperativeHandle(ref, () => {
        return {
            print() {
                setTimeout(() => {
                    _handlePrint();
                }, 100);
            }
        }
    }, []);

    return (
        <div
            ref={printRef}
            className='d-none d-print-block'
        >

            <table>
                <thead>
                <tr>
                    <td>
                        <div className="page__header">
                            <LazyLoadImage
                                src="/assets/images/logo.svg"
                                alt="logo"
                                width={40}
                                className='z-index-3'
                            />
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
                                    ref?.current?.contract_info?.articles.map(article =>
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
                                                                notes: article.notes
                                                            }}
                                                            employers={ref?.current?.contract_info?.members.filter(member => member.side_id === "1")}
                                                        />
                                                    )
                                                }

                                                {
                                                    article.number === 1 && (
                                                        <ContractorsSection
                                                            section={{
                                                                number: 2,
                                                                content: "مجری",
                                                                notes: article.notes
                                                            }}
                                                            contractors={ref?.current?.contract_info?.members.filter(member => member.side_id === "2")}
                                                        />
                                                    )
                                                }

                                                {
                                                    article.number === 5 && (
                                                        <PaymentSection
                                                            section={{
                                                                number: 1,
                                                                content: ref?.current?.contract_info?.payment_state === "2" ? "کلیه پرداخت ها به مجری بر اساس فاکتور های تایید شده توسط کارفرما پرداخت میگردد" : "کلیه پرداخت ها بر اساس فاز های زیر پرداخت میگردد",
                                                                note: article.notes
                                                            }}
                                                            totalPrice={ref?.current?.contract_info?.total_price}
                                                            payments={ref?.current?.contract_info?.payments}
                                                            paymentState={ref?.current?.contract_info?.payment_state}
                                                        />
                                                    )
                                                }

                                                {
                                                    article.sections.filter(section => !(section.article_number === 5 && section.number === 1)).map(section => {
                                                        return (
                                                            <RegularSection
                                                                key={section.id}
                                                                section={section}
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
                            <table className="table table-borderless border-2 border-solid border-secondary mb-0">
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
                                                ref?.current?.contract_info?.members.filter(member => member.side_id === "1")?.map(employer =>
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
                                                ref?.current?.contract_info?.members.filter(member => member.side_id === "2")?.map(contractor =>
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
    )
});

export default Print;