// libraries
import {LuPlus, LuTrash} from "react-icons/lu";

// modules
import Form from "@/modules/Form.tsx";
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";

export const BlankCard = ({changeCurrentPart}) => {
    return (
        <div
            className="col-12 col-sm-6 col-md-4"
            onClick={() => changeCurrentPart("create")}
        >
            <div
                className="d-flex justify-content-center align-items-center gap-2 w-100 h-100px bg-light rounded-2 p-5 cursor-pointer">
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

export const JobCard = ({job, readAllJobAction, updateOccupationForm}) => {
    return (
        <div className="col-12 col-sm-6 col-md-4">
            <div
                className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-100px border border-dashed border-secondary rounded-2 p-5">
                <div className='d-flex justify-content-between align-items-center gap-2 w-100 h-100'>
                    <div className="d-flex flex-column justify-content-center align-items-start gap-5">
                        <Typography
                            size="sm"
                            color="dark"
                            isBold
                        >
                            {readAllJobAction.data?.data?.fieldsOfActivity.find(foa => foa.id === job.foa_parent_id)?.title}
                        </Typography>

                        <Typography
                            size="sm"
                            color="dark"
                        >
                            {readAllJobAction.data?.data?.fieldsOfActivity.find(foa => foa.id === job.foa_child_id)?.title}
                        </Typography>
                    </div>

                    <div className="d-flex justify-content-end align-items-start gap-5 h-100">
                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={() => updateOccupationForm.setFieldValue("fields_of_activity", updateOccupationForm.fields_of_activity.filter(item => JSON.stringify(item) !== JSON.stringify(job)))}
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

const Jobs = ({changeCurrentPart , readAllJobAction , updateOccupationForm}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <div className='d-flex flex-column justify-content-center align-items-start gap-2 w-100'>
                            <Form.Label
                                label="مشاغل"
                                size="sm"
                                color="dark"
                                required
                            />

                            <div className="row g-5 w-100">
                                {
                                    updateOccupationForm.values.fields_of_activity?.map((job, i) =>
                                        <JobCard
                                            key={i}
                                            job={job}
                                            readAllJobAction={readAllJobAction}
                                            updateOccupationForm={updateOccupationForm}
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

export default Jobs;