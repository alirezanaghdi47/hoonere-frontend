const badgeSizes = {
    sm: "badge-sm",
    md: "",
    lg: "badge-lg",
}

const Chip = ({label, size = "md", color, circle = false}) => {
    return (
        <span className={`badge ${badgeSizes[size]} badge-${color} ${circle ? "badge-circle" : ""}`}>
            {label}
        </span>
    )
}

export default Chip;