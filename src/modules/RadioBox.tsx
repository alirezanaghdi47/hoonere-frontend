// libraries
import classNames from "classnames";

// types
import {TRadioBox} from "@/types/modules.ts";


const RadioBox = ({name , id, checked, value, onChange , disabled = false , ...props}: TRadioBox) => {
    return (
        <div
            {...props}
            className={classNames("form-check form-check-custom form-check-solid" , props.className)}
        >
            <input
                type="radio"
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

export default RadioBox;