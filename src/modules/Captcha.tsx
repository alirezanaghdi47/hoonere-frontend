// libraries
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {LuRefreshCw} from "react-icons/lu";

// assets
import placeholder from "@/assets/images/placeholder.png";

// modules
import IconButton from "@/modules/IconButton.tsx";
import TextInput from "@/modules/TextInput.tsx";

const Captcha = ({value, onChange, onResend}) => {
    return (
        <div className="d-flex justify-content-between align-items-center w-100 gap-2">
            <LazyLoadImage
                src={placeholder}
                alt="placeholder"
                width="100%"
                height="100%"
                className="w-150px h-40px h-md-45px object-fit-cover rounded-2"
            />

            <TextInput
                value={value}
                placeholder="کد امنیتی"
                onChange={onChange}
                endAdornment={
                    <IconButton
                        size="sm"
                        color="light"
                        onClick={onResend}
                    >
                        <LuRefreshCw
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                }
            />
        </div>
    )
}

export default Captcha;