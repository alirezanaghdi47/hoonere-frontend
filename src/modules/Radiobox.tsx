const Radiobox = ({name , id, checked, value, onChange , ...props}) => {
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
            />
        </div>
    )
}

export default Radiobox;