// libraries
import parse from "html-react-parser";
import {LuX} from "react-icons/lu";

// modules
import Modal from "@/modules/Modal.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Typography from "@/modules/Typography.tsx";

const ReadScreenPlayModal = ({modal , _handleHideModal}) => {
    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="lg"
            height="full"
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

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                {parse(`${modal?.data?.description}`)}
            </Modal.Body>
        </Modal>
    )
}
export default ReadScreenPlayModal;