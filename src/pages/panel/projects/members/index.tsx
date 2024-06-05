// components
import Content from "@/components/widgets/panel/projects/members/Content.tsx";
import Header from "@/components/widgets/panel/projects/members/Header.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const ProjectMembers = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectMembers);