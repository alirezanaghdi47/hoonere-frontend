// components
import Header from "@/components/widgets/panel/projects/read/screen-plays/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/screen-plays/create/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const CreateProjectScreenPlay = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default WithRouteGuard(CreateProjectScreenPlay);