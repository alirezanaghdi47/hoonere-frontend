// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Form from "@/modules/Form.tsx";

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
                    افزودن بازیگر جدید
                </Typography>
            </div>
        </div>
    )
}

export const ActorCard = ({actor, onDelete}) => {
    return (
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
    )
}

const Actors = ({createProjectAfficheP2Form, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Label
                            label="بازیگران"
                            size="sm"
                            color="dark"
                        />

                        <div className='w-100 mt-5'>
                            <div className="row gy-5">
                                {
                                    createProjectAfficheP2Form.values.actors?.map((actor, i) =>
                                        <ActorCard
                                            key={i}
                                            actor={actor}
                                            onDelete={() => createProjectAfficheP2Form.setFieldValue("actors", createProjectAfficheP2Form.values.actors.filter((item, j) => i !== j))}
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
export default Actors;