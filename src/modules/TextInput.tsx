// modules
import Typography from "@/modules/Typography.tsx";

const TextInput = ({
                       name,
                       label,
                       value,
                       placeholder,
                       onChange,
                       error,
                       touched,
                       theme,
                       startAdornment,
                       endAdornment
                   }) => {
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
                    type="text"
                    placeholder={placeholder}
                    className={`form-control form-control-lg ${theme === "solid" ? "form-control-solid" : ""}`}
                    value={value}
                    onChange={onChange}
                />

                {endAdornment && endAdornment}
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

export default TextInput;