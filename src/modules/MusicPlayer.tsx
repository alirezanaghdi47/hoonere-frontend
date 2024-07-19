// libraries
import Plyr from "plyr-react";
import classNames from "classnames";

// styles
import "plyr-react/plyr.css";
import "@/styles/modules/player.scss";

// types
import {TMusicPlayer} from "@/types/moduleType.ts";

const MusicPlayer = ({src, ...props}: TMusicPlayer) => {
    return (
        <div
            {...props}
            className={classNames("w-100 h-max", props.className)}
        >
            <Plyr
                options={{
                    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume'],
                }}
                source={{
                    type: "audio",
                    sources: [{src: src, provider: "html5"}],
                }}
            />
        </div>
    )
}

export default MusicPlayer;