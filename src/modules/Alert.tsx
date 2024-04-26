// modules
import Typography from "@/modules/Typography.tsx";
import Button from "@/modules/Button.tsx";

const alertSizes = {
    icon: {
        sm: "3",
        md: "2",
        lg: "1",
    },
    title: {
        sm: "sm",
        md: "md",
        lg: "lg",
    },
    message:{
        sm: "xxs",
        md: "xs",
        lg: "sm",
    }
}

const Alert = ({color , size , icon , title , message , action}) => {
    return (
        <div className={`d-flex bg-light-warning rounded-2 border border-dashed border-${color} p-6`}>
            {
                icon && (
                    <i className={`${icon} fs-${alertSizes.icon[size]} text-${color} me-5`}/>
                )
            }

            <div className="d-flex flex-column justify-content-center align-items-start w-100 gap-2">
                <Typography
                    variant="span"
                    color={color}
                    size={alertSizes.title[size]}
                    isBold
                >
                    {title}
                </Typography>

                <div className="d-flex justify-content-start align-items-center gap-5">
                    <Typography
                        variant="span"
                        color="muted"
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
                            >
                                {action.label}
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert;