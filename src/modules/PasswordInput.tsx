// libraries
import {useToggle} from 'usehooks-ts'

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

const PasswordInput = ({name, label, value, placeholder, onChange, error, touched, theme}) => {
    const [isVisible, onToggle] = useToggle();

    return (
        <div className="flex flex-column justify-start items-start w-full gap-2">
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

            <div className='relative w-full'>
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
                    className="absolute top-2 end-3"
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