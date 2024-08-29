// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import classNames from "classnames";

// modules
import Typography from "@/modules/Typography";

// types
import {TColors, TSizes} from "@/types/constant.ts";

const FormGroup = ({children, inline = false, ...props}: TFormGroup) => {
    return (
        <div
            {...props}
            className={classNames("d-flex gap-2 w-100", props.className, {
                "flex-row justify-content-start align-items-center": inline,
                "flex-column justify-content-center align-items-start": !inline,
            })}
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

type TFormGroup = {
    children: ReactNode,
    inline?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

type TFormLabel = {
    label: string,
    size: TSizes,
    color: TColors,
    required?: boolean,
    isBold?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

type TFormError = {
    error: any,
    touched: any,
    style?: CSSProperties
}

export default Form;