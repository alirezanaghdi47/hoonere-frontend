// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography.tsx";

const Empty = ({title, width, height}) => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center gap-5"
            style={{width: width, height: height}}
        >
            <LazyLoadImage
                src="/assets/images/no-data.svg"
                alt="logo"
                width={100}
                height={100}
            />

            <Typography
                variant="p"
                color="gray-600"
                size="md"
                isBold
            >
                {title ? title : "داده ای یافت نشد"}
            </Typography>
        </div>
    )
}

export default Empty;