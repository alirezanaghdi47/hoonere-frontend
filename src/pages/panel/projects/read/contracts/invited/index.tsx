// components
import Content from "@/components/widgets/panel/projects/read/contracts/invited/Content.tsx";

// hocs
import WithRouteGuard from "@/hocs/WithRouteGuard.tsx";

const InvitedProjectContract = () => {
    return (
        <Content/>
    )
}

export default WithRouteGuard(InvitedProjectContract);