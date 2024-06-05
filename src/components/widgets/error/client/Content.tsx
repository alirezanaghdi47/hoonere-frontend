// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";

// stores
import useAuthStore from "@/stores/appStore.ts";

const Content = () => {
    const {auth} = useAuthStore();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-10 w-100 h-100">
            <LazyLoadImage
                src="/assets/images/not-found.svg"
                alt="404"
                width={250}
            />

            <Typography
                variant="h1"
                color="gray-600"
                size="lg"
                isBold
            >
                صفحه مورد نظر یافت نشد
            </Typography>

            <Button
                color="light-danger"
                isBold
                onClick={() => window.location.replace(auth.panel_url + "dashboard" || "/admin-panel/dashboard")}
            >
                بازگشت به صفحه اصلی
            </Button>
        </div>
    )
}

export default Content;