// components
import Header from "@/components/widgets/panel/projects/members/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/members/update/Content.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const UpdateProjectMember = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProjectMember);