// libraries
import ReactModal from 'react-modal';
import classNames from "classnames";

// types
import {TModal, TModalBody, TModalFooter, TModalHeader} from "@/types/moduleType.ts";

const styles = {
    width: {
        sm: "w-100 w-sm-250px",
        md: "w-100 w-md-500px",
        lg: "w-100 w-lg-750px",
        xl: "w-100 w-xl-1000px",
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

const Modal = ({children, isOpen, onClose, width = "md", height = "content", position = "any", ...props}: TModal) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            closeTimeoutMS={300}
            className={classNames("d-flex flex-column justify-content-start align-items-center gap-5 bg-light p-5", props.className?.content, {
                [`${styles.width[width]}`]: true,
                [`${styles.height[height]}`]: true,
                "rounded-0": position === "any",
                "rounded-2": position === "center",
                "rounded-tl-lg rounded-tr-lg": position === "bottom",
            })}
            overlayClassName={classNames("position-fixed top-0 left-0 d-flex w-100 h-100 bg-gray-600 bg-opacity-75", props.className?.overlay, {
                [`${styles.position[position]}`]: true,
                "p-5": position === "center",
            })}
            style={{
                overlay: {zIndex: '1000'}
            }}
        >
            {children}
        </ReactModal>
    )
}

const ModalHeader = ({children , ...props}: TModalHeader) => {
    return (
        <div
            {...props}
            className={classNames("d-flex justify-content-between align-items-center w-100 gap-5" , props.className)}
        >
            {children}
        </div>
    )
}

const ModalBody = ({children, isCenter = true, ...props}: TModalBody) => {
    return (
        <div
            {...props}
            className={classNames("d-flex flex-column justify-content-start align-items-start gap-5 w-100 h-100 overflow-y-auto remove-scrollbar", props.className, {
                "mb-auto": isCenter
            })}
        >
            {children}
        </div>
    )
}

const ModalFooter = ({cancelButton, submitButton, ...props}: TModalFooter) => {
    return (
        <div
            {...props}
            className={classNames("d-flex justify-content-end align-items-center gap-2 w-100 mt-auto", props.className)}
        >
            {cancelButton}
            {submitButton}
        </div>
    )
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;