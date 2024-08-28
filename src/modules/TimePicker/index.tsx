// libraries
import {CSSProperties, HTMLProps} from "react";
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
import ReactTimePicker from "react-multi-date-picker/plugins/time_picker";

// styles
import "./index.style.scss";

// utils
import {generateTimeWithoutSecond, generateTimeWithSecond} from "@/utils/functions.ts";

type TTimePicker = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (value: DateObject | DateObject[] | string) => void,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const TimePicker = ({
                        id,
                        name,
                        value,
                        onChange,
                        disabled = false,
                        readOnly = false,
                        ...props
                    }: TTimePicker) => {

    return (
        <ReactDatePicker
            {...props}
            id={id}
            name={name}
            inputClass="form-control form-control-solid w-100"
            containerClassName="w-100"
            disableDayPicker
            plugins={[
                <ReactTimePicker hideSeconds/>
            ]}
            value={value ? generateTimeWithSecond(value) : ""}
            onChange={(value) => onChange(generateTimeWithoutSecond(value))}
            editable={false}
            format="HH:mm"
            arrow={false}
            disabled={disabled}
            readOnly={readOnly}
        />
    )
}

export default TimePicker;