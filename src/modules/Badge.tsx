// modules
import classNames from "classnames";

// types
import {TBadge} from "@/types/moduleType.ts";

const Badge = ({color, size, label, placement, ...props}: TBadge) => {
    return (
        <span
            {...props}
            className={classNames("badge badge-circle", props.className, {
                [`badge-${color}`]: true,
                [`badge-${size}`]: true,
                "position-absolute translate-middle": placement,
                "top-0 start-100": placement === "top-end",
                "top-0 start-0": placement === "top-start",
                "bottom-0 start-100": placement === "bottom-end",
                "bottom-0 start-0": placement === "bottom-start",
            })}
        >
            {label}
        </span>
    )
}

export default Badge;