// libraries
import {useNavigate} from "react-router-dom";
import Loadable from "@loadable/component";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuFileSignature, LuX} from "react-icons/lu";

// components
const InvitationModal = Loadable(() => import("@/components/widgets/panel/projects/invited/InvitationModal.tsx"));

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Typography from "@/modules/Typography";
import Modal from "@/modules/Modal";
import IconButton from "@/modules/IconButton";
import Chip from "@/modules/Chip";

const DataModal = ({project , readInvitedProjectAction}) => {
    const navigate = useNavigate();
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <Modal
                isOpen={true}
                onClose={() => navigate(-1)}
                position='center'
                width="md"
            >
                <Modal.Header>
                    <Typography
                        variant='h3'
                        size="lg"
                        color="dark"
                        isBold
                    >
                        جزییات پروژه دعوت شده
                    </Typography>

                    <div className='d-flex justify-content-end align-items-center gap-5'>
                        {
                            project?.status_id === "1" && (
                                <IconButton
                                    size="sm"
                                    color="light-success"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="تعیین وضعیت مشارکت"
                                    onClick={() => _handleShowModal(project)}
                                >
                                    <LuFileSignature size={20}/>
                                </IconButton>
                            )
                        }

                        <IconButton
                            size="sm"
                            color="light-danger"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="خروج"
                            onClick={() => navigate(-1)}
                        >
                            <LuX size={20}/>
                        </IconButton>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div className='d-flex flex-column justify-content-start align-items-center gap-5 w-100 h-100 p-5'>
                        <LazyLoadImage
                            src={project?.logo}
                            width={150}
                            height={150}
                            className="object-fit-cover rounded-circle"
                        />

                        <Typography
                            size="lg"
                            color="dark"
                            isBold
                        >
                            {project?.title}
                        </Typography>

                        <Typography
                            size="sm"
                            color="dark"
                        >
                            {project?.description}
                        </Typography>

                        <div className='d-flex flex-wrap justify-content-center align-items-center gap-5 w-75'>
                            <Chip
                                size="lg"
                                label={` پروژه ${project?.type_info?.title} `}
                                color="light-dark"
                            />

                            <Chip
                                size="lg"
                                label={` شامل ${project?.count_of_parts} قسمت `}
                                color="light-dark"
                            />

                            <Chip
                                size="lg"
                                label={` هر قسمت ${project?.time_of_parts} دقیقه `}
                                color="light-dark"
                            />

                            <Chip
                                size="lg"
                                label={` با تهیه کنندگی ${project?.producer_info?.first_name + " " + project?.producer_info?.last_name} `}
                                color="light-dark"
                            />

                            <Chip
                                size="lg"
                                label={` فیلم برداری در ${project?.location} `}
                                color="light-dark"
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {
                modal?.isOpen && (
                    <InvitationModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                        readInvitedProjectAction={readInvitedProjectAction}
                    />
                )
            }
        </>
    )
}

export default DataModal;