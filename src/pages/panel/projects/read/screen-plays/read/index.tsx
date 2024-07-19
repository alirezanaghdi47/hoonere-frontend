// components
import Content from "@/components/widgets/panel/projects/read/screen-plays/read/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectScreenPlay = () => {
    return (
        <Content/>
    )
}

export default RouteGuardHoc(ProjectScreenPlay);