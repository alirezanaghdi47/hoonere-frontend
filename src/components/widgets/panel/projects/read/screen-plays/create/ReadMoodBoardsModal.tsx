// libraries
import {useParams} from "react-router-dom";
import {LuPlus, LuRotateCcw, LuX} from "react-icons/lu";
import {useFormik} from "formik";

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

// stores
import useAuthStore from "@/stores/authStore.ts";

const ReadMoodBoardsModal = ({modal, _handleHideModal}) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const attachProjectMoodBoardForm = useFormik({
        initialValues: {
            title: "",
            type: "",
            content: {},
        },
        // validationSchema: createProjectMoodBoardWithFileSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = modal?.data?.editorRef.current.selection.getContent();

            modal?.data?.editorRef.current.selection.setContent(`<span data-mood-board="true" data-mood-board-id="1" style="color: #50cd89">${data}</span>`);

            resetForm();

            _handleHideModal();
        },
        onReset: async () => {
            _handleHideModal();
        }
    });

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
                    {/*{*/}
                    {/*    readAllProjectMemberAction.isPending && (*/}
                    {/*        <Loading*/}
                    {/*            withCard*/}
                    {/*            width="100%"*/}
                    {/*            height={500}*/}
                    {/*        />*/}
                    {/*    )*/}
                    {/*}*/}

                    {/*{*/}
                    {/*    readAllProjectScreenPlayAction.data?.data.screenplays.length > 0 && (*/}
                    <MoodBoardDataList
                        // readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                        // createProjectAfficheP3Form={createProjectAfficheP3Form}
                        // filter={filter}
                        // initialFilter={initialFilter}
                        // changeFilter={changeFilter}
                        // isOpenFilter={isOpenFilter}
                        // showFilter={showFilter}
                        // hideFilter={hideFilter}
                        // resetFilter={resetFilter}
                    />
                    {/*    )*/}
                    {/*}*/}

                    {/*{*/}
                    {/*    readAllProjectScreenPlayAction.data?.data.screenplays.length === 0 && (*/}
                    {/*        <Empty*/}
                    {/*            title="مود بوردی یافت نشد"*/}
                    {/*            width="100%"*/}
                    {/*            height={300}*/}
                    {/*        />*/}
                    {/*    )*/}
                    {/*}*/}
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