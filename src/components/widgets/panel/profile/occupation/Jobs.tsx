// components
import {BlankJobCard , JobCard} from "@/components/widgets/panel/profile/occupation/JobCards.tsx";

// modules
import Form from "@/modules/Form";

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

                                <BlankJobCard changeCurrentPart={changeCurrentPart}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs;