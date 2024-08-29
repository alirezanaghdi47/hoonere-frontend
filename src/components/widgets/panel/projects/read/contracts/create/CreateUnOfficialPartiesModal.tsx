// libraries
import {useFormik} from "formik";
import * as Yup from "yup";
import {LuHome, LuUser, LuX} from "react-icons/lu";

// components
import Representatives from "@/components/widgets/panel/projects/read/contracts/create/Representatives.tsx";
import CreateRepresentativeModal
    from "@/components/widgets/panel/projects/read/contracts/create/CreateRepresentativeModal.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";
import useModal from "@/hooks/useModal.tsx";

// modules
import Modal from "@/modules/Modal";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Form from "@/modules/Form";
import Button from "@/modules/Button";
import TextInput from "@/modules/TextInput";
import Textarea from "@/modules/Textarea";
import NumberInput from "@/modules/NumberInput";

const createUnOfficialRealPartiesSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("نام الزامی است"),
    last_name: Yup.string().trim().required("نام خانوادگی الزامی است"),
    national_code: Yup.string().trim().required("کد ملی الزامی است"),
    mobile: Yup.string().trim().matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/, "فرمت شماره موبایل نادرست است").required("شماره موبایل الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
    address: Yup.string().trim().required("آدرس الزامی است"),
});

