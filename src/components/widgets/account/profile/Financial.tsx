// modules
import NumberInput from "@/modules/NumberInput.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";

const Financial = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره کارت"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                name="bankCardNumber"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    blocks: [4, 4, 4, 4],
                                    delimiter: '-',
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

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره شبا"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                name="IBAN"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    blocks: [3, 2, 3, 1, 18],
                                    delimiter: '',
                                    prefix: "IR-"
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

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره حساب"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                name="bankAccountNumber"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    blocks: [18],
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

                <div className="row gy-2">
                    <div className="col-12 d-flex justify-content-end align-items-center">
                        <Button
                            color="primary"
                            onClick={() => console.log("submit")}
                        >
                            ذخیره تغییرات
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Financial;