// libraries
import classNames from "classnames";

const TextInput = ({
                       name,
                       value,
                       placeholder,
                       onChange,
                       onBlur = () => null,
                       startAdornment,
                       endAdornment,
                       disabled,
                       ...props
                   }) => {
    return (
        <div
            {...props}
            className='position-relative w-100'
        >
            {
                startAdornment && (
                    <span
                        className="position-absolute d-flex justify-content-center align-items-center w-43px h-43px m-1"
                        style={{top: 2, right: 2}}
                    >
                        {startAdornment}
                    </span>
                )
            }

            <input
                name={name}
                type="text"
                placeholder={placeholder}
                className={classNames("form-control form-control-solid", {
                    "ps-15": startAdornment,
                    "pe-15": endAdornment,
                })}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={(e) => onBlur(e.target.value)}
                disabled={disabled}
            />

            {
                endAdornment && (
                    <span
                        className="position-absolute d-flex justify-content-center align-items-center w-43px h-43px m-1"
                        style={{top: 2, left: 2}}
                    >
                        {endAdornment}
                    </span>
                )
            }
        </div>
    )
}

export default TextInput;