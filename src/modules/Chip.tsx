// libraries
import classNames from "classnames";

// types
import {TChip} from "@/types/moduleType.ts";

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

export default Chip;