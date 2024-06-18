// libraries
import Popup from 'reactjs-popup';

// styles
import 'reactjs-popup/dist/index.css';
import "@/styles/modules/popover.scss";

// types
import {TPopover} from "@/types/moduleType.ts";

const Popover = ({children, content, trigger, position , ...props}: TPopover) => {
    return (
        <Popup
            trigger={<span>{content}</span>}
            on={trigger}
            position={position}
            closeOnDocumentClick
            arrow={false}
            offsetX={10}
            offsetY={3}
            className={props.className}
        >
            {children}
        </Popup>
    )
}

export default Popover;