// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Form from "@/modules/Form";
import receptions from "@/components/widgets/panel/projects/read/affiches/create/Receptions.tsx";

export const BlankCard = ({changeCurrentPart}) => {
    return (
        <div
            className="col-12 col-md-6"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-75px bg-light rounded-2 p-5 cursor-pointer">
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
                    افزودن پذیرایی جدید
                </Typography>
            </div>
        </div>
    )
}

export const ReceptionCard = ({reception, updateProjectAfficheP2Form}) => {
    return (
        <div className="col-12 col-md-6">
            <div
                className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-75px border border-dashed border-secondary rounded-2 p-5">
                <div className="d-flex flex-column justify-content-center align-items-start gap-4 w-100 h-100">
                    <Typography
                        variant="p"
                        size="sm"
                        color="dark"
                        isBold
                        className="w-75"
                    >
                        {reception?.full_name}
                    </Typography>

                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                    >
                        نوع پذیرایی :
                        &nbsp;
                        {reception?.reception_name}
                    </Typography>
                </div>

                <IconButton
                    color="light-danger"
                    size="sm"
                    onClick={() => updateProjectAfficheP2Form.setFieldValue("receptions", updateProjectAfficheP2Form.values.receptions.filter(item => item.member_id !== reception.member_id))}
                    className='position-absolute'
                    style={{top: 20, left: 20}}
                >
                    <LuTrash
                        size={20}
                        color="currentColor"
                    />
                </IconButton>
            </div>
        </div>
    )
}

const Receptions = ({updateProjectAfficheP2Form, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="پذیرایی ها"
                                size="sm"
                                color="dark"
                            />

                            <div className='row g-5 w-100'>
                                {
                                    updateProjectAfficheP2Form.values.receptions?.map((reception, i) =>
                                        <ReceptionCard
                                            key={i}
                                            reception={reception}
                                            updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                        />
                                    )
                                }

                                <BlankCard changeCurrentPart={changeCurrentPart}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Receptions;