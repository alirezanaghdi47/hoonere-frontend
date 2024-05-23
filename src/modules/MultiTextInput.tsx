// libraries
import {TagsInput} from "react-tag-input-component";

// styles
import "@/styles/modules/multi-text-input.scss";

const MultiTextInput = ({name, value, placeholder, onChange, disabled, ...props}) => {
    return (
        <div
            {...props}
            className='position-relative w-100'
        >
            <TagsInput
                name={name}
                value={value}
                placeHolder={placeholder}
                onChange={(value) => onChange(value)}
                disabled={disabled}
            />
        </div>
    )
}

export default MultiTextInput;