// components
import Content from "@/components/widgets/panel/projects/read/affiches/invited/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const InvitedProjectAffichePage = () => {
    return (
        <Content/>
    )
}

export default WithRouteGuard(InvitedProjectAffichePage);