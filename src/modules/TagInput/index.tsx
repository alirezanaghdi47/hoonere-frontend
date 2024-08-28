// libraries
import {CSSProperties, HTMLProps} from "react";
import {TagsInput} from "react-tag-input-component";
import classNames from "classnames";

// styles
import "./index.style.scss";

type TTagInput = {
    id: string,
    name: string,
    value: string[] | null,
    placeholder?: string,
    onChange?: (value: string[] | null) => string[] | null,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const TagInput = ({name, value, placeholder = null, onChange, disabled = false , readOnly = false, ...props}: TTagInput) => {
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
                disabled={disabled || readOnly}
            />
        </div>
    )
}

export default TagInput;