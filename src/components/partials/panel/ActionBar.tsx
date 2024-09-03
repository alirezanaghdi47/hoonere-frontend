// libraries
import {ReactNode, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useMediaQuery} from "usehooks-ts";
import {format} from "date-fns-jalali";
import {LuBell, LuMoon, LuSun, LuUser} from "react-icons/lu";

// components
import Empty from "@/components/partials/panel/Empty.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// modules
import IconButton from "@/modules/IconButton";
import Badge from "@/modules/Badge";
import Popover from "@/modules/Popover";
import Typography from "@/modules/Typography";

// services
import {readAllNotificationService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const ActionBar = ({children}: { children?: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();
    const {app: {isDark}, toggleTheme, setNotifications} = useAppStore();
    const isMobile = useMediaQuery("(max-width: 576px)")

    const generateNotificationLink = (notification) => {
        switch (notification.type) {
            case "project":
                return `/panel/projects#is_invited=${notification.sub_type === "invited" ? "1" : "0"}`;
            case "affiche":
                return `/panel/projects/${notification.project_id}/affiches#is_invited=${notification.sub_type === "invited" ? "1" : "0"}`;
            case "contract":
                return `/panel/projects/${notification.project_id}/contracts#is_invited=${notification.sub_type === "invited" ? "1" : "0"}`;
            case "contract_comment":
                return `/panel/projects/${notification.project_id}/contracts#is_invited=${notification.sub_type === "invited" ? "1" : "0"}`;
            default:
                return null;
        }
    }

    const readAllNotificationAction = useMutation({
        mutationFn: () => readAllNotificationService(),
        onSuccess: async (data) => {
            if (!data.error) {
                const notifications = data?.data?.notifications;
                const tempCounter = {};

                for (let i = 0; i <= notifications.length; i++) {
                    if (Object.keys(tempCounter).includes(notifications[i].type)) {
                        if (Object.keys(tempCounter[notifications[i]]).includes(notifications[i].sub_type)) {
                            tempCounter[notifications[i].type][notifications[i].sub_type] += 1;
                        } else {
                            tempCounter[notifications[i].type][notifications[i].sub_type] = 0;
                        }
                    }
                }

                console.log(data?.data?.notifications)
                console.log(tempCounter)
            }
        }
    });

    useEffect(() => {
        readAllNotificationAction.mutate();
    }, [location.key, location.hash]);

    return (
        <div className="order-1 order-md-2 col-12 col-md-8 d-flex justify-content-end align-items-center gap-2">
            <Popover
                position={isMobile ? "bottom right" : "bottom left"}
                content={
                    <IconButton textColor="light">
                        {
                            !readAllNotificationAction.isPending && readAllNotificationAction.data?.data?.notifications.length > 0 && (
                                <Badge
                                    color="light-success"
                                    size="sm"
                                    placement="top-start"
                                    label={readAllNotificationAction.data?.data?.notifications.length > 9 ? "9+" : readAllNotificationAction.data?.data?.notifications.length}
                                />
                            )
                        }

                        <LuBell
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                }
                trigger={["focus"]}
            >
                <div className="w-100 min-w-200px p-2">
                    {
                        readAllNotificationAction.isPending && (
                            <Loading
                                width="100%"
                                height={200}
                            />
                        )
                    }

                    {
                        !readAllNotificationAction.isPending && readAllNotificationAction.data?.data?.notifications.length > 0 && (
                            <ul className="vstack justify-content-start gap-2 w-100 h-200px p-0 m-0 overflow-y-auto">
                                {
                                    readAllNotificationAction.data?.data?.notifications.map(notification =>
                                        <li
                                            key={notification.id}
                                            className="d-flex flex-column justify-content-center align-items-start gap-2 w-100 p-2 cursor-pointer"
                                            onClick={() => navigate(generateNotificationLink(notification))}
                                        >
                                            <Typography
                                                size="xxs"
                                                color="info"
                                                isBold
                                            >
                                                {notification?.message}
                                            </Typography>

                                            <Typography
                                                size="xxs"
                                                color="dark"
                                            >
                                                {format(notification?.created_at, "HH:mm | yyyy-MM-dd")}
                                            </Typography>
                                        </li>
                                    )
                                }
                            </ul>
                        )
                    }

                    {
                        !readAllNotificationAction.isPending && readAllNotificationAction.data?.data?.notifications.length === 0 && (
                            (
                                <Empty
                                    title="پیامی یافت نشد"
                                    width="100%"
                                    height={200}
                                />
                            )
                        )
                    }
                </div>
            </Popover>

            <IconButton
                textColor="light"
                onClick={toggleTheme}
            >
                {
                    isDark ? (
                        <LuSun
                            size={20}
                            color="currentColor"
                        />
                    ) : (
                        <LuMoon
                            size={20}
                            color="currentColor"
                        />
                    )
                }
            </IconButton>

            <IconButton
                textColor="light"
                href={auth.panel_url + "profile"}
            >
                <LuUser
                    size={20}
                    color="currentColor"
                />
            </IconButton>

            {children}
        </div>
    )
}

export default ActionBar;