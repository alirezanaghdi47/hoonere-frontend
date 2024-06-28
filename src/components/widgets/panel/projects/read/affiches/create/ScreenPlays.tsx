// libraries
import {useRef} from 'react';
import Loadable from "@loadable/component";
import parse from 'html-react-parser';
import {useHover} from 'usehooks-ts';
import {motion, AnimatePresence} from "framer-motion";

// components
import ScreenPlaysFinder from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlaysFinder.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Button from "@/modules/Button.tsx";
import Checkbox from "@/modules/Checkbox.tsx";

// lazy components
const ReadScreenPlayModal = Loadable(() => import("@/components/widgets/panel/projects/read/affiches/create/ReadScreenPlayModal.tsx"));

export const ScreenPlayCard = ({screenPlay, createProjectAfficheP3Form, onDelete}) => {
    const cardRef = useRef(null);
    const isHover = useHover(cardRef);
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <div
                ref={cardRef}
                className="col-12 col-md-6"
            >
                <div
                    className="position-relative d-flex flex-column justify-content-between align-items-center gap-5 w-100 h-150px bg-light rounded-2 p-5 overflow-hidden">
                    <div className="d-flex flex-column justify-content-start align-items-start gap-2 w-100 h-100">
                        <div className="d-flex justify-content-start align-items-center gap-2 w-100">
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

                    <AnimatePresence>
                        {
                            isHover && (
                                <motion.div
                                    className="position-absolute z-index-1 d-flex justify-content-center align-items-center w-100 h-50px bg-light bg-opacity-90"
                                    style={{bottom: 0, left: 0}}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                >
                                    <Button
                                        textColor="primary"
                                        size="sm"
                                        isBold
                                        onClick={() => _handleShowModal(screenPlay)}
                                    >
                                        ادامه
                                    </Button>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>

                    <div
                        className='position-absolute z-index-1'
                        style={{top: 20, left: 20}}
                    >
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

const ScreenPlays = ({readAllProjectScreenPlayAction, createProjectAfficheP3Form, filter, changeFilter,}) => {
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

                        <div className='w-100 mt-5'>
                            <div className="row gy-5">
                                {
                                    readAllProjectScreenPlayAction.data?.data?.screenplays?.map((screenPlay, i) =>
                                        <ScreenPlayCard
                                            key={i}
                                            screenPlay={screenPlay}
                                            createProjectAfficheP3Form={createProjectAfficheP3Form}
                                            onDelete={() => createProjectAfficheP3Form.setFieldValue("screenplays", createProjectAfficheP3Form.values.screenplays.filter((item, j) => i !== j))}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <div className="w-100 mt-5">
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