// libraries
import Select from 'react-select';

// modules
import Typography from "@/modules/Typography.tsx";

const SelectBox = ({name , label, value , options, onChange , error, touched}) => {
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

            {/*<input*/}
            {/*    name={name}*/}
            {/*    id={name}*/}
            {/*    type="text"*/}
            {/*    className="form-control form-control-lg form-control-solid"*/}
            {/*    value={value}*/}
            {/*    onChange={onChange}*/}
            {/*/>*/}

            <Select
                options={options}
            />

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

export default SelectBox;