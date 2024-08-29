// components
import Header from "@/components/widgets/panel/projects/read/contracts/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectContractPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectContractPage);