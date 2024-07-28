// libraries
import {useMutation} from "@tanstack/react-query";
import Loadable from "@loadable/component";
import {useFormik} from "formik";

//components
const CreateRepresentativeFormData = Loadable(() => import("@/components/widgets/panel/profile/legal/CreateRepresentativeFormData.tsx"));

import CivilFormData from "@/components/widgets/panel/profile/legal/CivilFormData.tsx";
import Representatives from "@/components/widgets/panel/profile/legal/representatives.tsx";
import Forbidden from "@/components/partials/panel/Forbidden.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// services
import {updateProfileLegalService} from "@/services/profileService.ts";

// types
import {IUpdateProfileLegal} from "@/types/serviceType.ts";

// utils
import {updateProfileLegalSchema} from "@/utils/validations.ts";

const Legal = ({readMyProfileAction}) => {
    const {currentPart, resetPart, changeCurrentPart} = usePart(null, "read");

    const updateProfileLegalAction = useMutation({
        mutationFn: (data: IUpdateProfileLegal) => updateProfileLegalService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                toast("error", data.message);
            }
        }
    });

    const updateProfileLegalForm = useFormik({
        initialValues: {
            logo: {},
            file: {},
            company_name: "",
            registration_number: "",
            economic_code: "",
            address: "",
            postal_code: "",
            tel: "",
            representative: []
        },
        validationSchema: updateProfileLegalSchema,
        onSubmit: async (result) => {
            updateProfileLegalAction.mutate(result);
        }
    });

    return true ? (
        <>
            <CivilFormData updateProfileLegalForm={updateProfileLegalForm}/>

            {
                currentPart === "read" && (
                    <Representatives
                        updateProfileLegalForm={updateProfileLegalForm}
                        updateProfileLegalAction={updateProfileLegalAction}
                        changeCurrentPart={changeCurrentPart}
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
    ) : (
        <Forbidden
            withCard
            title="شما به بخش حقوقی دسترسی ندارید"
            width="100%"
            height={400}
        />
    )
}

export default Legal;