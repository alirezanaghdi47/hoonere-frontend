// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Form from "@/modules/Form.tsx";
import Tooltip from "@/modules/Tooltip.tsx";

export const BlankCard = ({onClick}) => {
    return (
        <div
            className="col-12 col-md-6"
            onClick={onClick}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-125px border-2 border-dashed border-secondary rounded-2 overflow-hidden p-5 cursor-pointer">
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
                    افزودن عوامل جدید
                </Typography>
            </div>
        </div>
    )
}

export const MemberCard = ({member, onDelete}) => {
    return (
        <>
            <div className="col-12 col-md-6">
                <div
                    className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-125px bg-light rounded-2 p-5">
                    <div className="d-flex flex-column justify-content-center align-items-start gap-4 w-100 h-100">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                            isBold
                            className="w-75"
                        >
                            {member?.full_name}
                        </Typography>

                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                        >
                            ساعت حضور :
                            &nbsp;
                            {member?.coming_time}
                        </Typography>

                        <Typography
                            variant="p"
                            size="xxs"
                            color="dark"
                            truncate={1}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                            است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، "
                        >
                            {member?.description}
                        </Typography>
                    </div>

                    <IconButton
                        color="light-danger"
                        size="sm"
                        onClick={onDelete}
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

            <Tooltip/>
        </>
    )
}

const Members = ({updateProjectAfficheP2Form, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Label
                            label="عوامل"
                            size="sm"
                            color="dark"
                        />

                        <div className='w-100 mt-5'>
                            <div className="row gy-5">
                                {
                                    updateProjectAfficheP2Form.values.members?.map((member, i) =>
                                        <MemberCard
                                            key={i}
                                            member={member}
                                            onDelete={() => updateProjectAfficheP2Form.setFieldValue("members", updateProjectAfficheP2Form.values.members.filter((item, j) => i !== j))}
                                        />
                                    )
                                }

                                <BlankCard onClick={() => changeCurrentPart("create")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Members;