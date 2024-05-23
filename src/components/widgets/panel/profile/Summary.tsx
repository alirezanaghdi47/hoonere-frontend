// libraries
import {useLocation, useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Tabs from "@/modules/Tabs.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const navbarLinks = [
    {id: 1, label: "بررسی اجمالی", href: useAuthStore.getState().auth.panel_url + "profile#review", value: "#review"},
    {id: 2, label: "هویتی", href: useAuthStore.getState().auth.panel_url + "profile#identify", value: "#identify"},
    {id: 3, label: "شغلی", href: useAuthStore.getState().auth.panel_url + "profile#occupation", value: "#occupation"},
    {id: 4, label: "مالی", href: useAuthStore.getState().auth.panel_url + "profile#financial", value: "#financial"},
];

const Summary = ({readMyProfileAction}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="card w-100">
            <div className="card-body pb-0">
                <div
                    className="d-flex flex-column flex-sm-row justify-content-start align-items-start gap-5 w-100 h-100 mb-5">
                    <div
                        className="d-flex justify-content-center align-items-center w-150px h-150px bg-secondary rounded-2">
                        {
                            readMyProfileAction.data?.data?.userInfo?.profile_img ? (
                                <LazyLoadImage
                                    src={readMyProfileAction?.data?.data?.userInfo?.profile_img}
                                    alt="avatar"
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

                    <div className="d-flex flex-column justify-content-start align-items-start h-100 gap-5">
                        <Typography
                            variant="h3"
                            size="lg"
                            color="dark"
                            isBold
                        >
                            {
                                (!readMyProfileAction.data?.data?.userInfo?.first_name || !readMyProfileAction.data?.data?.userInfo?.last_name) ? (
                                    readMyProfileAction.data?.data?.userInfo?.username
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.first_name + " " + readMyProfileAction.data?.data?.userInfo?.last_name
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="d-flex justify-content-start align-items-start gap-5 w-100">
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
        </div>
    )
}

export default Summary;