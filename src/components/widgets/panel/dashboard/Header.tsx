// libraries
import {LuBell, LuMoon, LuSun, LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Badge from "@/modules/Badge.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const Header = () => {
    const {auth} = useAuthStore();
    const {app: {isDark}, toggleTheme} = useAppStore();

    return (
        <div className="d-flex justify-content-center align-items-center w-100 bg-primary">
            <div className="row gy-5 w-100 mw-950px p-5 mb-lg-15">
                <div className="order-2 order-md-1 col-12 col-md-4 d-flex flex-column justify-content-center align-items-start gap-5">
                    <Typography
                        variant="h1"
                        color="white"
                        size="xxl"
                        isBold
                    >
                        داشبورد
                    </Typography>
                </div>

                <div className="order-1 order-md-2 col-12 col-md-8 d-flex justify-content-end align-items-center gap-2">
                    <IconButton color="primary">
                        <Badge
                            color="light-primary"
                            size="sm"
                            placement="top-start"
                            label="2"
                        />

                        <LuBell
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>

                    <IconButton
                        color="primary"
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
                        href={auth.panel_url + "profile"}
                        color="primary"
                    >
                        <LuUser
                            size={20}
                            color="currentColor"
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Header;