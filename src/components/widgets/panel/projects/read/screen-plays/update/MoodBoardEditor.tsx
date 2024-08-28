// libraries
import {useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Loadable from "@loadable/component";

// components
const MoodBoardsModal = Loadable(() => import("@/components/widgets/panel/projects/read/screen-plays/update/ReadMoodBoardsModal.tsx"));

// hooks
import useModal from "@/hooks/useModal.tsx";

// modules
import TextEditor from "@/modules/TextEditor";

// stores
import useAuthStore from "@/stores/authStore.ts";

const MoodBoardEditor = ({id, name, value, onChange}) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const {auth} = useAuthStore();
    const {modal, _handleShowModal, _handleHideModal} = useModal();

    return (
        <>
            <TextEditor
                ref={editorRef}
                id={id}
                name={name}
                value={value}
                toolbarAddon="print"
                contextMenuAddon="moodBoard"
                setupAddon={(editor) => {
                    editor.ui.registry.addMenuItem('readMoodBoard', {
                        text: 'نمایش مود بورد',
                        onAction: (api) => {
                            navigate(auth.panel_url + "projects/" + params.id + "/mood-boards/" + editorRef.current.selection.getNode().getAttribute("data-mood-board-id"), {state: {background: location}});
                        }
                    });

                    editor.ui.registry.addMenuItem('createMoodBoard', {
                        text: 'افزودن به مود بورد',
                        onAction: (api) => {
                            _handleShowModal({editorRef: editorRef});
                        }
                    });

                    editor.ui.registry.addMenuItem('deleteMoodBoard', {
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
                                return ["readMoodBoard", "deleteMoodBoard"];
                            } else {
                                return "createMoodBoard";
                            }
                        }
                    });
                }}
                onChange={onChange}
            />

            {
                modal.isOpen && (
                    <MoodBoardsModal
                        modal={modal}
                        _handleHideModal={_handleHideModal}
                    />
                )
            }
        </>
    )
}

export default MoodBoardEditor;