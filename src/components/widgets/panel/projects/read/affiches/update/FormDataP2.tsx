// libraries
import Loadable from "@loadable/component";

// components
const CreateActorFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/update/CreateActorFormData.tsx"));
const CreateMemberFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/update/CreateMemberFormData.tsx"));
const CreateReceptionFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/update/CreateReceptionFormData.tsx"));

import Actors from "@/components/widgets/panel/projects/read/affiches/update/Actors.tsx";
import Members from "@/components/widgets/panel/projects/read/affiches/update/Members.tsx";
import Receptions from "@/components/widgets/panel/projects/read/affiches/update/Receptions.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Button from "@/modules/Button.tsx";

const FormDataP2 = ({updateProjectAfficheP2Form , prevStep}) => {
    const {
        currentPart: actorCurrentPart,
        resetPart: actorResetPart,
        changeCurrentPart: actorChangeCurrentPart
    } = usePart(null, "read");
    const {
        currentPart: memberCurrentPart,
        resetPart: memberResetPart,
        changeCurrentPart: memberChangeCurrentPart
    } = usePart(null, "read");
    const {
        currentPart: receptionCurrentPart,
        resetPart: receptionResetPart,
        changeCurrentPart: receptionChangeCurrentPart
    } = usePart(null, "read");

    return (
        <div className="row gy-5 w-100">
            <div className="col-12 d-flex flex-column justify-content-start align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        {
                           actorCurrentPart === "read" && (
                                <Actors
                                    updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                    changeCurrentPart={actorChangeCurrentPart}
                                />
                            )
                        }

                        {
                           actorCurrentPart === "create" && (
                                <CreateActorFormData
                                    updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                    resetPart={actorResetPart}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12">
                        {
                            memberCurrentPart === "read" && (
                                <Members
                                    updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                    changeCurrentPart={memberChangeCurrentPart}
                                />
                            )
                        }

                        {
                            memberCurrentPart === "create" && (
                                <CreateMemberFormData
                                    updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                    resetPart={memberResetPart}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-12">
                        {
                            receptionCurrentPart === "read" && (
                                <Receptions
                                    updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                    changeCurrentPart={receptionChangeCurrentPart}
                                />
                            )
                        }

                        {
                            receptionCurrentPart === "create" && (
                                <CreateReceptionFormData
                                    updateProjectAfficheP2Form={updateProjectAfficheP2Form}
                                    resetPart={receptionResetPart}
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
                            color="warning"
                            onClick={updateProjectAfficheP2Form.handleSubmit}
                        >
                            بعدی
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormDataP2;