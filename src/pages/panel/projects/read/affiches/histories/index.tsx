// components
import Content from "@/components/widgets/panel/projects/read/affiches/histories/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/affiches/histories/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectAfficheHistories = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectAfficheHistories);