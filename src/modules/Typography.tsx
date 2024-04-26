const typographySizes = {
    xxs: "7",
    xs: "6",
    sm: "5",
    md: "4",
    lg: "3",
    xl: "2",
    xxl: "1",
}

const Typography = ({children , variant , size , color , isBold , ...props}) => {
    const Tag = `${variant}`;

    return (
        <Tag className={`d-flex align-items-center fs-${typographySizes[size]} text-${color} ${isBold ? "fw-bold" : "fw-normal"} mb-0 ${props.className}`}>
            {children}
        </Tag>
    )
}

export default Typography;