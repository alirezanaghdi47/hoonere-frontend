// libraries

// modules
import Typography from "@/modules/Typography.tsx";

const FormGroup = ({children , ...props}) => {
    return (
        <div
            {...props}
            className="d-flex flex-column justify-content-center align-items-start gap-2 w-100"
        >
            {children}
        </div>
    )
}

const FormControl = ({children , ...props}) => {
    return (
        <label
            {...props}
            className="d-flex align-items-center gap-2 w-100"
        >
            {children}
        </label>
    )
}

const FormLabel = ({label , required , isBold , size , color , ...props}) => {
    return (
        <div
            {...props}
            className="d-flex justify-content-start align-items-center gap-2"
        >
            <Typography
                variant="p"
                size={size}
                color={color}
                isBold={isBold}
            >
                {label}
            </Typography>

            {
                required && (
                    <span className="fs-6 fw-bold text-danger">
                        *
                    </span>
                )
            }
        </div>
    )
}

const FormError = ({error, touched}) => {
    return error && touched && (
        <Typography
            variant="p"
            size="xxs"
            color="danger"
            className="mt-2"
        >
            {error}
        </Typography>
    )
}

const Form = () => null;

Form.Group = FormGroup;
Form.Control = FormControl;
Form.Label = FormLabel;
Form.Error = FormError;

export default Form;