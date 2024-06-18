// components
import Content from "@/components/widgets/panel/projects/Content.tsx";
import Header from "@/components/widgets/panel/projects/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const Projects = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(Projects);