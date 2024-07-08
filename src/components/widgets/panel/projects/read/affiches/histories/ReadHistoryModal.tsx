// libraries
import {useRef} from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {format} from "date-fns-jalali";
import {LuPrinter, LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Modal from "@/modules/Modal.tsx";
import IconButton from "@/modules/IconButton.tsx";

// utils
import {convertGregorianToJalali, generateTimeWithoutSecond,} from "@/utils/functions.ts";

const ReadHistoryModal = ({modal, _handleHideModal}) => {
    const printRef = useRef();

    console.log(modal?.data)

    const _handlePrint = async () => {
        await html2canvas(printRef.current, {scale: 2}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width / 2;
            const canvasHeight = canvas.height / 2;

            const imgWidth = pdfWidth;
            const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, null, 'FAST');  // Use 'FAST' compression for better quality
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, null, 'FAST');  // Use 'FAST' compression for better quality
                heightLeft -= pdfHeight;
            }

            pdf.save(`affiche_${modal?.data?.affiche_date}.pdf`);
        });
    };

    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="xl"
            height="full"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    تاریخچه آفیش
                </Typography>

                <div className='d-flex justify-content-end align-items-center gap-5'>
                    <IconButton
                        size="sm"
                        color="light-info"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="خروجی pdf"
                        onClick={_handlePrint}
                    >
                        <LuPrinter size={20}/>
                    </IconButton>

                    <IconButton
                        size="sm"
                        color="light-danger"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="خروج"
                        onClick={_handleHideModal}
                    >
                        <LuX size={20}/>
                    </IconButton>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div
                    ref={printRef}
                    className="d-flex flex-wrap justify-content-start align-items-start min-w-900px w-100 h-100 p-2 overflow-auto"
                >
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
                                    جلسه :
                                    &nbsp;
                                    {modal?.data?.number_string}
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
                                    {generateTimeWithoutSecond(modal?.data?.start_time)}
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
                                    {modal?.data?.title}
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
                                    {format(modal?.data?.affiche_date, "EEEE")}
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
                                    {convertGregorianToJalali(modal?.data?.affiche_date)}
                                </Typography>
                            </td>
                        </tr>

                        {/* کارگردان و تهیه کننده */}
                        <tr>
                            <td
                                colSpan={4}
                                rowSpan={1}
                                className="text-start align-center border-bottom-2 border-solid border-secondary p-2"
                            >
                                <Typography
                                    size="xs"
                                    color="dark"
                                >
                                    کارگردان :
                                    &nbsp;
                                </Typography>
                            </td>

                            <td
                                colSpan={4}
                                rowSpan={1}
                                className="text-start align-center border-bottom-2 border-solid border-secondary p-2"
                            >
                                <Typography
                                    size="xs"
                                    color="dark"
                                >
                                    تهیه کننده :
                                    &nbsp;
                                </Typography>
                            </td>
                        </tr>

                        {/* وضعیت آفیش */}
                        <tr>
                            <td
                                colSpan={3}
                                rowSpan={1}
                                className="text-start align-center border-right-2 border-solid border-secondary p-2"
                            >
                                <Typography
                                    size="xs"
                                    color="dark"
                                >
                                    داخلی :
                                    &nbsp;
                                    {["1" , "3"].includes(modal?.data?.location_side_id) && "*"}
                                </Typography>
                            </td>

                            <td
                                colSpan={3}
                                rowSpan={1}
                                className="text-start align-center border-right-2 border-solid border-secondary p-2"
                            >
                                <Typography
                                    size="xs"
                                    color="dark"
                                >
                                    خارجی :
                                    &nbsp;
                                    {["2" , "3"].includes(modal?.data?.location_side_id) && "*"}
                                </Typography>
                            </td>

                            <td
                                colSpan={3}
                                rowSpan={1}
                                className="text-start align-center border-right-2 border-solid border-secondary p-2"
                            >
                                <Typography
                                    size="xs"
                                    color="dark"
                                >
                                    روز :
                                    &nbsp;
                                    {["1" , "3"].includes(modal?.data?.time_type_id) && "*"}
                                </Typography>
                            </td>

                            <td
                                colSpan={3}
                                rowSpan={1}
                                className="text-start align-center border-solid border-secondary p-2"
                            >
                                <Typography
                                    size="xs"
                                    color="dark"
                                >
                                    شب :
                                    &nbsp;
                                    {["2" , "3"].includes(modal?.data?.time_type_id) && "*"}
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
                                            className="bg-secondary text-center align-center border-right-2 border-solid border-active-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                        modal?.data?.actors?.map((actor, index) =>
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
                                                        {actor?.info?.first_name + " " + actor?.info?.last_name}
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
                                                        {generateTimeWithoutSecond(actor?.info?.coming_time)}
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
                                                        {generateTimeWithoutSecond(actor?.info?.makeup_time)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {
                                        (Math.max(modal?.data?.actors?.length, modal?.data?.screenplays?.length) - modal?.data?.actors?.length > 0) && Array(Math.max(modal?.data?.actors?.length, modal?.data?.screenplays?.length) - modal?.data?.actors?.length).fill("").map((blank, index) =>
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
                                                        {modal?.data?.actors?.length + index + 1}
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-bottom-2 border-solid border-secondary p-2"
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
                                        modal?.data?.screenplays?.map(screenPlay =>
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
                                            className="bg-secondary text-center align-center border-right-2 border-solid border-active-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                        modal?.data?.members?.map((member, index) =>
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
                                                        {member?.info?.first_name + " " + member?.info?.last_name}
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
                                                        {generateTimeWithoutSecond(member?.info?.coming_time)}
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
                                        (Math.max(modal?.data?.members?.length, modal?.data?.receptions?.length) - modal?.data?.members?.length > 0) && Array(Math.max(modal?.data?.members?.length, modal?.data?.receptions?.length) - modal?.data?.members?.length).fill("").map((blank, index) =>
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
                                                        {modal?.data?.members.length + index + 1}
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-bottom-2 border-solid border-secondary p-2"
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
                                        modal?.data?.receptions?.map(reception =>
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
                                                        {reception?.info?.first_name + " " + reception?.info?.last_name}
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

                                    <tr>
                                        <td
                                            colSpan={1}
                                            rowSpan={1}
                                            className="bg-light-dark text-center align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
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
                                            className="bg-light-dark text-center align-center border-bottom-2 border-solid border-secondary p-2"
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
                                        modal?.data?.addresses?.map((address, index) =>
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
                                                        {index}
                                                    </Typography>
                                                </td>

                                                <td
                                                    colSpan={11}
                                                    rowSpan={1}
                                                    className="text-start align-center border-bottom-2 border-solid border-secondary p-2"
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
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ReadHistoryModal;