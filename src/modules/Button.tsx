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
            className={classNames("position-relative d-flex align-items-center gap-2 btn", props.className, {
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
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
        </Link>
    ) : (
        <button
            className={classNames("position-relative d-flex align-items-center gap-2 btn", props.className, {
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
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
        </button>
    )
}

export default Button;