// components
import Header from "@/components/widgets/panel/projects/read/contracts/insertions/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/insertions/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectContractInsertion = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectContractInsertion);