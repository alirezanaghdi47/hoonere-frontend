// libraries
import classNames from "classnames";

// types
import {TTextarea} from "@/types/modules.ts";

const Textarea = ({id , name, value, placeholder = null, rows = 5, onChange, disabled = false, ...props}: TTextarea) => {
    return (
        <div
            {...props}
            className={classNames('position-relative w-100', props.className)}
        >
            <textarea
                id={id}
                name={name}
                rows={rows}
                placeholder={placeholder}
                className="form-control form-control-solid"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

export default Textarea;