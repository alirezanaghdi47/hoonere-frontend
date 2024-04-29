// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";

const alertSizes = {
    icon: {
        sm: "3",
        md: "2",
        lg: "1",
    },
    message:{
        sm: "xs",
        md: "sm",
        lg: "md",
    }
}

const Alert = ({color , size , icon , message , action}) => {
    return (
        <div className={`d-flex justify-content-start align-items-center gap-5 bg-light-${color} text-${color} rounded-2 border border-dashed border-${color} p-5`}>
            {icon && icon}

            <Typography
                variant="span"
                color={color}
                size={alertSizes.message[size]}
            >
                {message}
            </Typography>

            {
                (action.href || action.onClick) && (
                    <Button
                        href={action.href}
                        textColor="primary"
                        isDense
                        isBold
                        onClick={action.onClick}
                        className="ms-auto"
                    >
                        {action.label}
                    </Button>
                )
            }
        </div>
    )
}

export default Alert;