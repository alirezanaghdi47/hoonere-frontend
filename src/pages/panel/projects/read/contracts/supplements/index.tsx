// components
import Content from "@/components/widgets/panel/projects/read/contracts/supplements/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/contracts/supplements/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectContractSupplements = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectContractSupplements);