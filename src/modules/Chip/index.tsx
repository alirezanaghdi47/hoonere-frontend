// libraries
import {CSSProperties, HTMLProps} from "react";
import classNames from "classnames";

// types
import {TColors} from "@/types/constant.ts";

const Chip = ({label, size = "sm", color, isCircle = false, ...props}: TChip) => {
    return (
        <span
            className={classNames("badge", props.className, {
                [`badge-${size}`]: true,
                [`badge-${color}`]: true,
                "badge-circle": isCircle,
            })}
        >
            {label}
        </span>
    )
}

type TChip = {
    label: string | number,
    size?: "sm" | "lg",
    color: TColors,
    isCircle?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default Chip;