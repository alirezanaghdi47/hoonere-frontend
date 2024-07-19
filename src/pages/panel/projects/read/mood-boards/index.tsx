// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/mood-boards/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectMoodBoards = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(ProjectMoodBoards);