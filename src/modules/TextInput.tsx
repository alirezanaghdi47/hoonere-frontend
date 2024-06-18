// libraries
import classNames from "classnames";
import MoonLoader from "react-spinners/MoonLoader";

// types
import {TTextInput} from "@/types/moduleType.ts";

const TextInput = ({
                       id,
                       name,
                       value,
                       placeholder,
                       onChange,
                       onBlur = () => null,
                       startAdornment = null,
                       endAdornment = null,
                       isLoading = false,
                       disabled = false,
                       ...props
                   }: TTextInput) => {
    return (
        <div
            {...props}
            className={classNames('position-relative w-100' , props.className)}
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
                id={id}
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
                disabled={disabled || isLoading}
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

            {
                isLoading && (
                    <span
                        className="position-absolute d-flex justify-content-center align-items-center w-43px h-43px m-1"
                        style={{top: 2, left: 2}}
                    >
                        <MoonLoader
                            size={20}
                            color="currentColor"
                            className="m-1"
                        />
                    </span>
                )
            }
        </div>
    )
}

export default TextInput;