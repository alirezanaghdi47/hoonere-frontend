// libraries
import Swal, {SweetAlertIcon} from "sweetalert2";

// types
import * as t from "@/types/types.ts";

const dialog = (
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButton: { text: string, show: boolean, color: t.colors },
    cancelButton: { text: string, show: boolean, color: t.colors },
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

export default dialog;