// components
import Header from "@/components/widgets/panel/projects/read/members/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/members/update/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const UpdateProjectMember = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProjectMember);