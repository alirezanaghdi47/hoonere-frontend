// libraries
import {useToggle} from 'usehooks-ts'
import {LuEye, LuEyeOff} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";

const PasswordInput = ({name, value, placeholder, onChange, startAdornment}) => {
    const [isVisible, onToggle] = useToggle();

    return (
        <div className='position-relative w-100'>
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
                type={isVisible ? "text" : 'password'}
                placeholder={placeholder}
                className={`form-control form-control-solid ${startAdornment ? 'ps-15' : ''}`}
                value={value}
                onChange={onChange}
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