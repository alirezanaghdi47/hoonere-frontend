// components
import Header from "@/components/widgets/panel/projects/read/contracts/insertions/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/insertions/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectContractInsertionPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectContractInsertionPage);