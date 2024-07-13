// libraries
import classNames from "classnames";

// types
import {TTextarea} from "@/types/moduleType.ts";

// utils
import {toEnglishDigits} from "@/utils/functions.ts";

const Textarea = ({
                      id,
                      name,
                      value,
                      placeholder = null,
                      rows = 5,
                      onChange,
                      disabled = false,
                      readOnly = false,
                      ...props
                  }: TTextarea) => {
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
                onChange={(e) => onChange(toEnglishDigits(e.target.value))}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default Textarea;