const createUnOfficialLegalPartiesSchema = Yup.object().shape({
    company_name: Yup.string().trim().required("نام شرکت الزامی است"),
    register_code: Yup.string().trim().required("شماره ثبت الزامی است"),
    economic_code: Yup.string().trim().required("شناسه ملی الزامی است"),
    address: Yup.string().trim().required("آدرس الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
    telephone: Yup.string().trim().required("شماره تماس الزامی است"),
    representatives: Yup.array().of(Yup.object().shape({
        full_name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
        national_code: Yup.string().trim().required("کد ملی الزامی است"),
        post: Yup.string().trim().required("سمت کاری الزامی است"),
    }))
});

const UnOfficialChangePartiesFormData = ({modal, _handleHideModal, changeCurrentPart}) => {
    return (
        <>
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    انتخاب
                    &nbsp;
                    {modal?.data?.from === "employer" ? "کارفرما" : "مجری"}
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div className='d-flex justify-content-center align-items-center gap-5 w-100 h-100 p-5'>
                    <ul className='hstack gap-5 w-100 mb-0 p-0'>
                        <li
                            className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100px bg-light rounded-2 cursor-pointer"
                            onClick={() => changeCurrentPart("real")}
                        >
                            <LuUser
                                size={25}
                                color="currentColor"
                                className="text-muted"
                            />

                            <Typography
                                size="lg"
                                color="muted"
                            >
                                حقیقی
                            </Typography>
                        </li>

                        <li
                            className="d-flex flex-column justify-content-center align-items-center gap-5 w-100 h-100px bg-light rounded-2 cursor-pointer"
                            onClick={() => changeCurrentPart("legal")}
                        >
                            <LuHome
                                size={25}
                                color="currentColor"
                                className="text-muted"
                            />

                            <Typography
                                size="lg"
                                color="muted"
                            >
                                حقوقی
                            </Typography>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </>
    )
}

const UnOfficialRealPartiesFormData = ({modal, _handleHideModal, createUnOfficialRealPartiesForm}) => {
    return (
        <>
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    افزودن
                    &nbsp;
                    {modal?.data?.from === "employer" ? "کارفرمای حقیقی" : "مجری حقیقی"}
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div
                    className='d-flex flex-column justify-content-start align-items-start gap-5 w-100 h-100 p-5'>
                    <Form.Group>
                        <Form.Label
                            label="نام"
                            required
                            size="sm"
                            color="dark"
                        />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={createUnOfficialRealPartiesForm.values.first_name}
                            onChange={(value) => createUnOfficialRealPartiesForm.setFieldValue("first_name", value)}
                        />

                        <Form.Error
                            error={createUnOfficialRealPartiesForm.errors.first_name}
                            touched={createUnOfficialRealPartiesForm.touched.first_name}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="نام خانوادگی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={createUnOfficialRealPartiesForm.values.last_name}
                            onChange={(value) => createUnOfficialRealPartiesForm.setFieldValue("last_name", value)}
                        />

                        <Form.Error
                            error={createUnOfficialRealPartiesForm.errors.last_name}
                            touched={createUnOfficialRealPartiesForm.touched.last_name}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="کد ملی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="national_code"
                            name="national_code"
                            value={createUnOfficialRealPartiesForm.values.national_code}
                            onChange={(value) => createUnOfficialRealPartiesForm.setFieldValue("national_code", value)}
                        />

                        <Form.Error
                            error={createUnOfficialRealPartiesForm.errors.national_code}
                            touched={createUnOfficialRealPartiesForm.touched.national_code}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="موبایل"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="mobile"
                            name="mobile"
                            value={createUnOfficialRealPartiesForm.values.mobile}
                            onChange={(value) => createUnOfficialRealPartiesForm.setFieldValue("mobile", value)}
                        />

                        <Form.Error
                            error={createUnOfficialRealPartiesForm.errors.mobile}
                            touched={createUnOfficialRealPartiesForm.touched.mobile}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="کد پستی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="postal_code"
                            name="postal_code"
                            options={{
                                numericOnly: true,
                                delimiter: '',
                            }}
                            value={createUnOfficialRealPartiesForm.values.postal_code}
                            onChange={(value) => createUnOfficialRealPartiesForm.setFieldValue("postal_code", value)}
                        />

                        <Form.Error
                            error={createUnOfficialRealPartiesForm.errors.postal_code}
                            touched={createUnOfficialRealPartiesForm.touched.postal_code}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="آدرس"
                            required
                            size="sm"
                            color="dark"
                        />

                        <Textarea
                            id="address"
                            name="address"
                            value={createUnOfficialRealPartiesForm.values.address}
                            onChange={(value) => createUnOfficialRealPartiesForm.setFieldValue("address", value)}
                        />

                        <Form.Error
                            error={createUnOfficialRealPartiesForm.errors.address}
                            touched={createUnOfficialRealPartiesForm.touched.address}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={createUnOfficialRealPartiesForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={createUnOfficialRealPartiesForm.handleSubmit}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </>
    )
}

const UnOfficialLegalPartiesFormData = ({modal, _handleHideModal, createUnOfficialLegalPartiesForm}) => {
    const {
        modal: createRepresentativeModal,
        _handleShowModal: _handleShowCreateRepresentativeModal,
        _handleHideModal: _handleHideCreateRepresentativeModal
    } = useModal();

    return (
        <>
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    افزودن
                    &nbsp;
                    {modal?.data?.from === "employer" ? "کارفرما حقوقی" : "مجری حقوقی"}
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div
                    className='d-flex flex-column justify-content-start align-items-start gap-5 w-100 h-100 p-5'>
                    <Form.Group>
                        <Form.Label
                            label="نام شرکت"
                            required
                            size="sm"
                            color="dark"
                        />

                        <TextInput
                            id="company_name"
                            name="company_name"
                            value={createUnOfficialLegalPartiesForm.values.company_name}
                            onChange={(value) => createUnOfficialLegalPartiesForm.setFieldValue("company_name", value)}
                        />

                        <Form.Error
                            error={createUnOfficialLegalPartiesForm.errors.company_name}
                            touched={createUnOfficialLegalPartiesForm.touched.company_name}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="شماره ثبت"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="register_code"
                            name="register_code"
                            options={{
                                numericOnly: true,
                                delimiter: '',
                            }}
                            value={createUnOfficialLegalPartiesForm.values.register_code}
                            onChange={(value) => createUnOfficialLegalPartiesForm.setFieldValue("register_code", value)}
                        />

                        <Form.Error
                            error={createUnOfficialLegalPartiesForm.errors.register_code}
                            touched={createUnOfficialLegalPartiesForm.touched.register_code}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="کد اقتصادی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="economic_code"
                            name="economic_code"
                            options={{
                                numericOnly: true,
                                delimiter: '',
                            }}
                            value={createUnOfficialLegalPartiesForm.values.economic_code}
                            onChange={(value) => createUnOfficialLegalPartiesForm.setFieldValue("economic_code", value)}
                        />

                        <Form.Error
                            error={createUnOfficialLegalPartiesForm.errors.economic_code}
                            touched={createUnOfficialLegalPartiesForm.touched.economic_code}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="تلفن"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="telephone"
                            name="telephone"
                            options={{
                                numericOnly: true,
                                delimiter: '',
                            }}
                            value={createUnOfficialLegalPartiesForm.values.telephone}
                            onChange={(value) => createUnOfficialLegalPartiesForm.setFieldValue("telephone", value)}
                        />

                        <Form.Error
                            error={createUnOfficialLegalPartiesForm.errors.telephone}
                            touched={createUnOfficialLegalPartiesForm.touched.telephone}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="کدپستی"
                            required
                            size="sm"
                            color="dark"
                        />

                        <NumberInput
                            id="postal_code"
                            name="postal_code"
                            options={{
                                numericOnly: true,
                                delimiter: '',
                            }}
                            value={createUnOfficialLegalPartiesForm.values.postal_code}
                            onChange={(value) => createUnOfficialLegalPartiesForm.setFieldValue("postal_code", value)}
                        />

                        <Form.Error
                            error={createUnOfficialLegalPartiesForm.errors.postal_code}
                            touched={createUnOfficialLegalPartiesForm.touched.postal_code}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label
                            label="آدرس"
                            required
                            size="sm"
                            color="dark"
                        />

                        <Textarea
                            id="address"
                            name="address"
                            value={createUnOfficialLegalPartiesForm.values.address}
                            onChange={(value) => createUnOfficialLegalPartiesForm.setFieldValue("address", value)}
                        />

                        <Form.Error
                            error={createUnOfficialLegalPartiesForm.errors.address}
                            touched={createUnOfficialLegalPartiesForm.touched.address}
                        />
                    </Form.Group>

                    <Representatives
                        createUnOfficialLegalPartiesForm={createUnOfficialLegalPartiesForm}
                        _handleShowModal={_handleShowCreateRepresentativeModal}
                    />

                    {
                        createRepresentativeModal.isOpen && (
                            <CreateRepresentativeModal
                                modal={createRepresentativeModal}
                                _handleHideModal={_handleHideCreateRepresentativeModal}
                                createUnOfficialLegalPartiesForm={createUnOfficialLegalPartiesForm}
                            />
                        )
                    }
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={createUnOfficialLegalPartiesForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={createUnOfficialLegalPartiesForm.handleSubmit}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </>
    )
}

const CreateUnOfficialPartiesModal = ({modal, _handleHideModal, createProjectContractForm}) => {
    const {part, currentPart, changePart, resetPart, changeCurrentPart} = usePart(null, "read");

    const createUnOfficialRealPartiesForm = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            national_code: "",
            mobile: "",
            postal_code: "",
            address: "",
        },
        validationSchema: createUnOfficialRealPartiesSchema,
        onSubmit: async (result, {resetForm}) => {
            if (modal?.data?.from === "employer") {
                const newArray = [...createProjectContractForm.values.articles[0].employers, {...result , user_type: "1"}];

                createProjectContractForm.setFieldValue(`articles[0].employers`, newArray);

                createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

            } else if (modal?.data?.from === "contractor") {
                const newArray = [...createProjectContractForm.values.articles[0].contractors, {...result , user_type: "1"}];

                createProjectContractForm.setFieldValue(`articles[0].contractors`, newArray);

                createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);
            }

            resetForm();

            resetPart();

            _handleHideModal();
        },
        onReset: async () => {
            resetPart();

            _handleHideModal();
        }
    });

    const createUnOfficialLegalPartiesForm = useFormik({
        initialValues: {
            company_name: "",
            register_code: "",
            economic_code: "",
            telephone: "",
            postal_code: "",
            address: "",
            representatives: []
        },
        validationSchema: createUnOfficialLegalPartiesSchema,
        onSubmit: async (result, {resetForm}) => {
            if (modal?.data?.from === "employer") {
                const newArray = [...createProjectContractForm.values.articles[0].employers, {...result , user_type: "2"}];

                createProjectContractForm.setFieldValue(`articles[0].employers`, newArray);

                createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);

            } else if (modal?.data?.from === "contractor") {
                const newArray = [...createProjectContractForm.values.articles[0].contractors, {...result , user_type: "2"}];

                createProjectContractForm.setFieldValue(`articles[0].contractors`, newArray);

                createProjectContractForm.setFieldValue(`sections[${createProjectContractForm.values.sections.findIndex(section => section.last_article === "1")}].content`, ` این قرارداد در ${createProjectContractForm.values.articles.length} ماده و ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه تنظیم گردیده و هر کدام از ${createProjectContractForm.values.articles[0].employers.length + createProjectContractForm.values.articles[0].contractors.length + 1} نسخه پس از مهر و امضاء طرفین دارای ارزش و اعتبار واحد می باشد. `);
            }

            resetForm();

            resetPart();

            _handleHideModal();
        },
        onReset: async () => {
            resetPart();

            _handleHideModal();
        }
    });

    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="md"
        >
            {
                currentPart === "read" && (
                    <UnOfficialChangePartiesFormData
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        changeCurrentPart={changeCurrentPart}
                    />
                )
            }

            {
                currentPart === "real" && (
                    <UnOfficialRealPartiesFormData
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        createUnOfficialRealPartiesForm={createUnOfficialRealPartiesForm}
                    />
                )
            }

            {
                currentPart === "legal" && (
                    <UnOfficialLegalPartiesFormData
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        createUnOfficialLegalPartiesForm={createUnOfficialLegalPartiesForm}
                    />
                )
            }
        </Modal>
    )
}

export default CreateUnOfficialPartiesModal;