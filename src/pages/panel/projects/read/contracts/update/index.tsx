// components
import Header from "@/components/widgets/panel/projects/read/contracts/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectContract = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectContract);