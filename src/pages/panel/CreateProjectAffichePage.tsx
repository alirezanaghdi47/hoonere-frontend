// components
import Header from "@/components/widgets/panel/projects/read/affiches/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/affiches/create/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const CreateProjectAffichePage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(CreateProjectAffichePage);