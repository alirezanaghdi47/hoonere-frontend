// libraries
import {useRef} from "react";
import {useFormik} from "formik";
import {LuX} from "react-icons/lu";

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import Form from "@/modules/Form.tsx";
import FileInput from "@/modules/FileInput.tsx";
import Textarea from "@/modules/Textarea.tsx";
import Button from "@/modules/Button.tsx";
import Modal from "@/modules/Modal.tsx";
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import TextEditor from "@/modules/TextEditor.tsx";

// utils
import {createMoodBoardSchema} from "@/utils/validations.ts";

const CreateMoodBoardModal = ({modal, _handleHideModal}) => {
    const createMoodBoardForm = useFormik({
        initialValues: {
            image: {},
            description: "",
        },
        validationSchema: createMoodBoardSchema,
        onSubmit: async (result, {resetForm}) => {
            const data = modal?.data?.editorRef.current.selection.getContent();

            modal?.data?.editorRef.current.selection.setContent(`<a href="https://www.google.com" data-mood-board="true" style="color: #50cd89">${data}</a>`);

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
            width="md"
            height="content"
        >
            <Modal.Header>
                <Typography
                    variant='h3'
                    size="lg"
                    color="dark"
                    isBold
                >
                    مود بورد
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
                <Form.Group>
                    <Form.Label
                        label="عکس"
                        color="dark"
                        size="sm"
                    />

                    <FileInput
                        id="image"
                        name="image"
                        value={createMoodBoardForm.values.image}
                        onChange={(value) => createMoodBoardForm.setFieldValue("image", value)}
                    />

                    <Form.Error
                        error={createMoodBoardForm.errors.image}
                        touched={createMoodBoardForm.touched.image}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label
                        label="توضیحات"
                        color="dark"
                        size="sm"
                    />

                    <Textarea
                        id="description"
                        name="description"
                        value={createMoodBoardForm.values.description}
                        onChange={(value) => createMoodBoardForm.setFieldValue("description", value)}
                    />

                    <Form.Error
                        error={createMoodBoardForm.errors.description}
                        touched={createMoodBoardForm.touched.description}
                    />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    color="light-danger"
                    onClick={() => createMoodBoardForm.handleReset(createMoodBoardForm)}
                >
                    لغو
                </Button>

                <Button
                    color="success"
                    onClick={() => createMoodBoardForm.handleSubmit()}
                >
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const MoodBoardEditor = ({id, name, value, onChange}) => {
    const editorRef = useRef(null);
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <TextEditor
                ref={editorRef}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                contextMenuAddon="moodBoard"
                setupAddon={(editor) => {
                    editor.ui.registry.addMenuItem('createModeBoard', {
                        text: 'افزودن به مود بورد',
                        onAction: (api) => {
                            _handleShowModal({editorRef: editorRef});
                        }
                    });

                    editor.ui.registry.addMenuItem('deleteModeBoard', {
                        text: 'حذف از مود بورد',
                        onAction: () => {
                            modal?.data?.editorRef.current.selection.expand();

                            const data = editorRef.current.selection.getContent();
                            const node = editorRef.current.selection.getNode();

                            editorRef.current.dom.remove(node);

                            editorRef.current.selection.setContent(data);
                        }
                    });

                    editor.ui.registry.addContextMenu("moodBoard", {
                        update: (element) => {
                            if (element.hasAttribute("data-mood-board")) {
                                return "deleteModeBoard";
                            } else {
                                return "createModeBoard";
                            }
                        }
                    });
                }}
            />

            {
                modal.isOpen && (
                    <CreateMoodBoardModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                    />
                )
            }
        </>
    )
}

export default MoodBoardEditor;