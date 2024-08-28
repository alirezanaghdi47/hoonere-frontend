// components
import Header from "@/components/widgets/panel/dashboard/Header.tsx";
import Content from "@/components/widgets/panel/dashboard/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const Dashboard = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(Dashboard);