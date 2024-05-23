// components
import {JobCard, TempJobCard} from "@/components/widgets/panel/profile/occupation/JobCards.tsx";

// modules
import Form from "@/modules/Form.tsx";

const ReadAllMyJob = ({readAllJobAction , updateOccupationForm, changeCurrentPart}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Label
                            label="مشاغل"
                            size="sm"
                            color="dark"
                            required
                        />

                        <div className='w-100 mt-5'>
                            <div className="row gy-5">
                                {
                                    updateOccupationForm.values.fields_of_activity?.map((foa, i) =>
                                        <JobCard
                                            key={i}
                                            group={readAllJobAction.data?.data?.fieldsOfActivity.find(item => parseInt(item.id) === parseInt(foa.foa_parent_id))}
                                            title={readAllJobAction.data?.data?.fieldsOfActivity.find(item => parseInt(item.id) === parseInt(foa.foa_child_id))}
                                            onDelete={() => updateOccupationForm.setFieldValue("fields_of_activity", updateOccupationForm.values.fields_of_activity.filter((item, j) => i !== j))}
                                        />
                                    )
                                }

                                <TempJobCard onClick={() => changeCurrentPart("add")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadAllMyJob;