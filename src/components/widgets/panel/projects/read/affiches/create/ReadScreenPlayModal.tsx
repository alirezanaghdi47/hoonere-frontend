// libraries
import parse from "html-react-parser";

// modules
import Modal from "@/modules/Modal.tsx";

const ReadScreenPlayModal = ({modal , _handleHideModal}) => {
    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="lg"
            height="full"
        >
            <Modal.Header
                title="متن فیلم نامه"
                onClose={_handleHideModal}
            />

            <Modal.Body>
                {parse(`${modal?.data?.description}`)}
            </Modal.Body>
        </Modal>
    )
}
export default ReadScreenPlayModal;