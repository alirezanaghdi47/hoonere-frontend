// modules
import Typography from "@/modules/Typography.tsx";
import FileInput from "@/modules/FileInput.tsx";
import Form from "@/modules/Form.tsx";

const Image = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <Typography
                    variant="h2"
                    size="md"
                    color="dark"
                    isBold
                >
                    لوگو
                </Typography>

                <Form.Group>
                    <FileInput
                        name="logo"
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
    )
}

export default Image;