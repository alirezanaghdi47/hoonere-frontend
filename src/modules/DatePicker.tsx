// libraries
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import georgian_en from "react-date-object/locales/gregorian_en";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";

// styles
import "@/styles/modules/date-picker.scss";

// utils
import {toEnglishDigits} from "@/utils/functions.js";

const DatePicker = ({name, value, onChange, range, minDate, maxDate, disabled, readOnly, holidayDates = []}) => {
    return (
        <ReactDatePicker
            name={name}
            inputClass="form-control form-control-solid w-100"
            containerClassName="w-100"
            calendar={persian}
            locale={persian_fa}
            value={value}
            range={range}
            multiple={false}
            minDate={minDate ? new DateObject({
                date: minDate,
                locale: georgian_en,
                calendar: persian
            }).format("YYYY/MM/DD") : null}
            maxDate={maxDate ? new DateObject({
                date: maxDate,
                locale: georgian_en,
                calendar: persian
            }).format("YYYY/MM/DD") : null}
            onChange={(value) => onChange(new DateObject({
                date: value,
                locale: georgian_en,
                calendar: persian
            }).format("YYYY/MM/DD"))}
            renderButton={(direction, handleClick) => (
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
            )}
            mapDays={({date}) => {
                let color;

                const formattedDate = new DateObject({
                    date: date,
                    locale: georgian_en,
                    calendar: persian
                }).format("YYYY/MM/DD");

                if (holidayDates.includes(toEnglishDigits(formattedDate))) color = "red";

                if (color) return {className: "highlight highlight-" + color};
            }}
            format="YYYY/MM/DD"
            arrow={false}
            dateSeparator=" تا "
            monthYearSeparator=" | "
            disabled={disabled}
            readOnly={readOnly}
        />
    )
}

export default DatePicker;