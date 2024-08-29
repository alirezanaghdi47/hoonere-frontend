// components
import Header from "@/components/widgets/panel/dashboard/Header.tsx";
import Content from "@/components/widgets/panel/dashboard/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const DashboardPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(DashboardPage);