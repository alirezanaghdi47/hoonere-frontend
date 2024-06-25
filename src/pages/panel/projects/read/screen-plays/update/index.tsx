// components
import Header from "@/components/widgets/panel/projects/read/screen-plays/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/screen-plays/update/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const UpdateProjectScreenPlay = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProjectScreenPlay);