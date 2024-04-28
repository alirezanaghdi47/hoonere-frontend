// modules
import Typography from "@/modules/Typography.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Form from "@/modules/Form.tsx";

const Type = () => {
    const options = [
        {value: '1', label: 'first'},
        {value: '2', label: 'second'},
        {value: '3', label: 'third'}
    ];

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <Typography
                    variant="h2"
                    size="lg"
                    color="dark"
                    isBold
                >
                    وضعیت
                </Typography>

                <Form.Group>
                    <Form.Label
                        label="نوع"
                        color="dark"
                        size="sm"
                        required
                    />

                    <SelectBox
                        name="type"
                        value={options[1]}
                        options={options}
                        placeholder=""
                        isSearchable
                        onChange={value => console.log(value)}
                    />

                    <Form.Error
                        error="متن خطا"
                        touched={false}
                    />
                </Form.Group>
            </div>
        </div>
    )
}

export default Type;