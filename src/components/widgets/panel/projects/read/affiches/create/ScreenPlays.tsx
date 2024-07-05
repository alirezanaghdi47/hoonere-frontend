// libraries
import Loadable from "@loadable/component";
import parse from 'html-react-parser';
import {LuInfo} from "react-icons/lu";

// components
const ReadScreenPlayModal = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/create/ReadScreenPlayModal.tsx"));

import ScreenPlaysFinder from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlaysFinder.tsx";
import ScreenPlaysFilter from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlaysFilter.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Checkbox from "@/modules/Checkbox.tsx";

export const ScreenPlayCard = ({screenPlay, createProjectAfficheP3Form}) => {
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <div className="col-12 col-md-6">
                <div className="d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-100px bg-light rounded-2 p-5">
                    <div className='d-flex justify-content-between align-items-center gap-5 w-100 h-100'>
                        <div className="d-flex flex-column justify-content-start align-items-start gap-5 h-100">
                            <Checkbox
                                id={`screenplay-${screenPlay.id}`}
                                name={`screenplay-${screenPlay.id}`}
                                value={screenPlay.id}
                                checked={createProjectAfficheP3Form.values.screenplays.includes(screenPlay.id.toString())}
                                onChange={value => {
                                    if (!createProjectAfficheP3Form.values.screenplays.includes(screenPlay.id.toString())) {
                                        createProjectAfficheP3Form.setFieldValue("screenplays", [...createProjectAfficheP3Form.values.screenplays.filter(screenPlay => screenPlay !== value), value]);
                                    } else {
                                        createProjectAfficheP3Form.setFieldValue("screenplays", [...createProjectAfficheP3Form.values.screenplays.filter(screenPlay => screenPlay !== value)]);
                                    }
                                }}
                            />
                        </div>

                        <div className="d-flex flex-column justify-content-start align-items-start gap-2 w-100 h-100">
                            <div className='d-flex justify-content-start align-items-center gap-2 w-100'>
                                <Typography
                                    variant="p"
                                    size="xs"
                                    color="dark"
                                >
                                    قسمت :
                                    &nbsp;
                                    {screenPlay?.part}
                                </Typography>

                                <span className="text-secondary mx-2">
                                    |
                                </span>

                                <Typography
                                    variant="p"
                                    size="xs"
                                    color="dark"
                                >
                                    سکانس :
                                    &nbsp;
                                    {screenPlay?.sequence}
                                </Typography>
                            </div>

                            {parse(`${screenPlay?.description}`)}
                        </div>

                        <div className="d-flex flex-column justify-content-start align-items-start gap-5 h-100">
                            <IconButton
                                color="light-info"
                                size="sm"
                                onClick={() => _handleShowModal(screenPlay)}
                            >
                                <LuInfo
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>

            {
                modal.isOpen && (
                    <ReadScreenPlayModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                    />
                )
            }
        </>
    )
}

const ScreenPlays = ({
                         readAllProjectScreenPlayAction,
                         createProjectAfficheP3Form,
                         filter,
                         initialFilter,
                         changeFilter,
                         isOpenFilter,
                         showFilter,
                         hideFilter,
                         resetFilter
                     }) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-12">
                        <Form.Label
                            label="فیلم نامه ها"
                            size="sm"
                            color="dark"
                            required
                        />

                        <div className="row w-100 mt-5">
                            <ScreenPlaysFilter
                                filter={filter}
                                initialFilter={initialFilter}
                                changeFilter={changeFilter}
                                isOpenFilter={isOpenFilter}
                                showFilter={showFilter}
                                hideFilter={hideFilter}
                                resetFilter={resetFilter}
                                readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                            />
                        </div>

                        <div className='row w-100'>
                            {
                                readAllProjectScreenPlayAction.data?.data?.screenplays?.map((screenPlay, i) =>
                                    <ScreenPlayCard
                                        key={i}
                                        screenPlay={screenPlay}
                                        createProjectAfficheP3Form={createProjectAfficheP3Form}
                                    />
                                )
                            }
                        </div>

                        <div className="row w-100 mt-5">
                            <ScreenPlaysFinder
                                readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                                filter={filter}
                                changeFilter={changeFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ScreenPlays;