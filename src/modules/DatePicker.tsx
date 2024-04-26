// libraries
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import georgian_en from "react-date-object/locales/gregorian_en";

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
            onChange={(value) => onChange(value)}
            renderButton={(direction, handleClick) => (
                <button
                    className='btn btn-icon btn-sm btn-light'
                    onClick={handleClick}
                >
                    {
                        direction === "right" ? (
                            <i className="far fa-chevron-left fs-6"/>
                        ) : (
                            <i className="far fa-chevron-right fs-6"/>
                        )
                    }
                </button>
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