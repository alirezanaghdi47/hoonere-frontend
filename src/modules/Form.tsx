// libraries
import classNames from "classnames";

// modules
import Typography from "@/modules/Typography.tsx";

// types
import {TFormError, TFormLabel} from "@/types/modules.ts";

const FormGroup = ({children, ...props}) => {
    return (
        <div
            {...props}
            className={classNames("d-flex flex-column justify-content-center align-items-start gap-2 w-100", props.className)}
        >
            {children}
        </div>
    )
}

const FormControl = ({children, ...props}) => {
    return (
        <label
            {...props}
            className={classNames("d-flex align-items-center gap-2 w-100", props.className)}
        >
            {children}
        </label>
    )
}

const FormLabel = ({label, required = false, isBold = false, size, color, ...props}: TFormLabel) => {
    return (
        <div
            {...props}
            className={classNames("d-flex justify-content-start align-items-center gap-2", props.className)}
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

const FormError = ({error, touched}: TFormError) => {
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