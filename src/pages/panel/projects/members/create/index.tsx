// components
import Header from "@/components/widgets/panel/projects/members/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/members/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectMember = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectMember);