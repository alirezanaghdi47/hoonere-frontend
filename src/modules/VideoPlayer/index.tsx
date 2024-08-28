// libraries
import {CSSProperties, HTMLProps} from "react";
import Plyr from "plyr-react";
import classNames from "classnames";

// styles
import "plyr-react/plyr.css";
import "./index.style.scss";

type TVideoPlayer = {
    src: string,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

const VideoPlayer = ({src , ...props}: TVideoPlayer) => {
    return (
        <div
            {...props}
            className={classNames("w-100 h-max", props.className)}
        >
            <Plyr
                options={{
                    ratio: '16:9',
                    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                }}
                source={{
                    type: "video",
                    sources: [{src: src, provider: "html5"}],
                    // poster: '/assets/images/placeholder.png'
                }}
            />
        </div>
    )
}

export default VideoPlayer;