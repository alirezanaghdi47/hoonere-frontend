// components
import Header from "@/components/widgets/panel/projects/read/contracts/supplements/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/supplements/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectContractSupplement = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectContractSupplement);