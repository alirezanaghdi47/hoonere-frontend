// libraries
import {LazyLoadImage} from "react-lazy-load-image-component";

const Loading = ({width , height}) => {
    return (
        <div
            className="card d-flex justify-content-center align-items-center"
            style={{width: width , height: height}}
        >
            <LazyLoadImage
                src="/assets/images/loading.svg"
                alt="logo"
                width={100}
                height={100}
            />
        </div>
    )
}

export default Loading;