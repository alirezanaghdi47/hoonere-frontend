// libraries
import Popup from 'reactjs-popup';

// styles
import 'reactjs-popup/dist/index.css';
import "@/styles/modules/popover.scss";

const Popover = ({children, content, trigger, position}) => {
    return (
        <Popup
            trigger={<span>{content}</span>}
            on={trigger}
            position={position}
            closeOnDocumentClick
            arrow={false}
            offsetX={10}
            offsetY={3}
        >
            {children}
        </Popup>
    )
}

export default Popover;