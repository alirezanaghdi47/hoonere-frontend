// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import classNames from "classnames";
import MoonLoader from "react-spinners/MoonLoader";

// utils
import {toEnglishDigits} from "@/utils/functions.ts";

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
                       readOnly = false,
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
                onChange={(e) => onChange(toEnglishDigits((e.target.value)))}
                onBlur={(e) => onBlur(toEnglishDigits(e.target.value))}
                disabled={disabled || isLoading}
                readOnly={readOnly}
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

type TTextInput = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => void,
    onBlur?: (value: string | null) => void,
    startAdornment?: ReactNode
    endAdornment?: ReactNode,
    isLoading?: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default TextInput;