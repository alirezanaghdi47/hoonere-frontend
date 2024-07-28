// modules
import FileInput from "@/modules/FileInput.tsx";
import Form from "@/modules/Form.tsx";
import TextInput from "@/modules/TextInput.tsx";
import Textarea from "@/modules/Textarea.tsx";
import NumberInput from "@/modules/NumberInput.tsx";
import ImageInput from "@/modules/ImageInput.tsx";

const CivilFormData = ({updateProfileLegalForm}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="لوگو"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <ImageInput
                                id="logo"
                                name="logo"
                                isCircle
                                // preview={readMyProfileAction.data?.data?.user_info.logo}
                                value={updateProfileLegalForm.values.logo}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("logo", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.logo}
                                touched={updateProfileLegalForm.touched.logo}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عکس یا pdf روزنامه رسمی"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <FileInput
                                id="file"
                                name="file"
                                // file={}
                                value={updateProfileLegalForm.values.file}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("file", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.file}
                                touched={updateProfileLegalForm.touched.file}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="اسم شرکت"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="company_name"
                                name="company_name"
                                value={updateProfileLegalForm.values.company_name}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("company_name", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.company_name}
                                touched={updateProfileLegalForm.touched.company_name}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره ثبت"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="registration_number"
                                name="registration_number"
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                value={updateProfileLegalForm.values.registration_number}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("registration_number", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.registration_number}
                                touched={updateProfileLegalForm.touched.registration_number}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد اقتصادی یا شناسه ملی"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="economic_code"
                                name="economic_code"
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                value={updateProfileLegalForm.values.economic_code}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("economic_code", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.economic_code}
                                touched={updateProfileLegalForm.touched.economic_code}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="آدرس"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <Textarea
                                id="address"
                                name="address"
                                value={updateProfileLegalForm.values.address}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("address", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.address}
                                touched={updateProfileLegalForm.touched.address}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد پستی"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="postal_code"
                                name="postal_code"
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                value={updateProfileLegalForm.values.postal_code}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("postal_code", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.postal_code}
                                touched={updateProfileLegalForm.touched.postal_code}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تلفن"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <NumberInput
                                id="tel"
                                name="tel"
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                value={updateProfileLegalForm.values.tel}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("tel", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.tel}
                                touched={updateProfileLegalForm.touched.tel}
                            />
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CivilFormData;