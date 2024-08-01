// libraries
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Chip from "@/modules/Chip.tsx";
import Tabs from "@/modules/Tabs.tsx";

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
                        className="d-flex justify-content-center align-items-center w-150px h-150px bg-secondary rounded-2">
                        {
                            readMyProfileAction.data?.data?.user_info?.profile_img ? (
                                <LazyLoadImage
                                    src={readMyProfileAction.data?.data?.user_info?.profile_img}
                                    width={150}
                                    height={150}
                                    className="w-100 h-100 rounded-2"
                                />
                            ) : (
                                <LuUser
                                    size={30}
                                    color='currentColor'
                                    className="text-gray-600"
                                />
                            )
                        }
                    </div>

                    {
                        readMyProfileAction.data?.data?.user_info?.user_type === "1" && (
                            <div className="d-flex flex-column justify-content-start align-items-start h-100 gap-5">
                                <Typography
                                    variant="h3"
                                    size="lg"
                                    color="dark"
                                    isBold
                                >
                                    {(!readMyProfileAction.data?.data?.user_info?.first_name || !readMyProfileAction.data?.data?.user_info?.last_name) ? readMyProfileAction.data?.data?.user_info?.username : readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name}
                                </Typography>

                                <Chip
                                    label="حقیقی"
                                    color='light-info'
                                    size="lg"
                                />
                            </div>
                        )
                    }

                    {
                        readMyProfileAction.data?.data?.user_info?.user_type === "2" && (
                            <div className="d-flex flex-column justify-content-start align-items-start h-100 gap-5">
                                <Typography
                                    variant="h3"
                                    size="lg"
                                    color="dark"
                                    isBold
                                >
                                    {readMyProfileAction.data?.data?.user_info?.company_name}
                                </Typography>

                                <Chip
                                    label="حقوقی"
                                    color='light-info'
                                    size="lg"
                                />
                            </div>
                        )
                    }
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