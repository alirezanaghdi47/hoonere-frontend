// libraries
import classNames from "classnames";

const Chip = ({label, size = "md", color, circle , ...props}) => {
    return (
        <span
            className={classNames("badge" , props.className , {
                [`badge-${size}`]: true,
                [`badge-${color}`]: true,
                "badge-circle": circle,
            })}
        >
            {label}
        </span>
    )
}

export default Chip;