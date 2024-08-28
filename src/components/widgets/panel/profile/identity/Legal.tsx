//components
import CreateRepresentativeFormData from "@/components/widgets/panel/profile/identity/CreateRepresentativeFormData.tsx";
import LegalFormData from "@/components/widgets/panel/profile/identity/LegalFormData.tsx";
import Representatives from "@/components/widgets/panel/profile/identity/Representatives.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

const Legal = ({changeCurrentPart, readMyProfileAction, updateProfileLegalForm, updateProfileIdentityAction}) => {
    const {currentPart, resetPart, changeCurrentPart: changeCurrentPart2} = usePart(null, "read");

    return (
        <>
            <LegalFormData
                readMyProfileAction={readMyProfileAction}
                changeCurrentPart={changeCurrentPart}
                updateProfileLegalForm={updateProfileLegalForm}
            />

            {
                currentPart === "read" && (
                    <Representatives
                        updateProfileLegalForm={updateProfileLegalForm}
                        updateProfileIdentityAction={updateProfileIdentityAction}
                        changeCurrentPart={changeCurrentPart2}
                    />
                )
            }

            {
                currentPart === "create" && (
                    <CreateRepresentativeFormData
                        updateProfileLegalForm={updateProfileLegalForm}
                        resetPart={resetPart}
                    />
                )
            }
        </>
    )
}

export default Legal;