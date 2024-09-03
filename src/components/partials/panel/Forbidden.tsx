// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography";

const Forbidden = ({title, width, height , withCard = false}) => {
    return (
        <div
            className={`${withCard ? "card" : ""} d-flex flex-column justify-content-center align-items-center gap-5`}
            style={{width: width, height: height}}
        >
            <LazyLoadImage
                src="/assets/images/illustrations/forbidden.svg"
                alt="forbidden"
                width={height / 2}
                height={height / 2}
            />

            <Typography
                color="muted"
                size="sm"
                isBold
            >
                {title ? title : "شما دسترسی ندارید"}
            </Typography>
        </div>
    )
}

export default Forbidden;