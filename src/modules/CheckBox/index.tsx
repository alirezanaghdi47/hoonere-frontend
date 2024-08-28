// libraries
import {CSSProperties, HTMLProps} from "react";
import classNames from "classnames";

type TCheckBox = {
    id: string,
    name: string,
    checked: boolean,
    value: string | number  | boolean| null,
    onChange?: (value: string | number | boolean | null) => string | number | boolean | null | void,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const CheckBox = ({
                      name,
                      id,
                      checked,
                      value,
                      onChange,
                      disabled = false,
                      readOnly = false,
                      ...props
                  }: TCheckBox) => {
    return (
        <div
            {...props}
            className={classNames("form-check form-check-custom form-check-solid", props.className)}
        >
            <input
                type="checkbox"
                name={name}
                id={id}
                className="form-check-input cursor-pointer"
                value={value as string}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default CheckBox;