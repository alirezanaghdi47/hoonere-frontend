// libraries
import classNames from "classnames";

// types
import {TCheckBox} from "@/types/modules.ts";

const Checkbox = ({name , id, checked, value, onChange , disabled = false , ...props}: TCheckBox) => {
    return (
        <div
            {...props}
            className={classNames("form-check form-check-custom form-check-solid" , props.className)}
        >
            <input
                type="checkbox"
                name={name}
                id={id}
                className="form-check-input"
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

export default Checkbox;