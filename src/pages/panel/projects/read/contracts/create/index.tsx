// components
import Header from "@/components/widgets/panel/projects/read/contracts/create/Header.tsx";
import Content from "@/components/widgets/panel/projects/read/contracts/create/Content.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const CreateProjectContract = () => {
    return (
        <>
            <Header/>
            <Content/>
        </>
    )
}

export default RouteGuardHoc(CreateProjectContract);