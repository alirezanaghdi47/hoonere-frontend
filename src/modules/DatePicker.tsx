// libraries
import DatePicker from "react-datepicker";

// modules
import Typography from "@/modules/Typography.tsx";

// styles
import "react-datepicker/dist/react-datepicker.min.css";

const DatePicker2 = ({name, label, value, placeholder ,onChange, error, touched, startAdornment, endAdornment}) => {
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

                <DatePicker
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={(date) => onChange(date)}
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

export default DatePicker2;