// components
import Header from "@/components/widgets/panel/dashboard/Header.tsx";
import Content from "@/components/widgets/panel/dashboard/Content.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const Dashboard = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(Dashboard);