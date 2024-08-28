// libraries
import {CSSProperties, HTMLProps} from "react";
import classNames from "classnames";

// types
import {TColors} from "@/types/constant.ts";

type TBadge = {
    color: TColors,
    size?: "sm" | "lg",
    label: number,
    placement: "top-end" | "top-start" | "bottom-end" | "bottom-start",
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const Badge = ({color, size = "sm", label, placement, ...props}: TBadge) => {
    return label > 0 && (
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