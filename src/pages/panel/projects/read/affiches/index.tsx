// components
import Content from "@/components/widgets/panel/projects/read/affiches/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/affiches/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectAffiches = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectAffiches);