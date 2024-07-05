// components
import Header from "@/components/widgets/panel/projects/read/affiches/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/affiches/update/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const UpdateProjectAffiche = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProjectAffiche);