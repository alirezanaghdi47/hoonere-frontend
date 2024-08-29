// components
import Header from "@/components/widgets/panel/projects/read/contracts/insertions/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/insertions/create/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const CreateProjectContractInsertionPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(CreateProjectContractInsertionPage);