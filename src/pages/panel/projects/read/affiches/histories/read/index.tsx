// components
import ReadHistoryModal from "@/components/widgets/panel/projects/read/affiches/histories/ReadHistoryModal.tsx";

// hocs
import RouteGuardHoc from "@/components/hocs/RouteGuardHoc.tsx";

const ProjectAfficheHistory = () => {
    return (
        <>
            <ReadHistoryModal/>
        </>
    )
}

export default RouteGuardHoc(ProjectAfficheHistory);