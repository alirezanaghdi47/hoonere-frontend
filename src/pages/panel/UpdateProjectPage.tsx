// components
import Header from "@/components/widgets/panel/projects/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectPage);