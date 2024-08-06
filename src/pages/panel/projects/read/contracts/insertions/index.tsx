// components
import Content from "@/components/widgets/panel/projects/read/contracts/insertions/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/contracts/insertions/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectContractInsertions = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectContractInsertions);