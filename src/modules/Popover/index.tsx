// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import Popup from 'reactjs-popup';

// styles
import 'reactjs-popup/dist/index.css';
import "./index.style.scss";

const Popover = ({children, content, trigger, position = 'center center' , ...props}: TPopover) => {
    return (
        <Popup
            trigger={<span>{content}</span>}
            on={trigger}
            position={position}
            closeOnDocumentClick
            arrow={false}
            offsetX={10}
            offsetY={5}
            className={props.className}
        >
            {children}
        </Popup>
    )
}

type TPopover = {
    children: ReactNode,
    content: ReactNode,
    trigger: ("click" | "hover" | "focus")[],
    position?: 'center center' | 'top left' | 'top right' | 'bottom right' | 'bottom left' | 'right center' | 'left center' | 'top center' | 'bottom center'
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default Popover;