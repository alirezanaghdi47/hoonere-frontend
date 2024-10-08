// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {BeatLoader} from "react-spinners";

// types
import {TColors, TSizes} from "@/types/constant.ts";

const IconButton = ({
                        size = "md",
                        color,
                        activeColor,
                        isDense = false,
                        bgColor,
                        textColor,
                        href = null,
                        onClick,
                        children,
                        disabled = false,
                        isLoading = false,
                        ...props
                    }: TIconButton) => {
    return href ? (
        <Link
            {...props}
            to={href}
            className={classNames("position-relative btn btn-icon", props.className, {
                [`btn-${color}`]: true,
                [`btn-active-${activeColor}`]: true,
                [`btn-bg-${bgColor}`]: true,
                [`btn-color-${textColor}`]: true,
                [`btn-${size}`]: true,
                "btn-link": isDense,
            })}
            onClick={onClick}
        >
            {children}
        </Link>
    ) : (
        <button
            {...props}
            className={classNames("position-relative btn btn-icon", props.className, {
                [`btn-${color}`]: true,
                [`btn-active-${activeColor}`]: true,
                [`btn-bg-${bgColor}`]: true,
                [`btn-color-${textColor}`]: true,
                [`btn-${size}`]: true,
                "btn-link": isDense,
            })}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            {
                isLoading && (
                    <div
                        className={`position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 bg-${color || bgColor} rounded-2`}>
                        <BeatLoader
                            color='currentColor'
                            size={size === "sm" ? 5 : 10}
                        />
                    </div>
                )
            }

            {children}
        </button>
    )
}

type TIconButton = {
    children: ReactNode,
    size?: TSizes,
    color?: TColors,
    activeColor?: TColors,
    bgColor?: TColors,
    textColor?: TColors,
    href?: string,
    isDense?: boolean,
    isLoading?: boolean,
    disabled?: boolean,
    onClick?: (e: any) => void,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties,
}

export default IconButton;