// libraries
import DatePicker from "react-datepicker";

// modules
import Typography from "@/modules/Typography.tsx";

// styles
import "react-datepicker/dist/react-datepicker.min.css";

const DatePicker2 = ({name , label, value, onChange , error, touched}) => {
    return (
        <div className="flex flex-column justify-start items-start w-full gap-2">
            {
                label && (
                    <Typography
                        variant="label"
                        color="gray-700"
                        size="xs"
                        isBold
                    >
                        {label}
                    </Typography>
                )
            }

            <DatePicker
                value={value}
                onChange={(date) => console.log(date)}
            />

            {/*<input*/}
            {/*    name={name}*/}
            {/*    id={name}*/}
            {/*    type="text"*/}
            {/*    className="form-control form-control-lg form-control-solid"*/}
            {/*    value={value}*/}
            {/*    onChange={onChange}*/}
            {/*/>*/}

            {
                error && touched && (
                    <Typography
                        variant="p"
                        color="danger"
                        size="xs"
                    >
                        {error}
                    </Typography>
                )
            }
        </div>
    )
}

export default DatePicker2;