// modules
import Typography from "@/modules/Typography.tsx";

const Alert = ({color , size , icon , message}) => {
    return (
        <div className={`d-flex justify-content-start align-items-center gap-5 bg-light-${color} text-${color} rounded-2 border border-dashed border-${color} p-5`}>
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