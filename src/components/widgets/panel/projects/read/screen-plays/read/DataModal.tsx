// libraries
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import parse from "html-react-parser";
import {LuPrinter, LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Modal from "@/modules/Modal.tsx";
import IconButton from "@/modules/IconButton.tsx";

const DataModal = ({screenPlay}) => {
    const navigate = useNavigate();
    const printRef = useRef();

    const _handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `screenplay_${screenPlay?.created_at}`,
        bodyClass: "p-5"
    });

    return (
        <Modal
            isOpen={true}
            onClose={() => navigate(-1)}
            position='center'
            width="lg"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    متن فیلم نامه
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
                        onClick={() => navigate(-1)}
                    >
                        <LuX size={20}/>
                    </IconButton>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div
                    ref={printRef}
                    className="w-100 h-100"
                >
                    {parse(`${screenPlay?.description}`)}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DataModal;