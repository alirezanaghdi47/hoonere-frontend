// components
import Header from "@/components/widgets/panel/projects/read/contracts/update/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/update/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const UpdateProjectContract = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(UpdateProjectContract);