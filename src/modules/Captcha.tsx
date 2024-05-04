// libraries
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {LuRefreshCw} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";
import TextInput from "@/modules/TextInput.tsx";

const Skeleton = () => {
    return (
        <div className="d-flex justify-content-between align-items-center w-max placeholder-glow">
            <div className="w-100px h-40px min-w-100px h-md-45px bg-secondary rounded-2 placeholder"/>
        </div>
    )
}

const Captcha = ({name ,value , placeholder , isLoading , preview, onChange, onResend}) => {
    return (
        <div className="d-flex justify-content-between align-items-center gap-5 w-100">
            {
                isLoading ? (
                    <Skeleton/>
                ) : (
                    <LazyLoadImage
                        src={preview}
                        alt="captcha"
                        width="100%"
                        height="100%"
                        className="w-100px h-40px mw-100px min-w-100px h-md-45px object-fit-cover rounded-2"
                    />
                )
            }

            <TextInput
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(value) => onChange(value)}
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