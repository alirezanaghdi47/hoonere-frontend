// libraries
import {useToggle} from 'usehooks-ts'

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

const PasswordInput = ({name, label, value, placeholder, onChange, error, touched, theme , startAdornment}) => {
    const [isVisible, onToggle] = useToggle();

    return (
        <div className="d-flex flex-column justify-content-start align-items-start w-100 gap-2">
            {
                label && (
                    <Typography
                        variant="label"
                        color="gray-700"
                        size="xs"
                        isBold
                    >
                        {label}
                    </Typography>
                )
            }

            <div className='position-relative w-100'>
                {startAdornment && startAdornment}

                <input
                    name={name}
                    id={name}
                    type={isVisible ? "text" : 'password'}
                    placeholder={placeholder}
                    className={`form-control form-control-lg ${theme === "solid" ? "form-control-solid" : ""}`}
                    value={value}
                    onChange={onChange}
                />

                <IconButton
                    icon={`far ${isVisible ? "fa-eye-slash" : "fa-eye"}`}
                    size="sm"
                    color="light"
                    className="position-absolute top-0 end-0 m-2"
                    onClick={onToggle}
                />
            </div>

            {
                error && touched && (
                    <Typography
                        variant="p"
                        color="danger"
                        size="xs"
                    >
                        {error}
                    </Typography>
                )
            }
        </div>
    )
}

export default PasswordInput;