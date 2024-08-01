// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";

// components
import Real from "@/components/widgets/panel/profile/identity/Real.tsx";
import Legal from "@/components/widgets/panel/profile/identity/Legal.tsx";

// helpers
import toast from "@/helpers/toast.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// services
import {updateProfileIdentityService} from "@/services/profileService.ts";

// types
import {IUpdateProfileIdentity} from "@/types/serviceType.ts";

// utils
import {updateProfileRealSchema, updateProfileLegalSchema} from "@/utils/validations.ts";

const Identify = ({readMyProfileAction}) => {
    const {currentPart, resetPart, changeCurrentPart} = usePart(null, "real");

    const updateProfileIdentityAction = useMutation({
        mutationFn: (data: IUpdateProfileIdentity) => updateProfileIdentityService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readMyProfileAction.mutate();
            } else {
                toast("error", data.message);
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
            profile_image: {},
            newspaper_file: {},
            company_name: "",
            register_code: "",
            economic_code: "",
            address: "",
            postal_code: "",
            telephone: "",
            email: "",
            representatives: []
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