// libraries
import {CSSProperties, ReactNode, useEffect} from "react";
import {useCountdown} from 'usehooks-ts';
import {LuRefreshCw} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import NumberInput from "@/modules/NumberInput";

const CodeInput = ({
                       id,
                       name,
                       value,
                       placeholder = null,
                       onChange,
                       startAdornment = null,
                       onResend,
                       disabled = false,
                       readOnly = false,
                       ...props
                   }: TCodeInput) => {
    const [count, {startCountdown, resetCountdown}] = useCountdown({
        countStart: 120,
        intervalMs: 1000,
    });

    const resend = () => {
        resetCountdown();
        startCountdown();
        onResend();
    }

    useEffect(() => {
        startCountdown();
    }, []);

    return (
        <div
            {...props}
            className='position-relative w-100'
        >

            <NumberInput
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                startAdornment={startAdornment}
                disabled={disabled}
                readOnly={readOnly}
            />

            <span
                className="position-absolute end-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
                {
                    count > 0 ? (
                        <Typography
                            variant="span"
                            color="muted"
                            size="xs"
                            className="mx-auto"
                        >
                            {count}
                        </Typography>
                    ) : (
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={resend}
                        >
                            <LuRefreshCw
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    )
                }
            </span>
        </div>
    )
}

type TCodeInput = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => void,
    startAdornment?: ReactNode,
    onResend: () => void,
    disabled?: boolean,
    readOnly?: boolean,
    style?: CSSProperties
}

export default CodeInput;