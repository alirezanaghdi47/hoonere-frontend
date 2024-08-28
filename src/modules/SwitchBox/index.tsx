// libraries
import {CSSProperties, HTMLProps} from "react";
import classNames from "classnames";

type TSwitchBox = {
    id: string,
    name: string,
    value: string | number | null,
    onChange?: (value: boolean) => boolean | void,
    checked: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const SwitchBox = ({name, id, checked, value, onChange, disabled = false, readOnly = false, ...props}: TSwitchBox) => {
    return (
        <div
            {...props}
            className={classNames("form-check form-switch form-check-custom form-check-solid", props.className)}
        >
            <input
                type="checkbox"
                name={name}
                id={id}
                className="form-check-input cursor-pointer"
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default SwitchBox;