// modules
import Form from "@/modules/Form";
import TextInput from "@/modules/TextInput";
import Textarea from "@/modules/Textarea";
import NumberInput from "@/modules/NumberInput";
import ImageInput from "@/modules/ImageInput";
import Button from "@/modules/Button";
import FileInput from "@/modules/FileInput.tsx";

const LegalFormData = ({readMyProfileAction , changeCurrentPart, updateProfileLegalForm}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                {
                    readMyProfileAction.data?.data?.user_info?.status.id === 1 && (
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Button
                                    color="light-info"
                                    size="sm"
                                    onClick={() => changeCurrentPart("real")}
                                    className="ms-auto"
                                >
                                    تغییر به شخصیت حقیقی
                                </Button>
                            </div>
                        </div>
                    )
                }

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
                                id="profile_img"
                                name="profile_img"
                                isCircle
                                preview={readMyProfileAction.data?.data?.user_info?.profile_img}
                                value={updateProfileLegalForm.values.profile_img}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("profile_img", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.profile_image}
                                touched={updateProfileLegalForm.touched.profile_image}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عکس یا فایل روزنامه رسمی"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <FileInput
                                id="newspaper_file"
                                name="newspaper_file"
                                value={updateProfileLegalForm.values.newspaper_file}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("newspaper_file", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.newspaper_file}
                                touched={updateProfileLegalForm.touched.newspaper_file}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نام کاربری"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="username"
                                name="username"
                                value={updateProfileLegalForm.values.username}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("username", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.username}
                                touched={updateProfileLegalForm.touched.username}
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
                                id="register_code"
                                name="register_code"
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                value={updateProfileLegalForm.values.register_code}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("register_code", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.register_code}
                                touched={updateProfileLegalForm.touched.register_code}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد اقتصادی"
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
                                id="telephone"
                                name="telephone"
                                options={{
                                    numericOnly: true,
                                    delimiter: '',
                                }}
                                value={updateProfileLegalForm.values.telephone}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("telephone", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.telephone}
                                touched={updateProfileLegalForm.touched.telephone}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="ایمیل"
                            size="sm"
                            color="dark"
                            required
                        />
                    </div>

                    <div className="col-lg-8">
                        <Form.Group>
                            <TextInput
                                id="email"
                                name="email"
                                value={updateProfileLegalForm.values.email}
                                onChange={(value) => updateProfileLegalForm.setFieldValue("email", value)}
                            />

                            <Form.Error
                                error={updateProfileLegalForm.errors.email}
                                touched={updateProfileLegalForm.touched.email}
                            />
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LegalFormData;