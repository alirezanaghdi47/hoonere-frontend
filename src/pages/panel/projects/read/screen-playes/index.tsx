// components
import Content from "@/components/widgets/panel/projects/read/screen-plays/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/screen-plays/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const ProjectScreenPlays = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(ProjectScreenPlays);