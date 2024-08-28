// libraries
import {ReactNode, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LuBell, LuMoon, LuSun, LuUser} from "react-icons/lu";

// components
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import IconButton from "@/modules/IconButton";
import Badge from "@/modules/Badge";
import Popover from "@/modules/Popover";
import Typography from "@/modules/Typography";

// services
import {readAllProjectMoodBoardTypeService} from "@/services/publicService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const ActionBar = ({children}: { children?: ReactNode }) => {
    const location = useLocation();
    const {auth} = useAuthStore();
    const {app: {isDark}, toggleTheme} = useAppStore();

    const readAllProjectAfficheAction = useMutation({
        mutationFn: () => readAllProjectMoodBoardTypeService(),
    });

    useEffect(() => {
        readAllProjectAfficheAction.mutate();
    }, [location.key]);

    return (
        <div className="order-1 order-md-2 col-12 col-md-8 d-flex justify-content-end align-items-center gap-2">
            <Popover
                position="bottom left"
                content={
                    <IconButton textColor="light">
                        <Badge
                            color="light-success"
                            size="sm"
                            placement="top-start"
                            label={1}
                        />

                        <LuBell
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                }
                trigger={["click"]}
            >
                <div className="w-100 min-w-200px p-2">
                    {
                        true ? (
                            <ul className="vstack justify-content-start gap-5 p-0 m-0">
                                <li className="d-flex justify-content-start align-items-center gap-2">
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        پیام 1
                                    </Typography>
                                </li>

                                <li className="d-flex justify-content-start align-items-center gap-2">
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        پیام 2
                                    </Typography>
                                </li>

                                <li className="d-flex justify-content-start align-items-center gap-2">
                                    <Typography
                                        size="xs"
                                        color="dark"
                                    >
                                        پیام 3
                                    </Typography>
                                </li>
                            </ul>
                        ) : (
                            <Empty
                                title="پیامی یافت نشد"
                                width="100%"
                                height={150}
                            />
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