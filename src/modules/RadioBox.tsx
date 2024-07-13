// libraries
import classNames from "classnames";

// types
import {TRadioBox} from "@/types/moduleType.ts";

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