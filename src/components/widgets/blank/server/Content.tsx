// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Content = () => {
    const {auth} = useAuthStore();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-10 w-100 h-100 py-20">
            <LazyLoadImage
                src="/assets/images/illustrations/server-down.svg"
                alt="server-down"
                width={250}
            />

            <Typography
                variant="h1"
                color="muted"
                size="lg"
                isBold
            >
                خطا در ارتباط با سرور
            </Typography>

            <Typography
                variant="h3"
                color="muted"
                size="sm"
            >
                ارتباط خود را با سرور چک کنید
            </Typography>

            <Button
                color="light-danger"
                isBold
                onClick={() => window.location.replace(auth.panel_url ? process.env.BASE_URL + auth.panel_url + "dashboard" : process.env.BASE_URL + "/panel/dashboard")}
            >
                بازگشت به صفحه اصلی
            </Button>
        </div>
    )
}

export default Content;