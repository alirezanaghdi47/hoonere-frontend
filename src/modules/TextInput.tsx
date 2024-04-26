const TextInput = ({name, value, placeholder, onChange, startAdornment, endAdornment}) => {
    return (
        <div className='position-relative w-100'>
            {
                startAdornment && (
                    <span className="position-absolute start-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
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
                onChange={onChange}
            />

            {
                endAdornment && (
                    <span className="position-absolute end-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
                        {endAdornment}
                    </span>
                )
            }
        </div>
    )
}

export default TextInput;