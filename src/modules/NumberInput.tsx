// modules
import Typography from "@/modules/Typography.tsx";

const NumberInput = ({name, label, value, placeholder, onChange, error, touched, theme}) => {
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

            <input
                name={name}
                id={name}
                type="text"
                placeholder={placeholder}
                className={`form-control form-control-lg ${theme === "solid" ? "form-control-solid" : ""}`}
                value={value}
                onChange={onChange}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
            />

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

export default NumberInput;