const Radiobox = ({name , id, checked, value, onChange , disabled , ...props}) => {
    return (
        <div
            {...props}
            className="form-check form-check-custom form-check-solid"
        >
            <input
                type="radio"
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

export default Radiobox;