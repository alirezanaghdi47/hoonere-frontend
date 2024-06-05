// components
import Header from "@/components/widgets/panel/projects/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/hocs/RouteGuardHoc.tsx";

const CreateProject = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProject);