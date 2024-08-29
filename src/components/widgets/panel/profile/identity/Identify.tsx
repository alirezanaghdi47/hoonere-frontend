// libraries
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import * as Yup from "yup";

// components
import Real from "@/components/widgets/panel/profile/identity/Real.tsx";
import Legal from "@/components/widgets/panel/profile/identity/Legal.tsx";

// hooks
import usePart from "@/hooks/usePart.tsx";

// modules
import Toast from "@/modules/Toast";

// services
import {
    updateProfileIdentityService,
    IUpdateProfileIdentityLegal,
    IUpdateProfileIdentityReal
} from "@/services/profileService.ts";

const updateProfileRealSchema = Yup.object().shape({
    profile_img: Yup.mixed().nullable().test("fileSize", "حجم تصویر حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت تصویر ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    national_card: Yup.mixed().nullable().test("fileSize", "حجم تصویر حداکثر 2 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 2 * 1_024_000;
        }
    }).test("fileType", "فرمت تصویر ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    username: Yup.string().trim().required("نام کاربری الزامی است"),
    first_name: Yup.string().trim().required("نام الزامی است"),
    last_name: Yup.string().trim().required("نام خانوادگی الزامی است"),
    national_code: Yup.string().trim().required("کد ملی الزامی است"),
    id_code: Yup.string().trim().required("شماره شناسنامه الزامی است"),
    birthdate: Yup.string().trim().required("تاریخ تولد الزامی است"),
    email: Yup.string().trim().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "فرمت ایمیل نادرست است").required("ایمیل الزامی است"),
    address: Yup.string().trim().required("آدرس الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
});

const updateProfileLegalSchema = Yup.object().shape({
    profile_img: Yup.mixed().nullable().test("fileSize", "حجم تصویر حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت تصویر ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    newspaper_file: Yup.mixed().nullable().test("fileSize", "حجم تصویر یا فایل حداکثر 2 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 2 * 1_024_000;
        }
    }).test("fileType", "فرمت تصویر یا فایل ارسالی باید از نوع (png , jpg , jpeg) و یا pdf باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].includes(value.type);
        }
    }),
    username: Yup.string().trim().required("نام کاربری الزامی است"),
    company_name: Yup.string().trim().required("نام شرکت الزامی است"),
    register_code: Yup.string().trim().required("شماره ثبت الزامی است"),
    economic_code: Yup.string().trim().required("شناسه ملی الزامی است"),
    address: Yup.string().trim().required("آدرس الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
    telephone: Yup.string().trim().required("شماره تماس الزامی است"),
    email: Yup.string().trim().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "فرمت ایمیل نادرست است").required("ایمیل الزامی است"),
    representatives: Yup.array().of(Yup.object().shape({
        full_name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
        national_code: Yup.string().trim().required("کد ملی الزامی است"),
        post: Yup.string().trim().required("سمت کاری الزامی است"),
    }))
});

const Identify = ({readMyProfileAction}) => {
    const {
        currentPart,
        changeCurrentPart
    } = usePart(null, readMyProfileAction.data?.data?.user_info?.user_type === "1" ? "real" : "legal");

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