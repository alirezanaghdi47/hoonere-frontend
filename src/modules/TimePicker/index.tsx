// libraries
import {CSSProperties, HTMLProps} from "react";
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
import ReactTimePicker from "react-multi-date-picker/plugins/time_picker";

// styles
import "./index.style.scss";

const TimePicker = ({
                        id,
                        name,
                        value,
                        onChange,
                        disabled = false,
                        readOnly = false,
                        ...props
                    }: TTimePicker) => {

    const generateTimeWithSecond = (time) => {
        const [hour, minute] = time.split(":");
        return new DateObject(time).setHour(Number(hour)).setMinute(Number(minute));
    }

    const generateTimeWithoutSecond = (time) => new DateObject(time).setSecond(0).format("HH:mm:ss");

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

export default TimePicker;