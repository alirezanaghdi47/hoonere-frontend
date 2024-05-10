// libraries
import classNames from "classnames";

const Tabs = ({children, variant = "link", isVertical, ...props}) => {
    return (
        <ul
            {...props}
            className={classNames("nav nav-tabs nav-stretch border-0 border-transparent", props.className, {
                "flex-row flex-md-column": isVertical,
                "nav-pills": variant === "pill",
                "nav-line-tabs nav-line-tabs-2x": variant === "link",
            })}
        >
            {children}
        </ul>
    )
}

const TabsItem = ({label, isActive, onClick, ...props}) => {
    return (
        <li
            {...props}
            className="nav-item"
        >
            <span
                className={classNames("nav-link fs-5 text-active-primary fw-bold ms-0 me-10 py-5 cursor-pointer", {
                    "active": isActive
                })}
                onClick={onClick}
            >
                {label}
            </span>
        </li>
    )
}

Tabs.Item = TabsItem;

export default Tabs;