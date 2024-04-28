// libraries
import {Tooltip as ReactTooltip} from 'react-tooltip';

// styles
import 'react-tooltip/dist/react-tooltip.css';
import "@/styles/modules/tooltip.scss";

const Tooltip = () => {
    return (
        <ReactTooltip
            id="my-tooltip"
            noArrow
            offset={5}
        />
    )
}

export default Tooltip;