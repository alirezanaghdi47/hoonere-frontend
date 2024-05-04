// libraries
import * as Yup from "yup";

export const registerAuthenticationSchema = Yup.object().shape({
    mobile: Yup.string().trim().matches(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/, "فرمت شماره موبایل نادرست است").required("شماره موبایل الزامی است"),
});

export const registerVerifyCodeSchema = Yup.object().shape({
    code: Yup.string().trim().min(5, "کد اعتبارسنجی باید 5 کاراکتری باشد").max(5, "کد اعتبارسنجی باید 5 کاراکتری باشد").required("کد اعتبارسنجی الزامی است"),
});

export const registerCreateAccountSchema = Yup.object().shape({
    username: Yup.string().trim().matches(/^[a-zA-Z0-9_\.\-\@]+$/, "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8, "تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40, "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نامک کاربری الزامی است"),
    password: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    password_confirmation: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "تکرار رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").oneOf([Yup.ref('password'), null], "رمز عبور با تکرار آن یکسان نیست").required("تکرار رمز عبور الزامی است"),
});

export const loginWithAccountSchema = Yup.object().shape({
    username: Yup.string().trim().matches(/^[a-zA-Z0-9_\.\-\@]+$/, "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8, "تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40, "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نام کاربری الزامی است"),
    password: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    captcha: Yup.string().trim().required("کد کپچا الزامی است"),
});

export const profileIdentitySchema = Yup.object().shape({
    profile_img: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 1 مگابایت باشد", (value: any) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: any) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    national_card: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 2 مگابایت باشد", (value: any) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 2 * 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: any) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    first_name: Yup.string().trim(),
    last_name: Yup.string().trim(),
    id_code: Yup.string().trim(),
    national_code: Yup.string().trim(),
    birthdate: Yup.string().trim(),
    email: Yup.string().trim().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "فرمت ایمیل نادرست است"),
    address: Yup.string().trim()
});

export const profileOccupationSchema = Yup.object().shape({
    foa_parent_id: Yup.number().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.number().required("عنوان شغلی الزامی است"),
});

export const profileOccupation2Schema = Yup.object().shape({
    fields_of_activity: Yup.array().of(Yup.object().shape({
        foa_parent_id: Yup.number().required(),
        foa_child_id: Yup.number().required(),
    })).min(1, "حداقل یک زمینه شغلی باید انتخاب شود"),
    resume_file: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 1 مگابایت باشد", (value: any) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: any) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    resume_text: Yup.string().trim()
});

export const profileFinancialSchema = Yup.object().shape({
    card_number: Yup.string().trim().required("شماره کارت الزامی است"),
    card_shaba: Yup.string().trim().required("شماره شبا الزامی است"),
    account_id: Yup.string().trim().required("شماره حساب الزامی است")
});