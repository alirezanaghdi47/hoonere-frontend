// components
import ScreenPlays from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlays.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import Button from "@/modules/Button.tsx";

const FormDataP3 = ({
                        readAllProjectScreenPlayAction,
                        createProjectAfficheP3Form,
                        prevStep,
                        filter,
                        initialFilter,
                        changeFilter,
                        isOpenFilter,
                        showFilter,
                        hideFilter,
                        resetFilter
                    }) => {
    return (
        <div className="row gy-5 w-100">
            <div className="col-12 d-flex flex-column justify-content-start align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        {
                            readAllProjectScreenPlayAction.data?.data.screenplays.length > 0 && (
                                <ScreenPlays
                                    readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                                    createProjectAfficheP3Form={createProjectAfficheP3Form}
                                    filter={filter}
                                    initialFilter={initialFilter}
                                    changeFilter={changeFilter}
                                    isOpenFilter={isOpenFilter}
                                    showFilter={showFilter}
                                    hideFilter={hideFilter}
                                    resetFilter={resetFilter}
                                />
                            )
                        }

                        {
                            readAllProjectScreenPlayAction.data?.data.screenplays.length === 0 && (
                                <Empty
                                    title="فیلم نامه ای یافت نشد"
                                    width="100%"
                                    height={300}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                        <Button
                            color="light-danger"
                            onClick={prevStep}
                        >
                            قبلی
                        </Button>

                        <Button
                            color="success"
                            onClick={createProjectAfficheP3Form.handleSubmit}
                        >
                            افزودن آفیش
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormDataP3;