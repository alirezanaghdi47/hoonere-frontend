// components
import Content from "@/components/widgets/panel/projects/read/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const Project = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(Project);