// libraries
import {LazyLoadImage} from 'react-lazy-load-image-component';

// assets
import placeholder from "@/assets/images/placeholder.png";

// modules
import IconButton from "@/modules/IconButton.tsx";

const Captcha = ({value , onChange , onResend , theme}) => {
    return (
        <div className="flex justify-between items-center w-full gap-4">
            <div className='relative w-full'>
                <div className="absolute top-2 start-2 w-100px h-30px bg-light rounded-2">
                    <LazyLoadImage
                        src={placeholder}
                        alt="placeholder"
                        width="100%"
                        height="100%"
                        className="w-full h-full object-cover rounded-2"
                    />
                </div>

                <input
                    type="text"
                    className={`form-control form-control-lg ${theme === "solid" ? "form-control-solid" : ""}`}
                    value={value}
                    onChange={onChange}
                />

                <IconButton
                    icon="far fa-refresh"
                    size="sm"
                    color="light"
                    className="absolute top-2 end-3"
                    onClick={onResend}
                />
            </div>
        </div>
    )
}

export default Captcha;