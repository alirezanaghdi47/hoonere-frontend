// modules
import Typography from "@/modules/Typography.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";

const TypeInfo = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <Typography
                    variant="h2"
                    size="md"
                    color="dark"
                    isBold
                >
                    زمان بندی
                </Typography>

                <div className="row g-5">
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label
                                label="تعداد قسمت ها"
                                required
                                size="xs"
                                color="dark"
                            />

                            <NumberInput
                                name="bankCardNumber"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    blocks: [3],
                                    delimiter: '',
                                }}
                                onChange={(value) => console.log(value)}
                            />

                            <Form.Error
                                error="متن خطا"
                                touched={false}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-6">
                        <Form.Group>
                            <Form.Label
                                label="مدت زمان هر قسمت ( دقیقه )"
                                required
                                size="xs"
                                color="dark"
                            />

                            <NumberInput
                                name="bankCardNumber"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    blocks: [3],
                                    delimiter: '',
                                }}
                                onChange={(value) => console.log(value)}
                            />

                            <Form.Error
                                error="متن خطا"
                                touched={false}
                            />
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypeInfo;