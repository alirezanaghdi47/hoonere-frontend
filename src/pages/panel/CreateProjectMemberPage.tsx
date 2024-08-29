// components
import Header from "@/components/widgets/panel/projects/read/members/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/members/create/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const CreateProjectMemberPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(CreateProjectMemberPage);