// libraries
import {forwardRef, useImperativeHandle, useRef} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useReactToPrint} from "react-to-print";

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

const RegularSection = ({section}) => {
    return (
        <Section section={section}>

        </Section>
    )
}

const Print = forwardRef((props, ref) => {
    const printRef = useRef();

    const _handlePrint = useReactToPrint({
        documentTitle: `contract-${ref?.current?.contract_info?.contract_number}-supplement-${ref?.current?.contract_info?.contract_number}`,
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
        </>
    )
});

export default Print;