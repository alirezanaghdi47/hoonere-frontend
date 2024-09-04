// libraries
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import {format} from "date-fns-jalali";
import {LuDownload, LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import Modal from "@/modules/Modal";
import IconButton from "@/modules/IconButton";

const DataModal = ({affiche}) => {
    const navigate = useNavigate();
    const printRef = useRef(null);

    const _handlePrint = useReactToPrint({
        documentTitle: `affiche_${affiche?.affiche_date}`,
        content: () => printRef.current,
    });

    return (
        <>
            <style>
                {`
                    @media print {
                      @page {
                        size: A4 landscape;
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
                        جزییات آفیش
                    </Typography>

                    <div className='d-flex justify-content-end align-items-center gap-5'>
                        <IconButton
                            size="sm"
                            color="light-dark"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="دانلود آفیش"
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
                        className="d-flex flex-column justify-content-start align-items-start min-w-900px w-100 h-100"
                    >
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
                            {/* اطلاعات اولیه آفیش */}
                            <tr>
                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        شماره آفیش :
                                        &nbsp;
                                        {affiche?.number_string}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        ساعت کلید :
                                        &nbsp;
                                        {affiche?.start_time.slice(0, -3)}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={4}
                                    rowSpan={2}
                                    className="text-center align-center bg-secondary border-right-2 border-left-2 border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                        isBold
                                    >
                                        {affiche?.project_title}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        روز :
                                        &nbsp;
                                        {format(affiche?.affiche_date, "EEEE")}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        تاریخ :
                                        &nbsp;
                                        {format(affiche?.affiche_date, "dd-MM-yyyy")}
                                    </Typography>
                                </td>
                            </tr>

                            {/* کارگردان و تهیه کننده */}
                            {/*<tr>*/}
                            {/*    <td*/}
                            {/*        colSpan={4}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="text-start align-center border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*        >*/}
                            {/*            کارگردان :*/}
                            {/*            &nbsp;*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={4}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="text-start align-center border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*        >*/}
                            {/*            تهیه کننده :*/}
                            {/*            &nbsp;*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}

                            {/* وضعیت آفیش */}
                            <tr>
                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        داخلی :
                                        &nbsp;
                                        {["1", "3"].includes(affiche?.location_side_id) && "*"}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        خارجی :
                                        &nbsp;
                                        {["2", "3"].includes(affiche?.location_side_id) && "*"}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        روز :
                                        &nbsp;
                                        {["1", "3"].includes(affiche?.time_type_id) && "*"}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={2}
                                    rowSpan={1}
                                    className="text-start align-center border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        شب :
                                        &nbsp;
                                        {["2", "3"].includes(affiche?.time_type_id) && "*"}
                                    </Typography>
                                </td>
                            </tr>

                            {/* بازیگران و فیلم نامه ها  */}
                            <tr>
                                <td
                                    colSpan={7}
                                    rowSpan={1}
                                    className="p-0"
                                >
                                    <table className="table table-borderless mb-0">
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
                                        <tr>
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="bg-secondary text-center align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                    isBold
                                                >
                                                    بازیگران
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                colSpan={1}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    ردیف
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={4}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    بازیگر
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={3}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    نقش
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    حضور
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    گریم
                                                </Typography>
                                            </td>
                                        </tr>

                                        {
                                            affiche?.actors?.map((actor, index) =>
                                                <tr key={actor.id}>
                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={4}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {actor.info?.is_fake === "0" ? actor.info?.user_type ? actor.info?.user_type === "1" ? actor.info?.first_name + " " + actor.info?.last_name : actor.info?.company_name : actor.info?.company_name ? actor.info?.company_name : actor.info?.first_name + " " + actor.info?.last_name : actor.info?.first_name + " " + actor.info?.last_name}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={3}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {actor?.info?.role}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {actor?.info?.coming_time.slice(0, -3)}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {actor?.info?.makeup_time.slice(0, -3)}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                        {
                                            (Math.max(affiche?.actors?.length, affiche?.screenplays?.length) - affiche?.actors?.length > 0) && Array(Math.max(affiche?.actors?.length, affiche?.screenplays?.length) - affiche?.actors?.length).fill("").map((blank, index) =>
                                                <tr key={index}>
                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {affiche?.actors?.length + index + 1}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={4}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={3}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </td>

                                <td
                                    colSpan={5}
                                    rowSpan={1}
                                    className="p-0"
                                >
                                    <table className="table table-borderless mb-0">
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
                                        <tr>
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="bg-secondary text-center align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                    isBold
                                                >
                                                    فیلم نامه ها
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    قسمت
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    سکانس
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    زمان
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    موقعیت
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={4}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    لوکیشن
                                                </Typography>
                                            </td>
                                        </tr>

                                        {
                                            affiche?.screenplays?.map(screenPlay =>
                                                <tr key={screenPlay.id}>
                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {screenPlay?.part}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {screenPlay?.sequence}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {screenPlay?.time_type?.title}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {screenPlay?.location_side?.title}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={4}
                                                        rowSpan={1}
                                                        className="text-center align-center border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {screenPlay?.address}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            {/* عوامل و پذیرایی ها  */}
                            <tr>
                                <td
                                    colSpan={7}
                                    rowSpan={1}
                                    className="p-0"
                                >
                                    <table className="table table-borderless mb-0">
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
                                        <tr>
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="bg-secondary text-center align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                    isBold
                                                >
                                                    عوامل
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                colSpan={1}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    ردیف
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={4}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    عوامل
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={3}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    شغل
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={1}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    حضور
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={3}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    توضیحات
                                                </Typography>
                                            </td>
                                        </tr>

                                        {
                                            affiche?.members?.map((member, index) =>
                                                <tr key={member.id}>
                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={4}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {member.info?.is_fake === "0" ? member.info?.user_type ? member.info?.user_type === "1" ? member.info?.first_name + " " + member.info?.last_name : member.info?.company_name : member.info?.company_name ? member.info?.company_name : member.info?.first_name + " " + member.info?.last_name : member.info?.first_name + " " + member.info?.last_name}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={3}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {member?.child_info?.title}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {member?.info?.coming_time.slice(0, -3)}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={3}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {member?.info?.description}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                        {
                                            (Math.max(affiche?.members?.length, affiche?.receptions?.length) - affiche?.members?.length > 0) && Array(Math.max(affiche?.members?.length, affiche?.receptions?.length) - affiche?.members?.length).fill("").map((blank, index) =>
                                                <tr key={index}>
                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {affiche?.members.length + index + 1}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={4}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={3}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={3}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >

                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </td>

                                <td
                                    colSpan={5}
                                    rowSpan={1}
                                    className="p-0"
                                >
                                    <table className="table table-borderless mb-0">
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
                                        <tr>
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="bg-secondary text-center align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                    isBold
                                                >
                                                    پذیرایی ها
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                colSpan={4}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    تامین کننده
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    صبحانه
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    ناهار
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    شام
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={2}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    میان وعده
                                                </Typography>
                                            </td>
                                        </tr>

                                        {
                                            affiche?.receptions?.map(reception =>
                                                <tr key={reception.id}>
                                                    <td
                                                        colSpan={4}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {reception.info?.is_fake === "0" ? reception.info?.user_type ? reception.info?.user_type === "1" ? reception.info?.first_name + " " + reception.info?.last_name : reception.info?.company_name : reception.info?.company_name ? reception.info?.company_name : reception.info?.first_name + " " + reception.info?.last_name : reception.info?.first_name + " " + reception.info?.last_name}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {reception?.info?.reception_type === "1" && "*"}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {reception?.info?.reception_type === "2" && "*"}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {reception?.info?.reception_type === "3" && "*"}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={2}
                                                        rowSpan={1}
                                                        className="text-center align-center border-bottom-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {reception?.info?.reception_type === "4" && "*"}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            {/* لوازم */}
                            {/*<tr>*/}
                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="bg-secondary border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}
                            {/*            وسایل نقلیه*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="bg-secondary border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}
                            {/*            صحنه*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="bg-secondary border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}
                            {/*            تجهیزات فیلم برداری*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="bg-secondary border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}
                            {/*            گریم*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="bg-secondary border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}
                            {/*            لباس*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="bg-secondary border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}
                            {/*            اصلاحیه*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}

                            {/*<tr>*/}
                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*        >*/}
                            {/*            موتور / کامیون*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*        >*/}
                            {/*            مدارک افزاد حلقه آبی / پلاستیک شیشه ای / سفره عقد/ لوازم پذیرایی مراسم / ...*/}
                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}

                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}

                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}

                            {/*        </Typography>*/}
                            {/*    </td>*/}

                            {/*    <td*/}
                            {/*        colSpan={2}*/}
                            {/*        rowSpan={1}*/}
                            {/*        className="border-right-2 border-bottom-2 border-solid border-secondary p-2"*/}
                            {/*    >*/}
                            {/*        <Typography*/}
                            {/*            size="xs"*/}
                            {/*            color="dark"*/}
                            {/*            isBold*/}
                            {/*        >*/}

                            {/*        </Typography>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}

                            {/* آدرس ها */}
                            <tr>
                                <td
                                    colSpan={12}
                                    rowSpan={1}
                                    className="p-0"
                                >
                                    <table className="table table-borderless mb-0">
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
                                        <tr>
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="bg-secondary text-center align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                    isBold
                                                >
                                                    آدرس ها
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr className="border-bottom-2 border-solid border-secondary">
                                            <td
                                                colSpan={1}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    ردیف
                                                </Typography>
                                            </td>

                                            <td
                                                colSpan={11}
                                                rowSpan={1}
                                                className="bg-light text-center align-center border-bottom-2 border-solid border-secondary p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    لوکیشن
                                                </Typography>
                                            </td>
                                        </tr>

                                        {
                                            affiche?.addresses?.map((address, index) =>
                                                <tr key={address.id}>
                                                    <td
                                                        colSpan={1}
                                                        rowSpan={1}
                                                        className="text-center align-center border-right-2 border-solid border-secondary p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </td>

                                                    <td
                                                        colSpan={11}
                                                        rowSpan={1}
                                                        className="text-start align-center p-2"
                                                    >
                                                        <Typography
                                                            size="xs"
                                                            color="dark"
                                                        >
                                                            {address?.address}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            {/* توضیحات */}
                            <tr>
                                <td
                                    colSpan={12}
                                    rowSpan={1}
                                    className="p-0"
                                >
                                    <table className="table table-borderless mb-0">
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
                                        <tr>
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="bg-secondary text-center align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                    isBold
                                                >
                                                    توضیحات
                                                </Typography>
                                            </td>
                                        </tr>

                                        <tr className="border-bottom-2 border-solid border-secondary">
                                            <td
                                                colSpan={12}
                                                rowSpan={1}
                                                className="text-start align-center p-2"
                                            >
                                                <Typography
                                                    size="xs"
                                                    color="dark"
                                                >
                                                    {affiche?.description}
                                                </Typography>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        {
                            affiche?.motivation_sentence && (
                                <Typography
                                    size="xxs"
                                    color="dark"
                                    isBold
                                    lineHeight="lg"
                                    className='py-5 mx-auto'
                                >
                                    {affiche?.motivation_sentence}
                                </Typography>
                            )
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DataModal;