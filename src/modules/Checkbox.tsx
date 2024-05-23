const Checkbox = ({name , id, checked, value, onChange , disabled , ...props}) => {
    return (
        <div
            {...props}
            className="form-check form-check-custom form-check-solid"
        >
            <input
                type="checkbox"
                name={name}
                id={id}
                className="form-check-input"
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

export default Checkbox;