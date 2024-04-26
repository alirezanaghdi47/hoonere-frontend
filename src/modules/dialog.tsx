// libraries
import Swal from "sweetalert2";

const dialog = (title, text, icon, confirmButton, cancelButton , callback) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: cancelButton.show,
        cancelButtonText: cancelButton.text,
        showConfirmButton: confirmButton.show,
        confirmButtonText: confirmButton.text,
        customClass:{
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