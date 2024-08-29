// components
import Content from "@/components/widgets/panel/projects/read/members/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/members/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectMembers = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(ProjectMembers);