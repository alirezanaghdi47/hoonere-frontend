const Textarea = ({name, value, placeholder, rows = 5, onChange}) => {
    return (
        <textarea
            name={name}
            rows={rows}
            placeholder={placeholder}
            className="form-control form-control-solid"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default Textarea;