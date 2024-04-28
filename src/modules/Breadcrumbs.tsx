// modules
import {Link} from "react-router-dom";

const Breadcrumbs = ({links, activeLink}) => {
    return (
        <ol className="breadcrumb breadcrumb-line">
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