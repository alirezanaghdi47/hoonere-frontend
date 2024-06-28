// components
import Header from "@/components/widgets/panel/projects/read/affiches/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/affiches/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectAffiche = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectAffiche);