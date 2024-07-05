// libraries
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
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
import {toEnglishDigits} from "@/utils/functions.js";

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

        const formattedDate = new DateObject({
            date: date,
            locale: persian_fa,
            calendar: persian
        }).format("YYYY-MM-DD");

        if (holidayDates.includes(toEnglishDigits(formattedDate))) color = "red";

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
            value={value ? new DateObject({
                date: value,
                locale: persian_fa,
                calendar: persian
            }).format("YYYY-MM-DD") : null}
            range={range}
            multiple={false}
            minDate={minDate ? new DateObject({
                date: minDate,
                locale: persian_fa,
                calendar: persian
            }).format("YYYY-MM-DD") : null}
            maxDate={maxDate ? new DateObject({
                date: maxDate,
                locale: persian_fa,
                calendar: persian
            }).format("YYYY-MM-DD") : null}
            onChange={(value) => onChange(new DateObject({
                date: value,
                locale: persian_fa,
                calendar: persian
            }).format("YYYY-MM-DD"))}
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