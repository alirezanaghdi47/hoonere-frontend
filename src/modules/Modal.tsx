// libraries
import ReactModal from 'react-modal';
import {LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

// styles
import "@/styles/modules/modal.scss";

const styles = {
    width: {
        sm: "w-100 w-md-250px",
        md: "w-100 w-md-500px",
        lg: "w-100 w-md-750px",
        full: "w-100"
    },
    height: {
        content: "h-max",
        full: "h-100"
    },
    position: {
        center: "justify-content-center align-items-center p-5",
        bottom: "justify-content-center align-items-end",
        any: "justify-content-center align-items-center",
    }
}

const Modal = ({children, isOpen, onClose, width = "md", height = "content", position = "any"}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            closeTimeoutMS={300}
            className={`d-flex flex-column justify-content-start align-items-center gap-5 ${styles.width[width]} ${styles.height[height]} ${position === "any" && "rounded-0"}  ${position === "center" && "rounded-2"} ${position === "bottom" && "rounded-tl-lg rounded-tr-lg"} bg-light p-5`}
            overlayClassName={`position-fixed top-0 left-0 z-index-1 d-flex ${styles.position[position]} ${position === "center" && "p-5"} w-100 h-100 bg-dark bg-opacity-75`}
        >
            {children}
        </ReactModal>
    )
}

const ModalHeader = ({title, onClose}) => {

    return (
        <div className="d-flex justify-content-between align-items-center w-100 gap-5">
            <Typography
                variant='h3'
                size="lg"
                color="dark"
                isBold
            >
                {title}
            </Typography>

            <IconButton
                variant="contained"
                size="sm"
                color="light-danger"
                onClick={onClose}
            >
                <LuX size={20}/>
            </IconButton>
        </div>
    )
}

const ModalBody = ({children, center , className}) => {

    return (
        <div className={`d-flex flex-column justify-content-start align-items-center gap-5 w-100 h-max overflow-y-auto remove-scrollbar ${center && "my-auto"} ${className ?? ""}`}>
            {children}
        </div>
    )
}

const ModalFooter = ({cancelButton, submitButton}) => {

    return (
        <div className="d-flex justify-content-end align-items-center gap-2 w-100 mt-auto">
            {cancelButton}
            {submitButton}
        </div>
    )
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;