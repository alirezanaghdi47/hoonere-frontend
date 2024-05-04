// libraries
import ReactPaginate from "rc-pagination";
import {LuChevronLeft, LuChevronRight, LuMoreHorizontal} from "react-icons/lu";

// styles
import "@/styles/modules/pagination.scss";

const PrevIcon = () => {
    return (
        <div className="text-muted">
            <LuChevronRight
                size={20}
                color="currentColor"
            />
        </div>
    )
}

const NextIcon = () => {
    return (
        <div className="text-muted">
            <LuChevronLeft
                size={20}
                color="currentColor"
            />
        </div>
    )
}

const JumpIcon = () => {
    return (
        <div className="text-muted">
            <LuMoreHorizontal
                size={20}
                color="currentColor"
            />
        </div>
    )
}

const Pagination = ({current, pageSize, total, onChange}) => {
    return (
        <ReactPaginate
            current={current}
            total={total}
            pageSize={pageSize}
            showLessItems
            onChange={(value) => onChange(parseInt(value))}
            prevIcon={PrevIcon}
            nextIcon={NextIcon}
            jumpNextIcon={JumpIcon}
            jumpPrevIcon={JumpIcon}
        />
    )
}

export default Pagination;