// modules
import Typography from "@/modules/Typography.tsx";

const TextInput = ({name , label, value , placeholder, onChange , error, touched , theme}) => {
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

            <input
                name={name}
                id={name}
                type="text"
                placeholder={placeholder}
                className={`form-control form-control-lg ${theme === "solid" ? "form-control-solid" : ""}`}
                value={value}
                onChange={onChange}
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

export default TextInput;