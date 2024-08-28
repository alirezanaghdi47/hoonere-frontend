// libraries
import {useLocation, useNavigate, useParams} from "react-router-dom";

// modules
import Button from "@/modules/Button";

// stores
import useAuthStore from "@/stores/authStore.ts";

const TabBar = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {auth} = useAuthStore();

    return (
        <div className="card w-100">
            <div className="card-body d-flex justify-content-start align-items-center gap-5">
                <Button
                    color={location.hash === "#is_invited=0" ? "primary" : "light"}
                    onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/contracts#is_invited=0")}
                >
                   قرارداد های من
                </Button>

                <Button
                    color={location.hash === "#is_invited=1" ? "primary" : "light"}
                    onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/contracts#is_invited=1")}
                >
                    قرارداد های دعوت شده
                </Button>
            </div>
        </div>
    )
}

export default TabBar;