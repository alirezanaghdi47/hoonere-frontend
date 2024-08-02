// libraries
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuX} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Modal from "@/modules/Modal.tsx";
import IconButton from "@/modules/IconButton.tsx";
import VideoPlayer from "@/modules/VideoPlayer.tsx";
import MusicPlayer from "@/modules/MusicPlayer.tsx";

const DataModal = ({moodBoard}) => {
    const navigate = useNavigate();

    return (
        <Modal
            isOpen={true}
            onClose={() => navigate(-1)}
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
                    مود بورد
                </Typography>

                <IconButton
                    size="sm"
                    color="light-danger"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="خروج"
                    onClick={() => navigate(-1)}
                >
                    <LuX size={20}/>
                </IconButton>
            </Modal.Header>

            <Modal.Body>
                <div className='w-100 h-100'>
                    {
                        moodBoard?.type === "1" && (
                            <LazyLoadImage
                                src={moodBoard?.content}
                                visibleByDefault
                                width="100%"
                                height="100%"
                                effect='blur'
                                style={{borderRadius: 10}}
                            />
                        )
                    }

                    {
                        moodBoard?.type === "2" && (
                            <VideoPlayer src={moodBoard?.content}/>
                        )
                    }

                    {
                        moodBoard?.type === "3" && (
                            <MusicPlayer src={moodBoard?.content}/>
                        )
                    }

                    {
                        moodBoard?.type === "4" && (
                            <Typography
                                size="sm"
                                color="dark"
                                lineHeight="lg"
                            >
                                {moodBoard?.content}
                            </Typography>
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DataModal;