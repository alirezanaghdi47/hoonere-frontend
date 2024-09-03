// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import Loadable from "@loadable/component";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {LuCornerDownLeft, LuMessageSquarePlus, LuX} from "react-icons/lu";

// components
const SendCommentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/SendCommentModal.tsx"));
const ReplyCommentModal = Loadable(() => import("@/components/widgets/panel/projects/read/contracts/ReplyCommentModal.tsx"));

import Empty from "@/components/partials/panel/Empty.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Modal from "@/modules/Modal";
import Typography from "@/modules/Typography";
import IconButton from "@/modules/IconButton";

// services
import {
    readAllProjectContractCommentService,
    IReadAllProjectContractComment
} from "@/services/projectContractService.ts";

const CommentItem = ({comment, readAllProjectContractCommentAction}) => {
    const {
        modal: replyCommentModal,
        _handleShowModal: _handleShowReplyCommentModal,
        _handleHideModal: _handleHideReplyCommentModal
    } = useModal();

    return (
        <>
            <div
                className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 bg-light rounded-2 p-5">
                <div className='d-flex justify-content-start align-items-center gap-5 w-100'>
                    <LazyLoadImage
                        src={comment?.profile_img}
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
                            {comment?.user_info?.user_type === "1" ? comment?.user_info.first_name + " " + comment?.user_info.last_name : comment?.user_info.company_name}
                        </Typography>

                        <Typography
                            size="xxs"
                            color="dark"
                        >
                            {format(comment?.created_at, "HH:mm | yyyy-MM-dd")}
                        </Typography>
                    </div>

                    {
                        !comment?.parent_id && (
                            <IconButton
                                size="sm"
                                color='light-info'
                                onClick={() => _handleShowReplyCommentModal(comment)}
                                className="ms-auto"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="پاسخ دهید"
                            >
                                <LuCornerDownLeft size={20}/>
                            </IconButton>
                        )
                    }
                </div>

                <div className='d-flex justify-content-start align-items-center w-100 '>
                    <Typography
                        size="xs"
                        color="dark"
                    >
                        {comment?.content}
                    </Typography>
                </div>
            </div>

            {
                replyCommentModal.isOpen && (
                    <ReplyCommentModal
                        modal={replyCommentModal}
                        _handleHideModal={_handleHideReplyCommentModal}
                        readAllProjectContractCommentAction={readAllProjectContractCommentAction}
                    />
                )
            }
        </>
    )
}

const CommentsModal = ({modal, _handleHideModal}) => {
    const params = useParams();
    const {
        modal: sendCommentModal,
        _handleShowModal: _handleShowSendCommentModal,
        _handleHideModal: _handleHideSendCommentModal
    } = useModal();

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
        <>
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
                        {readAllProjectContractCommentAction.data?.data?.comments.length > 0 && `( ${readAllProjectContractCommentAction.data?.data.comments.length} )`}
                    </Typography>

                    <div className="d-flex justify-content-end align-items-center gap-5">
                        <IconButton
                            size="sm"
                            color="light-success"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="ارسال دیدگاه"
                            onClick={() => _handleShowSendCommentModal(modal?.data)}
                        >
                            <LuMessageSquarePlus size={20}/>
                        </IconButton>

                        <IconButton
                            size="sm"
                            color="light-danger"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="خروج"
                            onClick={_handleHideModal}
                        >
                            <LuX size={20}/>
                        </IconButton>
                    </div>
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
                                <ul className="vstack justify-content-start gap-5 w-100 h-300px p-0 m-0">
                                    {
                                        readAllProjectContractCommentAction.data?.data?.comments.filter(comment => !comment.parent_id).map(comment =>
                                            <li
                                                key={comment.id}
                                                className='d-flex flex-column justify-content-start align-items-start gap-5 w-100'
                                            >
                                                <CommentItem
                                                    comment={comment}
                                                    readAllProjectContractCommentAction={readAllProjectContractCommentAction}
                                                />

                                                {
                                                    readAllProjectContractCommentAction.data?.data?.comments?.filter(replyComment => replyComment.parent_id === comment.id.toString()).map(replyComment =>
                                                        <div
                                                            key={replyComment.id}
                                                            className="w-100 ps-10"
                                                        >
                                                            <CommentItem
                                                                comment={replyComment}
                                                                readAllProjectContractCommentAction={readAllProjectContractCommentAction}
                                                            />
                                                        </div>
                                                    )
                                                }
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

            {
                sendCommentModal.isOpen && (
                    <SendCommentModal
                        modal={sendCommentModal}
                        _handleHideModal={_handleHideSendCommentModal}
                        readAllProjectContractCommentAction={readAllProjectContractCommentAction}
                    />
                )
            }
        </>
    )
}

export default CommentsModal;