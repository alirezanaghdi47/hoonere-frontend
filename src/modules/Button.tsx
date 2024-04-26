// libraries
import {Link} from "react-router-dom";
import classNames from "classnames";

const Button = ({
                    children,
                    size = "md",
                    isBold = false,
                    isDense = false,
                    fullWidth = false,
                    direction = "center",
                    color,
                    activeColor,
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
            className={classNames("position-relative d-flex align-items-center btn", props.className, {
                [`btn-${color}`]: true,
                [`btn-active-${activeColor}`]: true,
                [`btn-bg-${bgColor}`]: true,
                [`btn-color-${textColor}`]: true,
                [`btn-${size}`]: true,
                "btn-link text-nowrap": isDense,
                "justify-content-center": direction === "center",
                "justify-content-start": direction === "start",
                "justify-content-end": direction === "end",
                "w-100": fullWidth,
                "fw-bold": isBold
            })}
            onClick={onClick}
        >
            {startIcon &&
                <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${startIcon} me-2`}/>}
            {children}
            {endIcon && <i className={`${size === "lg" ? "fs-3" : size === "sm" ? "fs-5" : "fs-4"} ${endIcon} ms-2`}/>}
        </Link>
    ) : (
        <button
            className={classNames("position-relative d-flex align-items-center btn", props.className, {
                [`btn-${color}`]: true,
                [`btn-active-${activeColor}`]: true,
                [`btn-bg-${bgColor}`]: true,
                [`btn-color-${textColor}`]: true,
                [`btn-${size}`]: true,
                "btn-link": isDense,
                "justify-content-center": direction === "center",
                "justify-content-start": direction === "start",
                "justify-content-end": direction === "end",
                "w-100": fullWidth,
                "fw-bold": isBold
            })}
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