// components
import Header from "@/components/widgets/panel/projects/read/affiches/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/affiches/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectAffichePage = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectAffichePage);