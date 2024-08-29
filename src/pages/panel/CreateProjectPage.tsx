// components
import Header from "@/components/widgets/panel/projects/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/create/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const CreateProjectPage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(CreateProjectPage);