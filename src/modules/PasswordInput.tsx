// libraries
import {useToggle} from 'usehooks-ts'

// modules
import IconButton from "@/modules/IconButton.tsx";

const PasswordInput = ({name, value, placeholder, onChange, startAdornment}) => {
    const [isVisible, onToggle] = useToggle();

    return (
        <div className='position-relative w-100'>
            {
                startAdornment && (
                    <span
                        className="position-absolute start-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
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
                className="position-absolute end-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
                  <IconButton
                      size="sm"
                      color="light"
                      onClick={onToggle}
                  >
                      <i className={`far ${isVisible ? "fa-eye-slash" : "fa-eye"} fs-4`}/>
                  </IconButton>
            </span>
        </div>
    )
}

export default PasswordInput;