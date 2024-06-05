// libraries
import Select, {components} from 'react-select';
import MoonLoader from "react-spinners/MoonLoader";

// modules
import Typography from "@/modules/Typography.tsx";

// styles
import "@/styles/modules/select-box.scss";
import {LuX} from "react-icons/lu";

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

const LoadingIndicator = () => {
    return (
        <MoonLoader
            size={20}
            color="currentColor"
            className="m-1"
        />
    )
}

const ClearIndicator = () => {
    return (
        <LuX
            size={20}
            color="currentColor"
            className="text-danger"
        />
    )
}
const MultiValueRemove = () => {
    return (
        <LuX
            size={14}
            color="currentColor"
            className="text-danger"
        />
    )
}

const SelectBox = ({
                       name,
                       value,
                       options,
                       isSearchable,
                       isLoading,
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
                Placeholder,
                LoadingIndicator,
                ClearIndicator,
                MultiValueRemove
            }}
            className="react-select__container"
            classNamePrefix="react-select"
            placeholder={placeholder}
            value={options?.find(item => item.value === value)}
            onChange={(value) => isMulti ? onChange(value?.map(subValue => subValue.value)) : onChange(value.value)}
            isMulti={isMulti}
            isDisabled={disabled || isLoading}
            isLoading={isLoading}
        />
    )
}

export default SelectBox;