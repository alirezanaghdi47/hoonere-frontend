// components
import Content from "@/components/widgets/panel/projects/read/Content.tsx";
import Header from "@/components/widgets/panel/projects/read/Header.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const Project = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(Project);