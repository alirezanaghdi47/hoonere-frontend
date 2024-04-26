// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Textarea from "@/modules/Textarea.tsx";

const Location = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <Typography
                    variant="h2"
                    size="md"
                    color="dark"
                    isBold
                >
                    موقعیت
                </Typography>

                <Form.Group>
                    <Form.Label
                        label="محل فیلم برداری"
                        color="dark"
                        size="xs"
                        required
                    />

                    <Textarea
                        name="location"
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
    )
}

export default Location;