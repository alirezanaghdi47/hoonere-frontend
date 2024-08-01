// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {LuPlus, LuRotateCcw, LuX} from "react-icons/lu";

// components
import MoodBoardDataList from "@/components/widgets/panel/projects/read/screen-plays/create/MoodBoardDataList.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// modules
import Modal from "@/modules/Modal.tsx";
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Button from "@/modules/Button.tsx";

// services
import {readAllProjectMoodBoardService} from "@/services/projectMoodboardsService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const ReadMoodBoardsModal = ({modal, _handleHideModal}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const {filter, initialFilter, isOpenFilter, showFilter, hideFilter, resetFilter, changeFilter} = useFilter({
        title: "",
        type: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectMoodBoardAction = useMutation({
        mutationFn: (data) => readAllProjectMoodBoardService(data),
    });

    const attachProjectMoodBoardForm = useFormik({
        initialValues: {
            id: ""
        },
        onSubmit: async (result, {resetForm}) => {
            const data = modal?.data?.editorRef.current.selection.getContent();

            modal?.data?.editorRef.current.selection.setContent(`<span data-mood-board="true" data-mood-board-id=${result.id} style="color: #50cd89">${data}</span>`);

            resetForm();

            _handleHideModal();
        },
        onReset: async () => {
            _handleHideModal();
        }
    });

    useLayoutEffect(() => {
        readAllProjectMoodBoardAction.mutate({
            ...filter,
            project_id: params?.id
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
                    الصاق مود بورد
                </Typography>

                <div className='d-flex justify-content-end align-items-center gap-5'>
                    <IconButton
                        size="sm"
                        color="light-success"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="افزودن مود بورد"
                        onClick={() => window.open(auth.panel_url + `projects/${params.id}/mood-boards/create`, '_blank', 'rel=noopener noreferrer')}
                    >
                        <LuPlus size={20}/>
                    </IconButton>

                    <IconButton
                        size="sm"
                        color="light-info"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="بروزرسانی لیست"
                        onClick={() => readAllProjectMoodBoardAction.mutate({
                            ...filter,
                            project_id: params?.id
                        })}
                    >
                        <LuRotateCcw size={20}/>
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
                <div className='w-100 h-100'>
                    {
                        readAllProjectMoodBoardAction.isPending && (
                            <Loading
                                withCard
                                width="100%"
                                height={500}
                            />
                        )
                    }

                    {
                        readAllProjectMoodBoardAction.data?.data.moodboards.length > 0 && (
                            <MoodBoardDataList
                                readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
                                attachProjectMoodBoardForm={attachProjectMoodBoardForm}
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
                        readAllProjectMoodBoardAction.data?.data.moodboards.length === 0 && (
                            <Empty
                                title="مود بورد یافت نشد"
                                width="100%"
                                height={300}
                            />
                        )
                    }
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={attachProjectMoodBoardForm.handleReset}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={attachProjectMoodBoardForm.handleSubmit}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReadMoodBoardsModal;