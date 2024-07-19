// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/create/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/mood-boards/create/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectMoodBoard = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectMoodBoard);