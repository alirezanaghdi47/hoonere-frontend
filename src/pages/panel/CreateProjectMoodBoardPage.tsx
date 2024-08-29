// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/create/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/mood-boards/create/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const CreateProjectMoodBoardPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(CreateProjectMoodBoardPage);