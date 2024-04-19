// libraries
import {Link} from "react-router-dom";

const Button = ({
                    children,
                    size,
                    isBold,
                    isDense,
                    fullWidth,
                    direction,
                    color,
                    bgColor,
                    textColor,
                    href,
                    startIcon,
                    endIcon,
                    onClick,
                    ...props
                }) => {
    return href ? (
        <Link
            to={href}
            className={`flex items-center btn btn-${color} btn-bg-${bgColor} btn-color-${textColor} ${isDense ? "btn-link" : ""} btn-${size} ${direction === "start" ? "justify-start" : direction === "end" ? "justify-end" : "justify-center"} ${fullWidth ? "w-full" : ""} ${isBold ? "fw-bold" : ""} ${props.className}`}
            onClick={onClick}
        >
            {startIcon &&
                <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${startIcon} me-2`}/>}
            {children}
            {endIcon && <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${endIcon} ms-2`}/>}
        </Link>
    ) : (
        <button
            className={`flex items-center btn btn-${color} btn-bg-${bgColor} btn-color-${textColor} ${isDense ? "btn-link" : ""} btn-${size} ${direction === "start" ? "justify-start" : direction === "end" ? "justify-end" : "justify-center"} ${fullWidth ? "w-full" : ""} ${isBold ? "fw-bold" : ""} ${props.className}`}
            onClick={onClick}
        >
            {startIcon &&
                <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${startIcon} me-2`}/>}
            {children}
            {endIcon && <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${endIcon} ms-2`}/>}
        </button>
    )
}

export default Button;