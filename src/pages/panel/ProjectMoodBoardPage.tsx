// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/read/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectMoodBoardPage = () => {
    return (
        <Content/>
    )
}

export default WithRouteGuard(ProjectMoodBoardPage);