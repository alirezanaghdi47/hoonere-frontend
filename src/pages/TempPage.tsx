// libraries
import {useState} from "react";
import {useFormik} from "formik";

// modules
import Checkbox from "@/modules/Checkbox.tsx";
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Radiobox from "@/modules/Radiobox.tsx";
import SwitchBox from "@/modules/SwitchBox.tsx";
import Popover from "@/modules/Popover.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Modal from "@/modules/Modal.tsx";

const TempPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            brands: [],
            city: "",
            isAvailable: false,
        },
        onSubmit: async () => {

        }
    });

    return (
        <>
            <Popover
                trigger={["click", "hover"]}
                content={<IconButton color='danger'>i</IconButton>}
                position='left center'
            >
                menu
            </Popover>

            <button onClick={() => setIsOpen(true)}>
                modal
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                width="full"
                height='full'
                position='any'
            >
                <Modal.Header
                    title='مودال'
                    onClose={() => setIsOpen(false)}
                />
            </Modal>

            <Form.Control htmlFor="apple">
                <Checkbox
                    name="brands"
                    id="apple"
                    value="apple"
                    checked={formik.values.brands.includes("apple")}
                    onChange={formik.handleChange}
                />

                <Typography
                    size="sm"
                    color="dark"
                    isBold
                >
                    اپل
                </Typography>
            </Form.Control>

            <Form.Control htmlFor="samsung">
                <Checkbox
                    name="brands"
                    id="samsung"
                    value="samsung"
                    checked={formik.values.brands.includes("samsung")}
                    onChange={formik.handleChange}
                />

                <Typography
                    size="sm"
                    color="dark"
                    isBold
                >
                    سامسونگ
                </Typography>
            </Form.Control>

            <Form.Control htmlFor="tehran">
                <Radiobox
                    name="city"
                    id="tehran"
                    value="tehran"
                    checked={formik.values.city === "tehran"}
                    onChange={formik.handleChange}
                />

                <Typography
                    size="sm"
                    color="dark"
                    isBold
                >
                    تهران
                </Typography>
            </Form.Control>

            <Form.Control htmlFor="shiraz">
                <Radiobox
                    name="city"
                    id="shiraz"
                    value="shiraz"
                    checked={formik.values.city === "shiraz"}
                    onChange={formik.handleChange}
                />

                <Typography
                    size="sm"
                    color="dark"
                    isBold
                >
                    شیراز
                </Typography>
            </Form.Control>

            <Form.Control htmlFor="isAvailable">
                <SwitchBox
                    name="isAvailable"
                    id="isAvailable"
                    value={formik.values.isAvailable}
                    checked={formik.values.isAvailable === true}
                    onChange={formik.handleChange}
                />

                <Typography
                    size="sm"
                    color="dark"
                    isBold
                >
                    موجود است
                </Typography>
            </Form.Control>
        </>
    )
}

export default TempPage;