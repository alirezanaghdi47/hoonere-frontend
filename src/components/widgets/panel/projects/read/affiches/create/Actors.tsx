// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";
import Form from "@/modules/Form";

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
                    افزودن بازیگر جدید
                </Typography>
            </div>
        </div>
    )
}

export const ActorCard = ({actor , createProjectAfficheP2Form}) => {
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
                        {actor?.full_name}
                    </Typography>

                    <Typography
                        variant="p"
                        size="xs"
                        color="dark"
                    >
                        نقش :
                        &nbsp;
                        {actor?.role}
                    </Typography>

                    <div className="d-flex justify-content-start align-items-center gap-2 w-100">
                        <Typography
                            variant="p"
                            size="xxs"
                            color="dark"
                        >
                            ساعت حضور :
                            &nbsp;
                            {actor?.coming_time}
                        </Typography>

                        <span className="text-secondary mx-2">
                            |
                        </span>

                        <Typography
                            variant="p"
                            size="xxs"
                            color="dark"
                        >
                            ساعت گریم :
                            &nbsp;
                            {actor?.makeup_time}
                        </Typography>
                    </div>
                </div>

                <IconButton
                    color="light-danger"
                    size="sm"
                    onClick={() => createProjectAfficheP2Form.setFieldValue("actors", createProjectAfficheP2Form.values.actors.filter(item => item.actor_id !== actor.actor_id))}
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

const Actors = ({createProjectAfficheP2Form, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="بازیگران"
                                size="sm"
                                color="dark"
                            />

                            <div className="row g-5 w-100">
                                {
                                    createProjectAfficheP2Form.values.actors?.map((actor, i) =>
                                        <ActorCard
                                            key={i}
                                            actor={actor}
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
export default Actors;