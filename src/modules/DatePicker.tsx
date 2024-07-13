// libraries
import ReactDatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";

// styles
import "@/styles/modules/date-picker.scss";

// types
import {TDatePicker} from "@/types/moduleType.ts";

// utils
import {convertGregorianToJalali, convertJalaliToGregorian} from "@/utils/functions.ts";

const RenderButton = ({direction, handleClick}) => {
    return (
        <IconButton
            size="sm"
            color="light"
            onClick={handleClick}
        >
            {
                direction === "right" ? (
                    <LuChevronLeft
                        size={20}
                        color="currentColor"
                    />
                ) : (
                    <LuChevronRight
                        size={20}
                        color="currentColor"
                    />
                )
            }
        </IconButton>
    )
}

const DatePicker = ({
                        id,
                        name,
                        value,
                        onChange,
                        range = false,
                        minDate = null,
                        maxDate = null,
                        disabled = false,
                        readOnly = false,
                        holidayDates = [],
                        ...props
                    }: TDatePicker) => {

    const customizeDays = (date) => {
        let color;

        if (holidayDates.includes(convertGregorianToJalali(date))) color = "red";

        if (color) return {className: "highlight highlight-" + color};
    }

    return (
        <ReactDatePicker
            {...props}
            id={id}
            name={name}
            inputClass="form-control form-control-solid w-100"
            containerClassName="w-100"
            calendar={persian}
            locale={persian_fa}
            value={value ? convertGregorianToJalali(value) : ""}
            range={range}
            multiple={false}
            minDate={minDate ? convertGregorianToJalali(minDate) : ""}
            maxDate={maxDate ? convertGregorianToJalali(maxDate) : ""}
            onChange={(value) => onChange(convertJalaliToGregorian(value))}
            renderButton={(direction, handleClick) => (
                <RenderButton
                    direction={direction}
                    handleClick={handleClick}
                />
            )}
            mapDays={({date}) => customizeDays(date)}
            editable={false}
            format="YYYY-MM-DD"
            arrow={false}
            dateSeparator=" تا "
            monthYearSeparator=" | "
            disabled={disabled}
            readOnly={readOnly}
        />
    )
}

export default DatePicker;