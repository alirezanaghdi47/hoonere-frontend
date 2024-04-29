// modules
import SelectBox from "@/modules/SelectBox.tsx";
import FileInput from "@/modules/FileInput.tsx";
import Form from "@/modules/Form.tsx";
import Textarea from "@/modules/Textarea.tsx";
import Button from "@/modules/Button.tsx";

const Occupation = () => {
    const options = [
        {value: '1', label: 'first'},
        {value: '2', label: 'second'},
        {value: '3', label: 'third'}
    ];

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="گروه شغلی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                name="jobGroup"
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

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عنوان شغلی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <SelectBox
                                name="jobTitle"
                                value={[options[1] , options[2]]}
                                options={options}
                                placeholder=""
                                isSearchable
                                isMulti
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
                            label="رزومه ( عکس یا pdf )"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <FileInput
                                name="resumePicture"
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
                            label="رزومه متنی"
                            required
                            size="sm"
                            color="dark"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <Textarea
                                name="resume"
                                rows={10}
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

export default Occupation;