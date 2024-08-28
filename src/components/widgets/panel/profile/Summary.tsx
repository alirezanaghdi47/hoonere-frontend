// libraries
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

// modules
import Typography from "@/modules/Typography";
import Chip from "@/modules/Chip";
import Tabs from "@/modules/Tabs";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Summary = ({readMyProfileAction}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useAuthStore();

    const [navbarLinks, setNavbarLinks] = useState([
        {id: 1, label: "بررسی اجمالی", href: auth.panel_url + "profile#review", value: "#review"},
        {id: 2, label: "هویتی", href: auth.panel_url + "profile#identify", value: "#identify"},
        {id: 3, label: "شغلی", href: auth.panel_url + "profile#occupation", value: "#occupation"},
        {id: 4, label: "مالی", href: auth.panel_url + "profile#financial", value: "#financial"},
    ]);

    return (
        <div className="card w-100">
            <div className="card-body pb-0">
                <div
                    className="d-flex flex-column flex-sm-row justify-content-start align-items-start gap-5 w-100 h-100 mb-5">
                    <div
                        className="d-flex justify-content-center align-items-center w-150px h-150px overflow-hidden">
                        <LazyLoadImage
                            src={readMyProfileAction.data?.data?.user_info?.profile_img_asset}
                            width={150}
                            height={150}
                            className="w-100 h-100 object-fit-cover rounded-circle"
                        />
                    </div>

                    <div className="d-flex flex-column justify-content-start align-items-start h-100 gap-5">
                        <Typography
                            variant="h3"
                            size="lg"
                            color="dark"
                            isBold
                        >
                            {readMyProfileAction.data?.data?.user_info?.username}
                        </Typography>

                        <Chip
                            label={readMyProfileAction.data?.data?.user_info?.type_info?.title}
                            color={readMyProfileAction.data?.data?.user_info?.type_info?.class_name}
                            size="lg"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-start align-items-start gap-5 w-100 px-10">
                <Tabs>
                    {
                        navbarLinks?.map(navbarLink =>
                            <Tabs.Item
                                isActive={location.hash === navbarLink.value}
                                key={navbarLink.id}
                                label={navbarLink.label}
                                onClick={() => navigate(navbarLink.href)}
                            />
                        )
                    }
                </Tabs>
            </div>
        </div>
    )
}

export default Summary;