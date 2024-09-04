// libraries
import {useLocation, useNavigate} from "react-router-dom";

// modules
import Button from "@/modules/Button";
import Badge from "@/modules/Badge";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();
    const {app: {notifications}} = useAppStore();

    return (
        <div className="card w-100">
            <div className="card-body d-flex justify-content-start align-items-center gap-5">
                <Button
                    color={location.hash === "#is_invited=0" ? "primary" : "light"}
                    onClick={() => navigate(auth.panel_url + "projects#is_invited=0")}
                >
                    {
                        notifications.filter(notification => ["project" , "affiche" , "contract" , "contract_comment"].includes(notification.type) && notification.sub_type === "index").length > 0 && (
                            <Badge
                                size="xs"
                                color="danger"
                                isCircle
                                placement="top-end"
                            />
                        )
                    }

                   پروژه های من
                </Button>

                <Button
                    color={location.hash === "#is_invited=1" ? "primary" : "light"}
                    onClick={() => navigate(auth.panel_url + "projects#is_invited=1")}
                >
                    {
                        notifications.filter(notification => ["project" , "affiche" , "contract" , "contract_comment"].includes(notification.type) && notification.sub_type === "invited").length > 0 && (
                            <Badge
                                size="xs"
                                color="danger"
                                isCircle
                                placement="top-end"
                            />
                        )
                    }

                    پروژه های دعوت شده
                </Button>
            </div>
        </div>
    )
}

export default TabBar;