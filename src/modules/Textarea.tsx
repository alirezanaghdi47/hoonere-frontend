const Textarea = ({name, value, placeholder, rows = 5, onChange , disabled, ...props}) => {
    return (
        <div
            {...props}
            className='position-relative w-100'
        >
            <textarea
                name={name}
                rows={rows}
                placeholder={placeholder}
                className="form-control form-control-solid"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

export default Textarea;