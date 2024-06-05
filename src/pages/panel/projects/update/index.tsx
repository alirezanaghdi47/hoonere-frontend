// components
import Header from "@/components/widgets/panel/projects/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/update/Content.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const UpdateProject = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProject);