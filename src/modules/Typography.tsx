// libraries
import classNames from "classnames";

const typographySizes = {
    xxs: "7",
    xs: "6",
    sm: "5",
    md: "4",
    lg: "3",
    xl: "2",
    xxl: "1",
}

const Typography = ({children, variant = "p", size, color, isBold, ...props}) => {
    const Tag = `${variant}`;

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