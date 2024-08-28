// libraries
import {CSSProperties, HTMLProps} from "react";
import Plyr from "plyr-react";
import classNames from "classnames";

// styles
import "plyr-react/plyr.css";
import "./index.style.scss";

type TMusicPlayer = {
    src: string,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

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