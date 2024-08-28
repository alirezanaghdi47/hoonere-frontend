// libraries
import Swal, {SweetAlertIcon} from "sweetalert2";

// styles
import "./index.style.scss";

// types
import {TColors} from "@/types/constant.ts";

const Dialog = (
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButton: { text: string, show: boolean, color: TColors },
    cancelButton: { text: string, show: boolean, color: TColors },
    callback: () => void
) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: cancelButton.show,
        cancelButtonText: cancelButton.text,
        showConfirmButton: confirmButton.show,
        confirmButtonText: confirmButton.text,
        customClass: {
            confirmButton: `btn btn-${confirmButton.color}`,
            cancelButton: `btn btn-${cancelButton.color}`
        }
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

export default Dialog;