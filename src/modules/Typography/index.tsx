// libraries
import {JSX , CSSProperties, HTMLProps, ReactNode} from "react";
import classNames from "classnames";

// types
import {TSizes , TColors} from "@/types/constant.ts";

const sizes = {
    xxs: "7",
    xs: "6",
    sm: "5",
    md: "4",
    lg: "3",
    xl: "2",
    xxl: "1",
}

const lineHeights = {
    sm: "sm",
    lg: "lg",
}

const Typography = ({
                        children,
                        variant = "p",
                        size,
                        color,
                        truncate,
                        lineHeight = "sm",
                        isBold = false,
                        ...props
                    }: TTypography) => {
    const Tag = `${variant}` as keyof JSX.IntrinsicElements;

    return (
        <Tag
            {...props}
            className={classNames("mb-0 p-0", props.className, {
                [`fs-${sizes[size]}`]: true,
                [`lh-${lineHeights[lineHeight]}`]: true,
                [`text-${color}`]: true,
                "fw-bold": isBold,
                "fw-normal": !isBold,
                [`text-truncate-${truncate}`]: true
            })}
        >
            {children}
        </Tag>
    )
}

type TTypography = {
    children?: ReactNode,
    variant?: "p" | "h1" | "h2" | "h3" | "h4" | "span"
    size: TSizes,
    color: TColors,
    isBold?: boolean,
    truncate?: 1 | 2 | 3,
    lineHeight?: "sm" | "lg",
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default Typography;