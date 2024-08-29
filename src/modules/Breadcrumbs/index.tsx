// libraries
import {CSSProperties, HTMLProps} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

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

type TBreadcrumbs = {
    links: { id: number, label: string, href: string }[],
    activeLink: string,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export default Breadcrumbs;