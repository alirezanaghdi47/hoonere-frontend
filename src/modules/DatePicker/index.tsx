// libraries
import {CSSProperties, HTMLProps} from "react";
import ReactDatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton";

// styles
import "./index.style.scss";

type TDatePicker = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (value: DateObject | DateObject[] | string) => void,
    minDate?: string | null,
    maxDate?: string | null,
    range?: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    holidayDates?: string[]
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

// utils
import { toEnglishDigits} from "@/utils/functions.ts";

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

    const convertJalaliToGregorian = (date): string => new DateObject({
        date: date,
        format: "YYYY-MM-DD",
        calendar: persian,
        locale: persian_fa
    }).convert(gregorian, gregorian_en).format("YYYY-MM-DD");

    const convertGregorianToJalali = (date): string => new DateObject({
        date: date,
        format: "YYYY-MM-DD",
        calendar: gregorian,
        locale: gregorian_en
    }).convert(persian, persian_fa).format("YYYY-MM-DD");

    const customizeDays = (date) => {
        let color;

        if (holidayDates.includes(toEnglishDigits(convertGregorianToJalali(date)))) color = "red";

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
            minDate={minDate ? toEnglishDigits(convertGregorianToJalali(minDate)) : ""}
            maxDate={maxDate ? toEnglishDigits(convertGregorianToJalali(maxDate)) : ""}
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