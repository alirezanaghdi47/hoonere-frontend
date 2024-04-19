// libraries
import {Link} from "react-router-dom";

const IconButton = ({
                        icon,
                        size,
                        color,
                        isDense,
                        bgColor,
                        textColor,
                        circle,
                        href,
                        onClick,
                        ...props
                    }) => {
    return href ? (
        <Link
            to={href}
            className={`btn btn-icon btn-${color} btn-bg-${bgColor} btn-color-${textColor} ${isDense ? "btn-link" : ""} btn-${size} ${props.className}`}
            onClick={onClick}
        >
            <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${icon}`}/>
        </Link>
    ) : (
        <button
            className={`btn btn-icon btn-${color} btn-bg-${bgColor} btn-color-${textColor} ${isDense ? "btn-link" : ""} btn-${size} ${props.className}`}
            onClick={onClick}
        >
            <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${icon}`}/>
        </button>
    )
}

export default IconButton;