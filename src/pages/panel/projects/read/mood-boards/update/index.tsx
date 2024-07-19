// components
import Content from "@/components/widgets/panel/projects/read/mood-boards/update/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/mood-boards/update/Header.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const UpdateProjectMoodBoard = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProjectMoodBoard);