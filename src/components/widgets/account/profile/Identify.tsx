// assets
import avatar from "@/assets/images/avatar.jpg";

// modules
import FileInput from "@/modules/FileInput.tsx";
import DatePicker from "@/modules/DatePicker.tsx";
import Form from "@/modules/Form.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import Textarea from "@/modules/Textarea.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import AvatarInput from "@/modules/AvatarInput.tsx";

const Identify = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عکس پروفایل"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <AvatarInput
                                name="avatar"
                                preview={avatar}
                                value={null}
                                onChange={value => console.log(value)}
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
                            label="تصویر جلو کارت ملی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <FileInput
                                name="melliCodePicture"
                                value={null}
                                onChange={value => console.log(value)}
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
                            label="نام و نام خانوادگی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                name="name"
                                value={null}
                                onChange={(e) => console.log(e.target.value)}
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
                            label="کد ملی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                name="melliCode"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                onChange={(e) => console.log(e.target.value)}
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
                            label="شماره شناسنامه"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                name="identifyCode"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                onChange={(e) => console.log(e.target.value)}
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
                            label="تاریخ تولد"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <DatePicker
                                name="birthDate"
                                value={null}
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
                            label="شماره موبایل"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                name="phoneNumber"
                                value={null}
                                options={{
                                    numericOnly: true,
                                    blocks: [4, 3, 4],
                                    delimiter: '',
                                }}
                                onChange={(e) => console.log(e.target.value)}
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
                            label="ایمیل"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                name="email"
                                value={null}
                                onChange={(e) => console.log(e.target.value)}
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
                            label="آدرس"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <Textarea
                                name="address"
                                value={null}
                                onChange={(e) => console.log(e.target.value)}
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
                            color="success"
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

export default Identify;