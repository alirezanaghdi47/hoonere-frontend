// components
import Content from "@/components/widgets/panel/projects/read/affiches/histories/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/affiches/histories/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectAfficheHistories = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(ProjectAfficheHistories);