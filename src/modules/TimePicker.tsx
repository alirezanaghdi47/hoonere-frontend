// libraries
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
import ReactTimePicker from "react-multi-date-picker/plugins/time_picker";

// styles
import "@/styles/modules/time-picker.scss";

// types
import {TTimePicker} from "@/types/moduleType.ts";

const TimePicker = ({
                        id,
                        name,
                        value,
                        onChange,
                        disabled = false,
                        readOnly = false,
                        ...props
                    }: TTimePicker) => {
    const [hour, minute] = value.split(":");

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
            value={value ? new DateObject().setHour(parseInt(hour)).setMinute(parseInt(minute)) : null}
            onChange={(value) => onChange(new DateObject(value).format("HH:mm"))}
            editable={false}
            format="HH:mm"
            arrow={false}
            disabled={disabled}
            readOnly={readOnly}
            className="abcdefg"
        />
    )
}

export default TimePicker;