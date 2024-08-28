// libraries
import Loadable from "@loadable/component";

// components
const CreateActorFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/create/CreateActorFormData.tsx"));
const CreateMemberFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/create/CreateMemberFormData.tsx"));
const CreateReceptionFormData = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/create/CreateReceptionFormData.tsx"));

import Actors from "@/components/widgets/panel/projects/read/affiches/create/Actors.tsx";
import Members from "@/components/widgets/panel/projects/read/affiches/create/Members.tsx";
import Receptions from "@/components/widgets/panel/projects/read/affiches/create/Receptions.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";
// modules
import Button from "@/modules/Button";

const FormDataP2 = ({createProjectAfficheP2Form, prevStep}) => {
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
                                    createProjectAfficheP2Form={createProjectAfficheP2Form}
                                    changeCurrentPart={actorChangeCurrentPart}
                                />
                            )
                        }

                        {
                            actorCurrentPart === "create" && (
                                <CreateActorFormData
                                    createProjectAfficheP2Form={createProjectAfficheP2Form}
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
                                    createProjectAfficheP2Form={createProjectAfficheP2Form}
                                    changeCurrentPart={memberChangeCurrentPart}
                                />
                            )
                        }

                        {
                            memberCurrentPart === "create" && (
                                <CreateMemberFormData
                                    createProjectAfficheP2Form={createProjectAfficheP2Form}
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
                                    createProjectAfficheP2Form={createProjectAfficheP2Form}
                                    changeCurrentPart={receptionChangeCurrentPart}
                                />
                            )
                        }

                        {
                            receptionCurrentPart === "create" && (
                                <CreateReceptionFormData
                                    createProjectAfficheP2Form={createProjectAfficheP2Form}
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
                            color="success"
                            onClick={createProjectAfficheP2Form.handleSubmit}
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