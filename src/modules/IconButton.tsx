// libraries
import {Link} from "react-router-dom";

const IconButton = ({
                        size = "md",
                        color,
                        activeColor,
                        isDense,
                        bgColor,
                        textColor,
                        href,
                        onClick,
                        children,
                        ...props
                    }) => {
    return href ? (
        <Link
            {...props}
            to={href}
            className={`position-relative btn btn-icon btn-${color} btn-active-${activeColor} btn-bg-${bgColor} btn-color-${textColor} ${isDense ? "btn-link" : ""} btn-${size} ${props.className}`}
            onClick={onClick}
        >
            {children}
        </Link>
    ) : (
        <button
            {...props}
            className={`position-relative btn btn-icon btn-${color} btn-active-${activeColor} btn-bg-${bgColor} btn-color-${textColor} ${isDense ? "btn-link" : ""} btn-${size} ${props.className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default IconButton;