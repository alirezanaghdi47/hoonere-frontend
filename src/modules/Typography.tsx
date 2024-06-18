// libraries
import {JSX} from "react";
import classNames from "classnames";

// types
import {TTypography} from "@/types/moduleType.ts";

const typographySizes = {
    xxs: "7",
    xs: "6",
    sm: "5",
    md: "4",
    lg: "3",
    xl: "2",
    xxl: "1",
}

const Typography = ({children, variant = "p", size, color, isBold = false, ...props}: TTypography) => {
    const Tag = `${variant}` as keyof JSX.IntrinsicElements;

    return (
        <Tag
            {...props}
            className={classNames("d-flex align-items-center mb-0", props.className, {
                [`fs-${typographySizes[size]}`]: true,
                [`text-${color}`]: true,
                "fw-bold": isBold,
                "fw-normal": !isBold,
            })}
        >
            {children}
        </Tag>
    )
}

export default Typography;