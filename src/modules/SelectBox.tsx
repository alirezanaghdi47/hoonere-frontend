// libraries
import Select from 'react-select';

// styles
import "@/styles/modules/select-box.scss";

const SelectBox = ({name, value, options, isSearchable = false, isMulti = false, placeholder, onChange}) => {
    return (
        <Select
            name={name}
            options={options}
            isSearchable={isSearchable}
            components={{
                // Control: (props) => (
                //     <input className="form-control form-control-solid" {...props}/>
                // ),
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
                NoOptionsMessage: () => (
                    <div className="d-flex justify-content-center align-items-center w-100 py-8">
                        <span className="fs-6 fw-bold text-muted">داده ای یافت نشد</span>
                    </div>
                )
            }}
            className="react-select__container"
            classNamePrefix="react-select"
            placeholder={placeholder ? placeholder : ""}
            value={value}
            onChange={onChange}
            isMulti={isMulti}
        />
    )
}

export default SelectBox;