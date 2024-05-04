const TextInput = ({name, value, placeholder, onChange, startAdornment, endAdornment}) => {
    return (
        <div className='position-relative w-100'>
            {
                startAdornment && (
                    <span
                        className="position-absolute d-flex justify-content-center align-items-center w-43px h-43px m-1"
                        style={{top: 2, right: 2}}
                    >
                        {startAdornment}
                    </span>
                )
            }

            <input
                name={name}
                type="text"
                placeholder={placeholder}
                className={`form-control form-control-solid ${startAdornment ? 'ps-15' : ''} ${endAdornment ? 'pe-15' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {
                endAdornment && (
                    <span
                        className="position-absolute d-flex justify-content-center align-items-center w-43px h-43px m-1"
                        style={{top: 2, left: 2}}
                    >
                        {endAdornment}
                    </span>
                )
            }
        </div>
    )
}

export default TextInput;