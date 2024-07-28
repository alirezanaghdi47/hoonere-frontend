// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

const Loading = ({width , height , withCard = false}) => {
    return (
        <div
            className={`${withCard ? "card" : ""} d-flex justify-content-center align-items-center`}
            style={{width: width , height: height}}
        >
            <LazyLoadImage
                src="/assets/images/loading.svg"
                width={100}
                height={100}
            />
        </div>
    )
}

export default Loading;