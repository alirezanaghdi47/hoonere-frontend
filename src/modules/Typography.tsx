// utils
import {typographySizes} from "@/utils/constants.ts";

const Typography = ({children , variant , size , color , isBold , ...props}) => {
    const Tag = `${variant}`;

    return (
        <Tag className={`fs-${typographySizes[size]} text-${color} ${isBold ? "fw-bold" : "fw-normal"} ${props.className}`}>
            {children}
        </Tag>
    )
}

export default Typography;