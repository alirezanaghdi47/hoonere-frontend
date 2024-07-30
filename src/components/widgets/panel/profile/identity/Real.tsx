// components
import RealFormData from "@/components/widgets/panel/profile/identity/RealFormData.tsx";

const Real = ({changeCurrentPart, readMyProfileAction, updateProfileRealForm, updateProfileIdentityAction}) => {
    return (
        <>
            <RealFormData
                changeCurrentPart={changeCurrentPart}
                readMyProfileAction={readMyProfileAction}
                updateProfileRealForm={updateProfileRealForm}
                updateProfileIdentityAction={updateProfileIdentityAction}
            />
        </>
    )
}

export default Real;