// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

export const TempJobCard = ({onClick}) => {
    return (
        <div
            className="col-12 col-sm-6 col-md-4"
            onClick={onClick}
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 h-100px border-2 border-dashed border-secondary rounded-2 overflow-hidden p-5 cursor-pointer">
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
                    افزودن شغل جدید
                </Typography>
            </div>
        </div>
    )
}

export const JobCard = ({group, title, onDelete}) => {
    return (
        <div className="col-12 col-sm-6 col-md-4">
            <div
                className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-100px bg-light rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center gap-2 w-100 h-100'>
                    <div className="d-flex flex-column justify-content-center align-items-start gap-2">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                            isBold
                        >
                            {group?.title}
                        </Typography>

                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {title?.title}
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