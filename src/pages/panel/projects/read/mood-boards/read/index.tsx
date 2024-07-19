// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/read/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectMoodBoard = () => {
    return (
        <Content/>
    )
}

export default RouteGuardHoc(ProjectMoodBoard);