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
                    <VideoPlayer src="https://caspian11.asset.aparat.com/aparat-video/988c1891d41df216e2ebe2bde6e7b4dd59863235-720p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjhiZDNkNDE0ODJkYzc5ZDlkNTdjNzVlNjkwMTExMGM1IiwiZXhwIjoxNzIxMzEwMDgwLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.Jakb7gJQnAo1kp9QsPdYUoCW0_Mhi6b4neb_JZmbYts"/>
                    {/*<MusicPlayer src="https://irsv.upmusics.com/AliBZ/Farhad%20Shakhs%20-%20Babe%20delami%20(320).mp3"/>*/}
                    {/*<LazyLoadImage*/}
                    {/*    src="https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/wzmobile/meta-data/wzm_meta.jpg"*/}
                    {/*    visibleByDefault*/}
                    {/*    width="100%"*/}
                    {/*    height="100%"*/}
                    {/*    effect='blur'*/}
                    {/*    style={{borderRadius: 10}}*/}
                    {/*/>*/}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DataModal;