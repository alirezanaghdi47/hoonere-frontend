// libraries
import Select , {components} from 'react-select';

// modules
import Typography from "@/modules/Typography.tsx";

// styles
import "@/styles/modules/select-box.scss";

const NoOptionsMessage = () => (
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
);

const Placeholder = (props) => (
    <components.Placeholder {...props}>
        <Typography
            variant="p"
            size=""
            color="muted"
            isBold
        >
            {props.placeholder}
        </Typography>
    </components.Placeholder>
)

const SelectBox = ({
                       name,
                       value,
                       options,
                       isSearchable,
                       isMulti,
                       disabled,
                       placeholder,
                       onChange,
                   }) => {
    return (
        <Select
            name={name}
            options={options}
            isSearchable={isSearchable}
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
                NoOptionsMessage,
                Placeholder
            }}
            className="react-select__container"
            classNamePrefix="react-select"
            placeholder={placeholder}
            value={options?.find(item => item.value === value)}
            onChange={(value) => onChange(value.value)}
            isMulti={isMulti}
            isDisabled={disabled}
        />
    )
}

export default SelectBox;