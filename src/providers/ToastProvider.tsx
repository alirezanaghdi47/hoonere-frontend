// libraries
import { Toaster } from 'react-hot-toast';
import {useMediaQuery} from "usehooks-ts";

const ToastProvider = () => {
    const isMobile = useMediaQuery('(max-width: 576px)');

    return (
        <Toaster
            position={isMobile ? "top-center" : "top-left"}
            toastOptions={{
                duration: 1500,
            }}
            gutter={8}
        />
    )
}

export default ToastProvider;