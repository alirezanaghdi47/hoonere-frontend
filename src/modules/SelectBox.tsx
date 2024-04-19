// libraries
import Select from 'react-select';

// modules
import Typography from "@/modules/Typography.tsx";

const SelectBox = ({name, label, value, options , placeholder, onChange, error, touched, startAdornment, endAdornment}) => {
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

                <Select
                    name={name}
                    options={options}
                    value={value}
                    placeholder={placeholder}
                    onChange={(newValue) => onChange(newValue)}
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

export default SelectBox;