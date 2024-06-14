// libraries
import classNames from "classnames";

// types
import {TTabs, TTabsItem} from "@/types/modules.ts";

const Tabs = ({children, variant = "link", isVertical = false, ...props}: TTabs) => {
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

const TabsItem = ({label, isActive = false, onClick, ...props}: TTabsItem) => {
    return (
        <li
            {...props}
            className="nav-item"
        >
            <span
                className={classNames("nav-link fs-5 text-active-primary fw-bold ms-0 me-10 py-5 cursor-pointer", props.className, {
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