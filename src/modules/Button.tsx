// libraries
import {Link} from "react-router-dom";
import classNames from "classnames";
import {BeatLoader} from "react-spinners";

// types
import {TButton} from "@/types/modules";

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
                    href = null,
                    startAdornment = null,
                    disabled = false,
                    endAdornment = null,
                    onClick,
                    isLoading = false,
                    ...props
                }: TButton) => {
    return href ? (
        <Link
            {...props}
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
            {startAdornment && startAdornment}
            {children}
            {endAdornment && endAdornment}
        </Link>
    ) : (
        <button
            {...props}
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
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            {
                isLoading && (
                    <div className={`position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 bg-${color || bgColor} rounded-2`}>
                        <BeatLoader
                            color='currentColor'
                            size={10}
                        />
                    </div>
                )
            }

            {startAdornment && startAdornment}
            {children}
            {endAdornment && endAdornment}
        </button>
    )
}

export default Button;