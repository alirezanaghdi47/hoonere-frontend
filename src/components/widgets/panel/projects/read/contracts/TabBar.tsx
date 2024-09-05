// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";

// modules
import Button from "@/modules/Button";
import Badge from "@/modules/Badge";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const TabBar = ({checkProjectIsMineAction}) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {auth} = useAuthStore();
    const {app: {notifications}} = useAppStore();

    return (
        <div className="card w-100">
            <div className="card-body d-flex justify-content-start align-items-center gap-5">
                <Button
                    color={location.hash === "#is_invited=0" ? "primary" : "light"}
                    onClick={() => location.pathname + location.hash !== `/panel/projects/${params.id}/contracts#is_invited=0` ? navigate(auth.panel_url + "projects/" + params.id + "/contracts#is_invited=0"): null}
                    disabled={checkProjectIsMineAction.isPending ? true : checkProjectIsMineAction.data?.data?.result === "0"}
                >
                    {
                        notifications.filter(notification => ["contract" , "contract_comment"].includes(notification.type) && notification.sub_type === "index").length > 0 && (
                            <Badge
                                size="xs"
                                color="danger"
                                isCircle
                                placement="top-end"
                            />
                        )
                    }

                    قرارداد های من
                </Button>

                <Button
                    color={location.hash === "#is_invited=1" ? "primary" : "light"}
                    onClick={() => location.pathname + location.hash !== `/panel/projects/${params.id}/contracts#is_invited=1` ? navigate(auth.panel_url + "projects/" + params.id + "/contracts#is_invited=1"): null}
                    disabled={checkProjectIsMineAction.isPending ? true : checkProjectIsMineAction.data?.data?.result === "1"}
                >
                    {
                        notifications.filter(notification => ["contract" , "contract_comment"].includes(notification.type) && notification.sub_type === "invited").length > 0 && (
                            <Badge
                                size="xs"
                                color="danger"
                                isCircle
                                placement="top-end"
                            />
                        )
                    }

                    قرارداد های دعوت شده
                </Button>
            </div>
        </div>
    )
}

export default TabBar;