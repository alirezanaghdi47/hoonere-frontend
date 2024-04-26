// modules

import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Textarea from "@/modules/Textarea.tsx";

const Intro = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <Typography
                    variant="h2"
                    size="md"
                    color="dark"
                    isBold
                >
                    معرفی
                </Typography>

                <ul className="d-flex flex-column justify-content-start align-items-start w-100 gap-5 list-style-none p-0 m-0">
                    <li className="w-100">
                        <Form.Group>
                            <Form.Label
                                label="عنوان"
                                color="dark"
                                size="xs"
                                required
                            />

                            <TextInput
                                name="title"
                                value={null}
                                onChange={(e) => console.log(e.target.value)}
                            />

                            <Form.Error
                                error="متن خطا"
                                touched={false}
                            />
                        </Form.Group>
                    </li>

                    <li className="w-100">
                        <Form.Group>
                            <Form.Label
                                label="توضیحات"
                                color="dark"
                                size="xs"
                                required
                            />

                            <Textarea
                                name="description"
                                value={null}
                                onChange={(e) => console.log(e.target.value)}
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

export default Intro;