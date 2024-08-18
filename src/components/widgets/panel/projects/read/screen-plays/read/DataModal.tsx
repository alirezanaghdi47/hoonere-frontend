// libraries
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from "react-to-print";
import parse from "html-react-parser";
import {LuDownload, LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import Modal from "@/modules/Modal";
import IconButton from "@/modules/IconButton";

const DataModal = ({screenPlay}) => {
    const navigate = useNavigate();
    const printRef = useRef(null);

    const _handlePrint = useReactToPrint({
        documentTitle: `screen-play`,
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
                        جزییات فیلم نامه
                    </Typography>

                    <div className='d-flex justify-content-end align-items-center gap-5'>
                        <IconButton
                            size="sm"
                            color="light-dark"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="دانلود فیلم نامه"
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
                        className="min-w-900px w-100 h-100"
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
                                        زمان اجرا :
                                        &nbsp;
                                        {screenPlay?.time_type?.title}
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
                                        سمت مکان :
                                        &nbsp;
                                        {screenPlay?.location_side?.title}
                                    </Typography>
                                </td>

                                <td
                                    colSpan={4}
                                    rowSpan={1}
                                    className="text-center align-center bg-secondary border-right-2 border-left-2 border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                        isBold
                                    >

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
                                        قسمت :
                                        &nbsp;
                                        {screenPlay?.part}
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
                                        سکانس :
                                        &nbsp;
                                        {screenPlay?.sequence}
                                    </Typography>
                                </td>
                            </tr>

                            {
                                screenPlay?.fields.length > 0 && (
                                    <tr>
                                        {
                                            screenPlay?.fields.map(field =>
                                                <td
                                                    key={field.id}
                                                    colSpan={3}
                                                    rowSpan={1}
                                                    className="text-start align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                >
                                                    <Typography
                                                        size="xs"
                                                        color="dark"
                                                    >
                                                        {field.title}
                                                        &nbsp;
                                                        :
                                                        &nbsp;
                                                        {field.value}
                                                    </Typography>
                                                </td>
                                            )
                                        }

                                        {
                                            Array(Math.ceil(screenPlay?.fields.length / 4) * 4 - screenPlay?.fields.length).fill("").map((_, index) =>
                                                <td
                                                    key={`temp-field-${index}`}
                                                    colSpan={3}
                                                    rowSpan={1}
                                                    className="text-start align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                                >

                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }

                            <tr>
                                <td
                                    colSpan={12}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-bottom-2 border-solid border-secondary p-2"
                                >
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        آدرس :
                                        &nbsp;
                                        {screenPlay?.address}
                                    </Typography>
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={12}
                                    rowSpan={1}
                                    className="text-start align-center border-right-2 border-solid border-secondary p-2"
                                >
                                    {parse(`${screenPlay?.description}`)}
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DataModal;

