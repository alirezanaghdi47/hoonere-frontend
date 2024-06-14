// modules
import {Link} from "react-router-dom";
import classNames from "classnames";

// types
import {TBreadcrumbs} from "@/types/modules.ts";

const Breadcrumbs = ({links, activeLink, ...props}: TBreadcrumbs) => {
    return (
        <ol className={classNames("breadcrumb breadcrumb-line", props.className)}>
            {
                links.map(link =>
                    <li
                        key={link.id}
                        className="breadcrumb-item"
                    >
                        {
                            activeLink === link.href ? (
                                <span className="fs-5 text-dark">
                                    {link.label}
                                </span>
                            ) : (
                                <Link
                                    to={link.href}
                                    className="fs-5 text-light"
                                >
                                    {link.label}
                                </Link>
                            )
                        }
                    </li>
                )
            }
        </ol>
    )
}

export default Breadcrumbs;