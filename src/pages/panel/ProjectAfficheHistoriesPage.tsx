// components
import Content from "@/components/widgets/panel/projects/read/affiches/histories/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/affiches/histories/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectAfficheHistoriesPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(ProjectAfficheHistoriesPage);