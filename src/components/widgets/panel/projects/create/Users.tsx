// modules
import Typography from "@/modules/Typography.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Form from "@/modules/Form.tsx";

const Users = () => {
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
                    اعضاء
                </Typography>

                <ul className="d-flex flex-column justify-content-start align-items-start w-100 gap-5 list-style-none p-0 m-0">
                    <li className='w-100'>
                        <Form.Group>
                            <Form.Label
                                label="کارفرما"
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
                    </li>

                    <li className='w-100'>
                        <Form.Group>
                            <Form.Label
                                label="سرمایه گذار"
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
                    </li>

                    <li className='w-100'>
                        <Form.Group>
                            <Form.Label
                                label="تهیه کننده"
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
                    </li>

                    <li className='w-100'>
                        <Form.Group>
                            <Form.Label
                                label="مجری طرح"
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
                    </li>

                    <li className='w-100'>
                        <Form.Group>
                            <Form.Label
                                label="ناظر"
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
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Users;