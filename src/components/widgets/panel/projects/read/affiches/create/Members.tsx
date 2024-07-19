// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Form from "@/modules/Form.tsx";

export const BlankCard = ({changeCurrentPart}) => {
    return (
        <div
            className="col-12 col-md-6"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-125px bg-light rounded-2 p-5 cursor-pointer">
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

export const MemberCard = ({member, createProjectAfficheP2Form}) => {
    return (
        <div className="col-12 col-md-6">
            <div
                className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-125px border border-dashed border-secondary rounded-2 p-5">
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
                    onClick={() => createProjectAfficheP2Form.setFieldValue("members", createProjectAfficheP2Form.values.members.filter(item => item.member_id !== member.member_id))}
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

const Members = ({createProjectAfficheP2Form, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="عوامل"
                                size="sm"
                                color="dark"
                            />

                            <div className='row g-5 w-100'>
                                {
                                    createProjectAfficheP2Form.values.members?.map((member, i) =>
                                        <MemberCard
                                            key={i}
                                            member={member}
                                            createProjectAfficheP2Form={createProjectAfficheP2Form}
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
export default Members;