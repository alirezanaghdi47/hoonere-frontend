// libraries
import Select, {components} from 'react-select';
import classNames from "classnames";
import MoonLoader from "react-spinners/MoonLoader";
import {LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";

// styles
import "@/styles/modules/select-box.scss";

// types
import {TSelectBox} from "@/types/moduleType.ts";

const NoOptionsMessage = () => (
    <div className="d-flex justify-content-center align-items-center w-100 py-8">
        <Typography
            variant="p"
            size="sm"
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
            size="sm"
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
                       placeholder = null,
                       options,
                       isSearchable = false,
                       isLoading = false,
                       isMulti = false,
                       disabled = false,
                       readOnly = false,
                       onChange,
                       ...props
                   }: TSelectBox) => {
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
            className={classNames("react-select__container", props.className)}
            classNamePrefix="react-select"
            placeholder={placeholder}
            value={options?.find(item => item.value === value) || ""}
            // @ts-ignore
            onChange={(value) => isMulti ? onChange(value?.map(subValue => subValue.value)) : onChange(value.value)}
            menuPosition="fixed"
            menuPlacement="auto"
            isMulti={isMulti}
            isDisabled={disabled || isLoading || readOnly}
            isLoading={isLoading}
        />
    )
}

export default SelectBox;