// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import Cleave from 'cleave.js/react';
import classNames from "classnames";

// utils
import {toEnglishDigits} from "@/utils/functions.ts";

const NumberInput = ({
                         id,
                         name,
                         value,
                         placeholder = null,
                         options = {},
                         onChange,
                         startAdornment = null,
                         endAdornment = null,
                         disabled = false,
                         readOnly = false,
                         ...props
                     }: TNumberInput) => {
    return (
        <div
            {...props}
            className={classNames('position-relative w-100', props.className)}
        >
            {
                startAdornment && (
                    <span
                        className="position-absolute start-0 top-0 d-flex justify-content-center align-items-center w-43px h-43px m-1">
                        {startAdornment}
                    </span>
                )
            }

            <Cleave
                id={id}
                name={name}
                placeholder={placeholder}
                className={classNames("form-control form-control-solid", {
                    "ps-15": startAdornment,
                    "pe-15": endAdornment,
                })}
                value={value}
                onChange={(e) => onChange(toEnglishDigits(e.target.rawValue))}
                options={options}
                disabled={disabled}
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
        </div>
    )
}

type TNumberInput = {
    id: string,
    name: string,
    value: string | number | null,
    placeholder?: string,
    options?: unknown,
    onChange?: (value: string | number | null) => void,
    startAdornment?: ReactNode,
    endAdornment?: ReactNode,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default NumberInput;