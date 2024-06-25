// libraries
import * as Yup from "yup";

export const authSchema = Yup.object().shape({
    mobile: Yup.string().trim().matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/, "فرمت شماره موبایل نادرست است").required("شماره موبایل الزامی است"),
});

export const verifySchema = Yup.object().shape({
    code: Yup.string().trim().min(5, "کد اعتبارسنجی باید 5 کاراکتری باشد").max(5, "کد اعتبارسنجی باید 5 کاراکتری باشد").required("کد اعتبارسنجی الزامی است"),
});

export const registerSchema = Yup.object().shape({
    username: Yup.string().trim().matches(/^[a-zA-Z0-9_.\-@]+$/, "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8, "تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40, "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نامک کاربری الزامی است"),
    password: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    password_confirmation: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "تکرار رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").oneOf([Yup.ref('password'), null], "رمز عبور با تکرار آن یکسان نیست").required("تکرار رمز عبور الزامی است"),
});

export const loginSchema = Yup.object().shape({
    username: Yup.string().trim().matches(/^[a-zA-Z0-9_.\-@]+$/, "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8, "تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40, "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نام کاربری الزامی است"),
    password: Yup.string().trim().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    captcha: Yup.string().trim().required("کد کپچا الزامی است"),
});

export const updateProfileSchema = Yup.object().shape({
    profile_img: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    national_card: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 2 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 2 * 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
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
    address: Yup.string().trim().required("آدرس الزامی است")
});

export const createJobSchema = Yup.object().shape({
    foa_parent_id: Yup.number().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.number().required("عنوان شغلی الزامی است"),
});

export const occupationSchema = Yup.object().shape({
    fields_of_activity: Yup.array().of(Yup.object().shape({
        foa_parent_id: Yup.number(),
        foa_child_id: Yup.number(),
    })).min(1, "حداقل یک زمینه شغلی باید انتخاب شود"),
    resume_file: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    resume_text: Yup.string().trim().required("رزومه متنی الزامی است")
});

export const financialSchema = Yup.object().shape({
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
    card_number: Yup.string().trim().required("شماره کارت الزامی است"),
    card_shaba: Yup.string().trim().required("شماره شبا الزامی است"),
    account_id: Yup.string().trim()
});

export const readUserInquirySchema = Yup.object().shape({
    username: Yup.string().trim().required("نام کاربری الزامی است"),
    foa_parent_id: Yup.number().nullable(),
    foa_id: Yup.number().required("عنوان شغلی الزامی است"),
});

export const createProjectSchema = Yup.object().shape({
    logo: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    type_id: Yup.string().trim().required("نوع پروژه الزامی است"),
    title: Yup.string().trim().required("عنوان پروژه الزامی است"),
    description: Yup.string().trim().required("توضیحات پروژه الزامی است"),
    producer: Yup.string().trim().required("تهیه کننده پروژه الزامی است"),
    count_of_parts: Yup.number().min(1, "حداقل تعداد قسمت پروژه 1 می باشد").required("تعداد قسمت های پروژه الزامی است"),
    time_of_parts: Yup.number().min(1, "حداقل زمان هر قسمت پروژه 1 می باشد").required("مدت زمان هر قسمت پروژه الزامی است"),
    location: Yup.string().trim().required("موقعیت فیلم برداری پروژه الزامی است")
});

export const updateProjectSchema = Yup.object().shape({
    logo: Yup.mixed().nullable().test("fileSize", "حجم عکس حداکثر 1 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
    type_id: Yup.string().trim().required("نوع پروژه الزامی است"),
    title: Yup.string().trim().required("عنوان پروژه الزامی است"),
    description: Yup.string().trim().required("توضیحات پروژه الزامی است"),
    producer: Yup.string().trim().required("تهیه کننده پروژه الزامی است"),
    count_of_parts: Yup.number().min(1, "حداقل تعداد قسمت پروژه 1 می باشد").required("تعداد قسمت های پروژه الزامی است"),
    time_of_parts: Yup.number().min(1, "حداقل زمان هر قسمت پروژه 1 می باشد").required("مدت زمان هر قسمت پروژه الزامی است"),
    location: Yup.string().trim().required("موقعیت فیلم برداری پروژه الزامی است")
});

export const createProjectMemberWithFullNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().required("عنوان شغلی الزامی است"),
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است")
});

export const createProjectMemberWithUserNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().required("عنوان شغلی الزامی است"),
    user_id: Yup.string().trim().required("نام کاربری الزامی است")
});

export const updateProjectMemberWithFullNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().required("عنوان شغلی الزامی است"),
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است")
});

export const updateProjectMemberWithUserNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().required("عنوان شغلی الزامی است"),
    user_id: Yup.string().trim().required("نام کاربری الزامی است")
});

export const createProjectScreenPlaySchema = Yup.object().shape({
    description: Yup.string().trim().required("توضیحات فیلم نامه الزامی است"),
    address: Yup.string().trim().required("موقعیت فیلم نامه الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا فیلم نامه الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان فیلم نامه الزامی است"),
    part: Yup.number().min(1, "قسمت فیلم نامه از 1 باید بیشتر باشد").required("قسمت فیلم نامه الزامی است"),
    sequence: Yup.number().min(1, "سکانس فیلم نامه از 1 باید بیشتر باشد").required("سکانس فیلم نامه الزامی است"),
    fields: Yup.array().of(Yup.object().shape({
        title: Yup.string(),
        value: Yup.string(),
    })),
});

export const createFieldSchema = Yup.object().shape({
    title: Yup.string().required("عنوان الزامی است"),
    value: Yup.string().required("مقدار الزامی است"),
});

export const updateProjectScreenPlaySchema = Yup.object().shape({
    description: Yup.string().trim().required("توضیحات فیلم نامه الزامی است"),
    address: Yup.string().trim().required("موقعیت فیلم نامه الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا فیلم نامه الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان فیلم نامه الزامی است"),
    part: Yup.number().min(1, "قسمت فیلم نامه از 1 باید بیشتر باشد").required("قسمت فیلم نامه الزامی است"),
    sequence: Yup.number().min(1, "سکانس فیلم نامه از 1 باید بیشتر باشد").required("سکانس فیلم نامه الزامی است"),
    fields: Yup.array().of(Yup.object().shape({
        title: Yup.string(),
        value: Yup.string(),
    })),
});
