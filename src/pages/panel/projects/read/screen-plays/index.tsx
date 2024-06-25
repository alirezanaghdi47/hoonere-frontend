// components
import Content from "@/components/widgets/panel/projects/read/screen-plays/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/screen-plays/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectScreenPlays = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectScreenPlays);