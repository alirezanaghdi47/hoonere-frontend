// libraries
import Swal, {SweetAlertIcon} from "sweetalert2";

// styles
import "@/styles/modules/sweet-alert.scss";

const ToastWrapper = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const Toast = (icon: SweetAlertIcon , title: string) => ToastWrapper.fire({
    icon: icon,
    title: title
});

export default Toast;