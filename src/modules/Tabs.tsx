const Tabs = ({variant = "link", isVertical = false, children}) => {
    return (
        <ul className={`nav nav-tabs nav-stretch ${isVertical ? "flex-row flex-md-column" : ""} ${variant === "pill" ? "nav-pills" : variant === "link" ? "nav-line-tabs nav-line-tabs-2x" : ""} border-0 border-transparent`}>
            {children}
        </ul>
    )
}

const TabsItem = ({label, isActive, onClick}) => {
    return (
        <li className="nav-item">
            <span
                className={`nav-link fs-5 text-active-primary fw-bold ms-0 me-10 py-5 ${isActive ? "active" : ""} cursor-pointer`}
                onClick={onClick}
            >
                {label}
            </span>
        </li>
    )
}

Tabs.Item = TabsItem;

export default Tabs;