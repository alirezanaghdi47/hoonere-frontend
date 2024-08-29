// components
import Content from "@/components/widgets/panel/projects/invited/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const InvitedProjectPage = () => {
    return (
        <Content/>
    )
}

export default WithRouteGuard(InvitedProjectPage);