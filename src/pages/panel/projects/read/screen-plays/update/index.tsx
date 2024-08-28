// components
import Header from "@/components/widgets/panel/projects/read/screen-plays/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/screen-plays/update/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const UpdateProjectScreenPlay = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(UpdateProjectScreenPlay);