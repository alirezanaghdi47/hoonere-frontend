// components
import Header from "@/components/widgets/panel/projects/read/members/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/members/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectMember = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectMember);