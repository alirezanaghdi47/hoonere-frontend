// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import Loadable from "@loadable/component";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMutation} from "@tanstack/react-query";
import {LuCornerDownLeft, LuX} from "react-icons/lu";

// components
const ReplyCommentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/read/ReplyCommentModal.tsx"));

import Empty from "@/components/partials/panel/Empty.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Modal from "@/modules/Modal";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";

// services
import {readAllProjectContractCommentService , IReadAllProjectContractComment} from "@/services/projectContractService.ts";

const CommentItem = ({comment}) => {
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 bg-light rounded-2 p-5">
                <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                    <LazyLoadImage
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={25}
                        height={25}
                        className="object-fit-cover rounded-circle"
                    />

                    <div className='d-flex flex-column justify-content-start align-items-start gap-2'>
                        <Typography
                            size="xs"
                            color="dark"
                            isBold
                        >
                            علیرضا نقدی
                        </Typography>

                        <Typography
                            size="xxs"
                            color="dark"
                        >
                            1400/11/11 | 12:40
                        </Typography>
                    </div>

                    <IconButton
                        size="sm"
                        color='light-info'
                        onClick={() => _handleShowModal(comment)}
                        className="ms-auto"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="پاسخ دهید"
                    >
                        <LuCornerDownLeft size={20}/>
                    </IconButton>
                </div>

                <div className='d-flex justify-content-start align-items-center w-100 '>
                    <Typography
                        size="xs"
                        color="dark"
                    >
                        متن دیدگاه
                    </Typography>
                </div>
            </div>

            {
                modal.isOpen && (
                    <ReplyCommentModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                    />
                )
            }
        </>
    )
}

const CommentsModal = ({modal, _handleHideModal}) => {
    const params = useParams();

    const readAllProjectContractCommentAction = useMutation({
        mutationFn: (data: IReadAllProjectContractComment) => readAllProjectContractCommentService(data),
    });

    useLayoutEffect(() => {
        readAllProjectContractCommentAction.mutate({
            project_id: params.id,
            contract_id: modal?.data?.id.toString()
        });
    }, []);

    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={_handleHideModal}
            position='center'
            width="lg"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    دیدگاه ها
                    &nbsp;
                    ( 4 )
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={_handleHideModal}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 h-100">
                    {
                        readAllProjectContractCommentAction.isPending && (
                            <Loading
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    {
                        !readAllProjectContractCommentAction.isPending && readAllProjectContractCommentAction.data?.data?.comments.length > 0 && (
                            <ul className="vstack justify-content-center gap-5 w-100 p-0 m-0">
                                {
                                    readAllProjectContractCommentAction.data?.data?.comments.map(comment =>
                                        <li key={comment.id}>
                                            <CommentItem comment={comment}/>
                                        </li>
                                    )
                                }
                            </ul>
                        )
                    }

                    {
                        !readAllProjectContractCommentAction.isPending && readAllProjectContractCommentAction.data?.data?.comments.length === 0 && (
                            <Empty
                                title="دیدگاهی یافت نشد"
                                width="100%"
                                height={300}
                            />
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CommentsModal;