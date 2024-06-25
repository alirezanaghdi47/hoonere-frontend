// components
import Header from "@/components/widgets/panel/projects/read/screen-plays/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/screen-plays/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectScreenPlay = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectScreenPlay);