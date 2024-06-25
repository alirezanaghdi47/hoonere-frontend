// components
import Content from "@/components/widgets/panel/projects/read/members/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/members/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectMembers = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectMembers);