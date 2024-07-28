// components
import Content from "@/components/widgets/panel/projects/read/contracts/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/contracts/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectContracts = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectContracts);