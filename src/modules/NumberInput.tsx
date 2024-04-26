// libraries
import Cleave from 'cleave.js/react';

const NumberInput = ({name, value, placeholder , options, onChange, startAdornment, endAdornment}) => {
    return (
        <div className='position-relative w-100'>
            {
                startAdornment && (
                    <span className="position-absolute start-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
                        {startAdornment}
                    </span>
                )
            }

            <Cleave
                name={name}
                placeholder={placeholder}
                className={`form-control form-control-solid ${startAdornment ? 'ps-15' : ''} ${endAdornment ? 'pe-15' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.rawValue)}
                options={options}
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

export default NumberInput;