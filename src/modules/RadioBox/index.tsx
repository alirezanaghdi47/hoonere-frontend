// libraries
import {CSSProperties, HTMLProps} from "react";
import classNames from "classnames";

type TRadioBox = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (value: string | null) => string | null | void,
    checked: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const RadioBox = ({name, id, checked, value, onChange, disabled = false, readOnly = false, ...props}: TRadioBox) => {
    return (
        <div
            {...props}
            className={classNames("form-check form-check-custom form-check-solid", props.className)}
        >
            <input
                type="radio"
                name={name}
                id={id}
                className="form-check-input cursor-pointer"
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default RadioBox;