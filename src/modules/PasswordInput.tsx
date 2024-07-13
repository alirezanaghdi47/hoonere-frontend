// libraries
import {useToggle} from 'usehooks-ts'
import classNames from "classnames";
import {LuEye, LuEyeOff} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";

// types
import {TPasswordInput} from "@/types/moduleType.ts";

// utils
import {toEnglishDigits} from "@/utils/functions.ts";

const PasswordInput = ({
                           id,
                           name,
                           value,
                           placeholder = null,
                           onChange,
                           startAdornment = null,
                           disabled = false,
                           readOnly = false,
                           ...props
                       }: TPasswordInput) => {
    const [isVisible, onToggle] = useToggle();

    return (
        <div
            {...props}
            className={classNames('position-relative w-100', props.className)}
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
                type={isVisible ? "text" : 'password'}
                placeholder={placeholder}
                className={classNames("form-control form-control-solid", {
                    "ps-15": startAdornment
                })}
                value={value}
                onChange={(e) => onChange(toEnglishDigits(e.target.value))}
                disabled={disabled}
                readOnly={readOnly}
            />

            <span
                className="position-absolute d-flex justify-content-center align-items-center w-43px h-43px m-1"
                style={{top: 2, left: 2}}
            >
                  <IconButton
                      size="sm"
                      color="light"
                      onClick={onToggle}
                  >
                      {
                          isVisible ? (
                              <LuEyeOff
                                  size={20}
                                  color="currentColor"
                              />
                          ) : (
                              <LuEye
                                  size={20}
                                  color="currentColor"
                              />
                          )
                      }
                  </IconButton>
            </span>
        </div>
    )
}

export default PasswordInput;