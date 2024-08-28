// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/mood-boards/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectMoodBoards = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(ProjectMoodBoards);