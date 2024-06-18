// libraries
import {TagsInput} from "react-tag-input-component";
import classNames from "classnames";

// styles
import "@/styles/modules/tag-input.scss";

// types
import {TTagInput} from "@/types/moduleType.ts";

const TagInput = ({name, value, placeholder = null, onChange, disabled = false, ...props}: TTagInput) => {
    return (
        <div
            {...props}
            className={classNames('position-relative w-100', props.className)}
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

export default TagInput;