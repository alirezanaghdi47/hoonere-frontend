// libraries
import Plyr from "plyr-react";
import classNames from "classnames";

// styles
import "plyr-react/plyr.css";
import "@/styles/modules/player.scss";

// types
import {TVideoPlayer} from "@/types/moduleType.ts";

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
                    poster: '/assets/images/placeholder.png'
                }}
            />
        </div>
    )
}

export default VideoPlayer;