// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import classNames from "classnames";

// modules
import Typography from "@/modules/Typography";

// types
import {TColors, TSizes} from "@/types/constant.ts";

type TAlert = {
    color: TColors,
    size?: TSizes,
    icon?: ReactNode,
    message: string,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const Alert = ({color, size = "md", icon = null, message, ...props}: TAlert) => {
    return (
        <div
            {...props}
            className={classNames("d-flex justify-content-start align-items-center gap-5 w-100 rounded-2 border border-dashed p-5", props.className, {
                [`bg-light-${color}`]: true,
                [`text-${color}`]: true,
                [`border-${color}`]: true,
            })}
        >
            {icon && icon}

            <Typography
                variant="p"
                color={color}
                size={size}
            >
                {message}
            </Typography>
        </div>
    )
}

export default Alert;