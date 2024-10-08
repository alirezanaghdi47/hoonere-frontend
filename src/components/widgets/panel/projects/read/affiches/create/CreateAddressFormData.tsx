// libraries
import {useFormik} from "formik";
import * as Yup from "yup";

// modules
import Form from "@/modules/Form";
import Textarea from "@/modules/Textarea";
import LocationPicker from "@/modules/LocationPicker";
import Button from "@/modules/Button";

const createAddressSchema = Yup.object().shape({
    address: Yup.string().trim().required("آدرس آفیش الزامی است"),
    lat: Yup.number(),
    lon: Yup.number(),
});

const CreateAddressFormData = ({createProjectAfficheP1Form, resetPart}) => {
    const createAddressForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            address: "",
            lat: "",
            lon: "",
        },
        validationSchema: createAddressSchema,
        onSubmit: async (result, {resetForm}) => {
            createProjectAfficheP1Form.setFieldValue("addresses", [...createProjectAfficheP1Form.values.addresses, result])

            resetPart();
            resetForm();
        },
        onReset: async () => {
            resetPart();
        }
    });

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="آدرس"
                                color="dark"
                                size="sm"
                                required
                            />

                            <Textarea
                                id="address"
                                name="address"
                                value={createAddressForm.values.address}
                                onChange={(value) => createAddressForm.setFieldValue("address", value)}
                            />

                            <Form.Error
                                error={createAddressForm.errors.address}
                                touched={createAddressForm.touched.address}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label
                                label="نقشه"
                                color="dark"
                                size="sm"
                            />

                            <LocationPicker
                                height={300}
                                location={{
                                    lat: createAddressForm.values.lat ? Number(createAddressForm.values.lat) : 0,
                                    lon: createAddressForm.values.lon ? Number(createAddressForm.values.lon) : 0
                                }}
                                setLocation={(value) => {
                                    createAddressForm.setFieldValue("lat", value.lat.toString());
                                    createAddressForm.setFieldValue("lon", value.lon.toString());
                                }}
                            />

                            <Form.Error
                                error={createAddressForm.errors.lat && createAddressForm.errors.lon}
                                touched={createAddressForm.touched.lat && createAddressForm.touched.lon}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={() => createAddressForm.handleReset(createAddressForm)}
                        >
                            انصراف
                        </Button>

                        <Button
                            color="success"
                            onClick={createAddressForm.handleSubmit}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAddressFormData;