// libraries
import {CSSProperties, HTMLProps} from "react";
import classNames from "classnames";

// types
import {TColors} from "@/types/constant.ts";

const Badge = ({color, size = "sm", label , isCircle = false, placement, ...props}: TBadge) => {
    return (
        <span
            {...props}
            className={classNames("badge z-index-3", props.className, {
                [`badge-${color}`]: true,
                [`badge-${size}`]: true,
                "badge-circle": isCircle,
                "position-absolute translate-middle": placement,
                "top-0 start-100 mt-1 -me-5": placement === "top-end",
                "top-0 start-0 mt-1 -ms-5": placement === "top-start",
                "bottom-0 start-100 mb-1 -me-5": placement === "bottom-end",
                "bottom-0 start-0 mb-1 -ms-5": placement === "bottom-start",
            })}
        >
            {label && label}
        </span>
    )
}

type TBadge = {
    color: TColors,
    size?: "xs" | "sm" | "lg",
    label?: number | string,
    placement: "top-end" | "top-start" | "bottom-end" | "bottom-start",
    isCircle?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default Badge;