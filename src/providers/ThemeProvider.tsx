// libraries
import {useLayoutEffect} from "react";

// stores
import useAppStore from "@/stores/appStore.ts";

const ThemeProvider = ({children}) => {
    const {app: {isDark}} = useAppStore();

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
    }, [isDark]);

    return children;
}

export default ThemeProvider;