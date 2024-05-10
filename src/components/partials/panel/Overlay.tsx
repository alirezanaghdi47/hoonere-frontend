// libraries
import {useMediaQuery} from "usehooks-ts";

// stores
import useAppStore from "@/stores/appStore.ts";

const Overlay = () => {
    const {app: {isOpenDrawer}, hideDrawer} = useAppStore();
    const isDesktop = useMediaQuery("(min-width: 992px)");

    return !isDesktop && isOpenDrawer && (
        <div
            style={{zIndex: 109}}
            className="drawer-overlay"
            onClick={hideDrawer}
        />
    )
}

export default Overlay;