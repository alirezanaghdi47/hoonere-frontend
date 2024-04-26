// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// assets
import banner from "@/assets/images/404.svg";

// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";

const Banner = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-10">
            <LazyLoadImage
                src={banner}
                alt="404"
                width={250}
            />

            <Typography
                variant="h1"
                color="gray-700"
                size="lg"
                isBold
            >
                صفحه مورد نظر یافت نشد
            </Typography>

            <Button
                href="/account/dashboard"
                color="light-danger"
                isBold
            >
                بازگشت به صفحه اصلی
            </Button>
        </div>
    )
}

export default Banner;