// libraries
import ReactPaginate from "rc-pagination";
import {LuChevronLeft, LuChevronRight, LuMoreHorizontal} from "react-icons/lu";

// styles
import "@/styles/modules/pagination.scss";

// types
import {TPagination} from "@/types/moduleType.ts";

const PrevIcon = () => {
    return (
        <LuChevronRight
            size={20}
            color="currentColor"
            className="text-muted"
        />
    )
}

const NextIcon = () => {
    return (
        <LuChevronLeft
            size={20}
            color="currentColor"
            className="text-muted"
        />
    )
}

const JumpIcon = () => {
    return (
        <LuMoreHorizontal
            size={20}
            color="currentColor"
            className="text-muted"
        />
    )
}

const Pagination = ({current, pageSize, total, onChange , ...props}: TPagination) => {
    return (
        <ReactPaginate
            current={current}
            total={total}
            pageSize={pageSize}
            showLessItems
            onChange={(value) => onChange(value)}
            prevIcon={PrevIcon}
            nextIcon={NextIcon}
            jumpNextIcon={JumpIcon}
            jumpPrevIcon={JumpIcon}
            className={props.className}
        />
    )
}

export default Pagination;