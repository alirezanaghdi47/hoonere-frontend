// libraries
import {useState} from "react";
import {Link , useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMediaQuery} from "usehooks-ts";
import {LuLayers, LuLogOut, LuPieChart} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";
import toast from "@/helpers/toast.tsx";

// services
import {logoutService} from "@/services/authService.ts";

// stores
import useAppStore from "@/stores/appStore.ts";
import useAuthStore from "@/stores/authStore.ts";

const Sidebar = () => {
    const navigate = useNavigate();
    const {app: {isOpenDrawer}, hideDrawer} = useAppStore();
    const {logout, auth} = useAuthStore();
    const isDesktop = useMediaQuery("(min-width: 992px)");

    const [sidebarLinks , setSidebarLinks] = useState([
        {
            id: 1,
            label: "داشبورد",
            href: auth.panel_url + "dashboard",
            icon: LuPieChart({size: 20, color: 'currentColor'})
        },
        {
            id: 2,
            label: "پروژه ها",
            href: auth.panel_url + "projects",
            icon: LuLayers({size: 20, color: 'currentColor'})
        },
    ]);

    const logoutAction = useMutation({
        mutationFn: () => logoutService(),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                hideDrawer();

                logout();

                navigate("/auth/sign-in", {replace: true});
            } else {
                toast("error", data.message);
            }
        }
    });

    return (
        <div
            className={`aside ${!isDesktop ? "drawer drawer-start" : ""} ${isOpenDrawer ? "drawer-on" : ""} shadow-sm`}>
            <div className="d-none d-lg-flex justify-content-center align-items-center my-10">
                <Link
                    to={auth.panel_url + "dashboard"}
                    className="w-max mb-5"
                >
                    <LazyLoadImage
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={40}
                        height={40}
                    />
                </Link>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <ul className="vstack justify-content-start justify-content-lg-center gap-5 h-100 p-0 m-0 pt-20 pt-lg-0">
                    {
                        sidebarLinks.map((sidebarLink) => (
                            <li
                                key={sidebarLink.id}
                                className="d-flex justify-content-center align-items-center w-100"
                            >
                                <IconButton
                                    href={sidebarLink.href}
                                    color={sidebarLink.href === location.pathname ? "primary" : "light"}
                                    activeColor="light-primary"
                                    onClick={hideDrawer}
                                >
                                    {sidebarLink.icon}
                                </IconButton>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center my-10">
                <ul className="vstack justify-content-center gap-5 p-0 m-0">
                    <li className="d-flex justify-content-center align-items-center w-100">
                        <IconButton
                            color="light"
                            activeColor="light-danger"
                            onClick={logoutAction.mutate}
                            isLoading={logoutAction.isPending}
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