// components
import Content from "@/components/widgets/panel/projects/read/contracts/insertions/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/contracts/insertions/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectContractInsertions = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(ProjectContractInsertions);