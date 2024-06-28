// libraries
import classNames from "classnames";

// types
import {TSwitchBox} from "@/types/moduleType.ts";

const SwitchBox = ({name , id, checked, value, onChange , disabled = false , ...props}: TSwitchBox) => {
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
            />
        </div>
    )
}

export default SwitchBox;