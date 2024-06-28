// libraries
import {useState} from "react";

const useModal = (isOpen = false, data = null) => {

    const [modal, setModal] = useState<{ isOpen: boolean, data?: any }>({
        isOpen: isOpen,
        data: data,
    });

    const _handleShowModal = (data?: any) => {
        setModal({
            isOpen: true,
            data: data ? data : modal.data,
        })
    }

    const _handleToggleModal = (data?: any) => {
        setModal({
            isOpen: !modal.isOpen,
            data: data ? data : modal.data,
        })
    }

    const _handleHideModal = () => {
        setModal({
            isOpen: false,
            data: null,
        })
    }

    return {modal, _handleShowModal, _handleToggleModal, _handleHideModal};
}

export default useModal;