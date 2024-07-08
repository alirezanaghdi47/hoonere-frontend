// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Form from "@/modules/Form.tsx";

export const BlankCard = ({onClick}) => {
    return (
        <div
            className="col-12"
            onClick={onClick}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-75px border-2 border-dashed border-secondary rounded-2 overflow-hidden p-5 cursor-pointer">
                <LuPlus
                    size={20}
                    color="currentColor"
                    className="text-muted"
                />

                <Typography
                    variant="p"
                    size="sm"
                    color="muted"
                >
                    افزودن آدرس جدید
                </Typography>
            </div>
        </div>
    )
}

export const AddressCard = ({location, onDelete}) => {
    return (
        <div className="col-12">
            <div
                className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-75px bg-light rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center gap-2 w-100 h-100'>
                    <div className="d-flex flex-column justify-content-start align-items-start gap-2 h-100">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {location?.address}
                        </Typography>
                    </div>

                    <div className="d-flex justify-content-end align-items-start gap-5 h-100">
                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={onDelete}
                        >
                            <LuTrash
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Addresses = ({createProjectAfficheP1Form, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row g-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="آدرس ها"
                                size="sm"
                                color="dark"
                                required
                            />

                            <div className='row g-5 w-100'>
                                {
                                    createProjectAfficheP1Form.values.addresses?.map((item, i) =>
                                        <AddressCard
                                            key={i}
                                            location={item}
                                            onDelete={() => createProjectAfficheP1Form.setFieldValue("addresses", createProjectAfficheP1Form.values.addresses.filter((subItem, j) => i !== j))}
                                        />
                                    )
                                }

                                <BlankCard onClick={() => changeCurrentPart("create")}/>
                            </div>

                            <Form.Error
                                error={createProjectAfficheP1Form.errors.addresses}
                                touched={createProjectAfficheP1Form.touched.addresses}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addresses;