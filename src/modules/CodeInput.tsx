// libraries
import {useEffect} from "react";
import {useCountdown} from 'usehooks-ts';

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

const CodeInput = ({name, value, placeholder, onChange, startAdornment , onResend}) => {
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
        <div className='position-relative w-100'>
            {
                startAdornment && (
                    <span
                        className="position-absolute start-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
                        {startAdornment}
                    </span>
                )
            }

            <input
                name={name}
                id={name}
                type="text"
                placeholder={placeholder}
                className={`form-control form-control-lg form-control-solid ${startAdornment ? 'ps-15' : ''} pe-30`}
                value={value}
                onChange={onChange}
            />

            <span
                className="position-absolute end-0 top-0 d-flex justify-content-center align-items-center w-40px h-40px m-1">
                {
                    count > 0 ? (
                        <Typography
                            variant="span"
                            color="gray-700"
                            size="xs"
                            className="mx-auto"
                        >
                            {count}
                        </Typography>
                    ) : (
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={_handleResend}
                        >
                            <i className="far fa-refresh fs-4"/>
                        </IconButton>
                    )
                }
            </span>
        </div>
    )
}

export default CodeInput;