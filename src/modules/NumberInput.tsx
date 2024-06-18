// libraries
import Cleave from 'cleave.js/react';
import classNames from "classnames";

// types
import {TNumberInput} from "@/types/moduleType.ts";

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
                onChange={(e) => onChange(e.target.rawValue)}
                options={options}
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

export default NumberInput;