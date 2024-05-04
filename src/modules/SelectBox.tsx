// libraries
import Select from 'react-select';

// modules
import Typography from "@/modules/Typography.tsx";

// styles
import "@/styles/modules/select-box.scss";

const SelectBox = ({name, value, options, isSearchable = false, isMulti = false, disabled, placeholder, onChange}) => {
    return (
        <Select
            name={name}
            options={options}
            isSearchable={isSearchable}
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
                NoOptionsMessage: () => (
                    <div className="d-flex justify-content-center align-items-center w-100 py-8">
                        <Typography
                            variant="p"
                            size=""
                            color="muted"
                            isBold
                        >
                            داده ای یافت نشد
                        </Typography>
                    </div>
                )
            }}
            className="react-select__container"
            classNamePrefix="react-select"
            placeholder={placeholder ? placeholder : ""}
            value={options?.find(item => item.value === value)}
            onChange={(value) => onChange(value.value)}
            isMulti={isMulti}
            isDisabled={disabled}
        />
    )
}

export default SelectBox;