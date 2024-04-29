// libraries
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMediaQuery} from "usehooks-ts";
import {LuLayers, LuLogOut, LuPieChart} from "react-icons/lu";

// assets
import logo from "@/assets/images/logo.svg";

// modules
import IconButton from "@/modules/IconButton.tsx";

// stores
import useAppStore from "@/stores/appStore.ts";

const sidebarLinks = [
    {id: 1, label: "داشبورد", href: "/account/dashboard", icon: LuPieChart({size: 20, color: 'currentColor'})},
    {id: 2, label: "پروژه ها", href: "/account/projects", icon: LuLayers({size: 20, color: 'currentColor'})},
];

const Sidebar = () => {
    const {app: {isOpenDrawer}, hideDrawer} = useAppStore();
    const isDesktop = useMediaQuery("(min-width: 992px)");

    return (
        <div
            className={`aside ${!isDesktop ? "drawer drawer-start" : ""} ${isOpenDrawer ? "drawer-on" : ""} shadow-sm`}>
            <div className="d-none d-lg-flex justify-content-center align-items-center my-10">
                <Link
                    to="/account/dashboard"
                    className="w-max mb-5"
                >
                    <LazyLoadImage
                        src={logo}
                        alt="logo"
                        width={40}
                    />
                </Link>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <ul className="vstack justify-content-start justify-content-lg-center gap-5 h-100 p-0 m-0 pt-20 pt-lg-0">
                    {sidebarLinks.map((sidebarLink) => (
                        <li
                            key={sidebarLink.id}
                            className="d-flex justify-content-center align-items-center w-100"
                        >
                            <IconButton
                                href={sidebarLink.href}
                                color={sidebarLink.href === location.pathname ? "primary" : "light"}
                                onClick={hideDrawer}
                            >
                                {sidebarLink.icon}
                            </IconButton>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center my-10">
                <ul className="vstack justify-content-center gap-5 p-0 m-0">
                    <li className="d-flex justify-content-center align-items-center w-100">
                        <IconButton
                            color="light"
                            activeColor="light-danger"
                            onClick={hideDrawer}
                        >
                            <LuLogOut
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;