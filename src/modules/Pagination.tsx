// libraries
import ReactPaginate from "rc-pagination";

// styles
import "@/styles/modules/pagination.scss";

const Pagination = ({current, pageSize, total, onChange}) => {
    return (
        <ReactPaginate
            current={current}
            total={total}
            pageSize={pageSize}
            showLessItems
            onChange={(value) => onChange(parseInt(value))}
            // prevIcon={<LuChevronRight/>}
            // nextIcon={() => <i className="fad fa-chevron-left"/>}
            // jumpPrevIcon={() => <i className="fad fa-ellipsis"/>}
            // jumpNextIcon={() => <i className="fad fa-ellipsis"/>}
        />
    )
}

export default Pagination;