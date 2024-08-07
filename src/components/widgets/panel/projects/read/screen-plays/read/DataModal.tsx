// libraries
import {useNavigate} from "react-router-dom";
import parse from "html-react-parser";
import {LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import Modal from "@/modules/Modal";
import IconButton from "@/modules/IconButton";

const DataModal = ({screenPlay}) => {
    const navigate = useNavigate();

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
                <div className="w-100 h-100">
                    {parse(`${screenPlay?.description}`)}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DataModal;