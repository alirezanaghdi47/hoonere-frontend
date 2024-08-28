// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import Real from "@/components/widgets/panel/profile/identity/Real.tsx";
import Legal from "@/components/widgets/panel/profile/identity/Legal.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Toast from "@/modules/Toast";

// services
import {updateProfileIdentityService} from "@/services/profileService.ts";

// types
import {IUpdateProfileIdentityLegal, IUpdateProfileIdentityReal} from "@/types/serviceType.ts";

// utils
import {updateProfileRealSchema, updateProfileLegalSchema} from "@/utils/validations.ts";

const Identify = ({readMyProfileAction}) => {
    const {currentPart, changeCurrentPart} = usePart(null, readMyProfileAction.data?.data?.user_info?.user_type === "1" ? "real" : "legal");

    const updateProfileIdentityAction = useMutation({
        mutationFn: (data: IUpdateProfileIdentityReal | IUpdateProfileIdentityLegal) => updateProfileIdentityService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                Toast("error", data.message);
            }
        }
    });

    const updateProfileRealForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            profile_img: {},
            national_card: {},
            username: readMyProfileAction.data?.data?.user_info?.username ? readMyProfileAction.data?.data?.user_info.username : "",
            first_name: readMyProfileAction.data?.data?.user_info?.first_name ? readMyProfileAction.data?.data?.user_info.first_name : "",
            last_name: readMyProfileAction.data?.data?.user_info?.last_name ? readMyProfileAction.data?.data?.user_info.last_name : "",
            national_code: readMyProfileAction.data?.data?.user_info?.national_code ? readMyProfileAction.data?.data?.user_info.national_code : "",
            id_code: readMyProfileAction.data?.data?.user_info?.id_code ? readMyProfileAction.data?.data?.user_info.id_code : "",
            birthdate: readMyProfileAction.data?.data?.user_info?.birthdate ? readMyProfileAction.data?.data?.user_info.birthdate : "",
            email: readMyProfileAction.data?.data?.user_info?.email ? readMyProfileAction.data?.data?.user_info.email : "",
            address: readMyProfileAction.data?.data?.user_info?.address ? readMyProfileAction.data?.data?.user_info.address : "",
            postal_code: readMyProfileAction.data?.data?.user_info?.postal_code ? readMyProfileAction.data?.data?.user_info.postal_code : "",
        },
        validationSchema: updateProfileRealSchema,
        onSubmit: async (result) => {
            updateProfileIdentityAction.mutate({
                ...result,
                user_type: "1"
            });
        }
    });

    const updateProfileLegalForm = useFormik({
        initialValues: {
            profile_img: {},
            newspaper_file: {},
            username: readMyProfileAction.data?.data?.user_info?.username ? readMyProfileAction.data?.data?.user_info.username : "",
            company_name: readMyProfileAction.data?.data?.user_info?.company_name ? readMyProfileAction.data?.data?.user_info.company_name : "",
            register_code: readMyProfileAction.data?.data?.user_info?.register_code ? readMyProfileAction.data?.data?.user_info.register_code : "",
            economic_code: readMyProfileAction.data?.data?.user_info?.economic_code ? readMyProfileAction.data?.data?.user_info.economic_code : "",
            address: readMyProfileAction.data?.data?.user_info?.address ? readMyProfileAction.data?.data?.user_info.address : "",
            postal_code: readMyProfileAction.data?.data?.user_info?.postal_code ? readMyProfileAction.data?.data?.user_info.postal_code : "",
            telephone: readMyProfileAction.data?.data?.user_info?.telephone ? readMyProfileAction.data?.data?.user_info.telephone : "",
            email: readMyProfileAction.data?.data?.user_info?.email ? readMyProfileAction.data?.data?.user_info.email : "",
            representatives: readMyProfileAction.data?.data?.user_info?.representatives ? readMyProfileAction.data?.data?.user_info.representatives : []
        },
        validationSchema: updateProfileLegalSchema,
        onSubmit: async (result) => {
            updateProfileIdentityAction.mutate({
                ...result,
                user_type: "2"
            });
        }
    });

    return (
        <>
            {
                currentPart === "real" && (
                    <Real
                        changeCurrentPart={changeCurrentPart}
                        readMyProfileAction={readMyProfileAction}
                        updateProfileRealForm={updateProfileRealForm}
                        updateProfileIdentityAction={updateProfileIdentityAction}
                    />
                )
            }

            {
                currentPart === "legal" && (
                    <Legal
                        changeCurrentPart={changeCurrentPart}
                        readMyProfileAction={readMyProfileAction}
                        updateProfileLegalForm={updateProfileLegalForm}
                        updateProfileIdentityAction={updateProfileIdentityAction}
                    />
                )
            }
        </>
    )
}

export default Identify;