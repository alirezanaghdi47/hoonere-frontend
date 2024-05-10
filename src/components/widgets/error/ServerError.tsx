// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";

const ServerError = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-10 w-100 h-100">
            <LazyLoadImage
                src="/assets/images/server-down.svg"
                alt="500"
                width={250}
            />

            <Typography
                variant="h1"
                color="gray-700"
                size="lg"
                isBold
            >
                خطا در ارتباط با سرور
            </Typography>

            <Typography
                variant="h3"
                color="gray-700"
                size="sm"
            >
                ارتباط خود را با سرور چک کنید
            </Typography>

            <Button
                color="light-danger"
                isBold
                onClick={() => window.location.replace("/")}
            >
                بازگشت به صفحه اصلی
            </Button>
        </div>
    )
}

export default ServerError;