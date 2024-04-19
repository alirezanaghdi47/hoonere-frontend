// libraries
import {useEffect} from "react";
import {useCountdown} from 'usehooks-ts';

// modules
import Button from "@/modules/Button.tsx";
import Typography from "@/modules/Typography.tsx";

const CodeInput = ({
                       name,
                       label,
                       value,
                       placeholder,
                       onChange,
                       onResend,
                       error,
                       touched,
                       theme,
                       startAdornment,
                       endAdornment
                   }) => {
    const [count, {startCountdown, resetCountdown}] = useCountdown({
        countStart: 120,
        intervalMs: 1000,
    });

    const _handleResend = () => {
        resetCountdown();
        startCountdown();
        onResend();
    }

    useEffect(() => {
        startCountdown();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-start align-items-start w-100 gap-2">
            <div className={`d-flex justify-content-${label ? "between" : "end"} align-items-center w-100`}>
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

                {
                    count > 0 ? (
                        <Typography
                            variant="span"
                            color="gray-700"
                            isBold
                            size="sm"
                        >
                            {count}
                            &nbsp;
                            <Typography
                                variant="span"
                                color="gray-700"
                                size="xs"
                            >
                                ثانیه
                            </Typography>
                        </Typography>
                    ) : (
                        <Button
                            textColor="primary"
                            isDense
                            startIcon="far fa-refresh"
                            onClick={_handleResend}
                        >
                            ارسال مجدد کد
                        </Button>
                    )
                }
            </div>

            <div className='position-relative w-100'>
                {startAdornment && startAdornment}

                <input
                    name={name}
                    id={name}
                    type="text"
                    placeholder={placeholder}
                    className={`form-control form-control-lg ${theme === "solid" ? "form-control-solid" : ""}`}
                    value={value}
                    onChange={onChange}
                />

                {endAdornment && endAdornment}
            </div>

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

export default CodeInput;