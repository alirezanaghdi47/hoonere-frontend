// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography";

const Empty = ({title, width, height , withCard = false}) => {
    return (
        <div
            className={`${withCard ? 'card' : ''} d-flex flex-column justify-content-center align-items-center gap-5`}
            style={{width: width, height: height}}
        >
            <LazyLoadImage
                src="/assets/images/illustrations/no-data.svg"
                alt="no-data"
                width={100}
                height={100}
            />

            <Typography
                color="muted"
                size="md"
                isBold
            >
                {title ? title : "داده ای یافت نشد"}
            </Typography>
        </div>
    )
}

export default Empty;