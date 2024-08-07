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

export const updateProfileRealSchema = Yup.object().shape({
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
    address: Yup.string().trim().required("آدرس الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
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

export const updateProfileLegalSchema = Yup.object().shape({
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
    newspaper_file: Yup.mixed().nullable().test("fileSize", "حجم عکس یا فایل حداکثر 2 مگابایت باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return value.size <= 2 * 1_024_000;
        }
    }).test("fileType", "فرمت عکس یا فایل ارسالی باید از نوع (png , jpg , jpeg) و یا pdf باشد", (value: File) => {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg' , 'application/pdf'].includes(value.type);
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

export const createRepresentativeSchema = Yup.object().shape({
    full_name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
    national_code: Yup.string().trim().required("کد ملی الزامی است"),
    post: Yup.string().trim().required("سمت کاری الزامی است"),
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
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است")
});

export const createProjectMemberWithUserNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
    user_id: Yup.string().trim().required("نام کاربری الزامی است")
});

export const updateProjectMemberWithFullNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
    name: Yup.string().trim().required("نام و نام خانوادگی الزامی است")
});

export const updateProjectMemberWithUserNameSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
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
        title: Yup.string().trim(),
        value: Yup.string().trim(),
    })),
});

export const createFieldSchema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان الزامی است"),
    value: Yup.string().trim().required("مقدار الزامی است"),
});

export const updateProjectScreenPlaySchema = Yup.object().shape({
    description: Yup.string().trim().required("توضیحات فیلم نامه الزامی است"),
    address: Yup.string().trim().required("موقعیت فیلم نامه الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا فیلم نامه الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان فیلم نامه الزامی است"),
    part: Yup.number().min(1, "قسمت فیلم نامه از 1 باید بیشتر باشد").required("قسمت فیلم نامه الزامی است"),
    sequence: Yup.number().min(1, "سکانس فیلم نامه از 1 باید بیشتر باشد").required("سکانس فیلم نامه الزامی است"),
    fields: Yup.array().of(Yup.object().shape({
        title: Yup.string().trim(),
        value: Yup.string().trim(),
    })),
});

export const createProjectAfficheP1Schema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان آفیش الزامی است"),
    description: Yup.string().trim().required("توضیحات آفیش الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا آفیش الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان آفیش الزامی است"),
    is_off: Yup.number(),
    type: Yup.string().trim().required("نوع فنی آفیش الزامی است"),
    affiche_date: Yup.string().trim().required("تاریخ آفیش الزامی است"),
    start_date: Yup.string().trim().required("تاریخ اجرای آفیش الزامی است"),
    coming_time: Yup.string().trim().required("ساعت حضور آفیش الزامی است"),
    start_time: Yup.string().trim().required("ساعت کلید آفیش الزامی است"),
    addresses: Yup.array().of(Yup.object().shape({
        address: Yup.string().trim(),
        lat: Yup.number(),
        lon: Yup.number(),
    })).min(1, "آدرس آفیش الزامی است"),
    auto_motivation_sentence: Yup.number(),
    motivation_sentence: Yup.string().when("auto_motivation_sentence", {
        is: (value) => value === 0,
        then: (schema) => schema.trim().required("جمله انگیزشی آفیش الزامی است")
    }),
});

export const createProjectAfficheP2Schema = Yup.object().shape({
    actors: Yup.array().of(Yup.object().shape({
        actor_id: Yup.string().trim().required("بازیگر الزامی است"),
        full_name: Yup.string(),
        role: Yup.string().trim().required("نقش بازیگر الزامی است"),
        coming_time: Yup.string().trim().required("ساعت حضور بازیگر الزامی است"),
        makeup_time: Yup.string().trim().required("ساعت گریم بازیگر الزامی است"),
    })),
    members: Yup.array().of(Yup.object().shape({
        member_id: Yup.string().trim().required("عوامل الزامی است"),
        full_name: Yup.string(),
        coming_time: Yup.string().trim().required("ساعت حضور عوامل الزامی است"),
        description: Yup.string().trim(),
    })),
    receptions: Yup.array().of(Yup.object().shape({
        member_id: Yup.string().trim().required("عوامل پذیرایی الزامی است"),
        full_name: Yup.string().trim(),
        reception_type: Yup.string().trim().required("نوع پذیرایی الزامی است"),
    })),
});

export const createProjectAfficheP3Schema = Yup.object().shape({
    screenplays: Yup.array().of(Yup.string().trim())
});

export const createAddressSchema = Yup.object().shape({
    address: Yup.string().trim().required("آدرس آفیش الزامی است"),
    lat: Yup.number(),
    lon: Yup.number(),
});

export const createProjectAfficheUserSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_id: Yup.string().trim(),
});

export const createProjectAfficheActorSchema = Yup.object().shape({
    actor_id: Yup.string().trim().required("بازیگر الزامی است"),
    role: Yup.string().trim().required("نقش بازیگر الزامی است"),
    coming_time: Yup.string().trim().required("ساعت حضور بازیگر الزامی است"),
    makeup_time: Yup.string().trim().required("ساعت گریم بازیگر الزامی است"),
});

export const createProjectAfficheMemberSchema = Yup.object().shape({
    member_id: Yup.string().trim().required("عوامل الزامی است"),
    coming_time: Yup.string().trim().required("ساعت حضور عوامل الزامی است"),
    description: Yup.string().trim(),
});

export const createProjectAfficheReceptionSchema = Yup.object().shape({
    member_id: Yup.string().trim().required("عوامل پذیرایی الزامی است"),
    reception_type: Yup.string().trim().required("نوع پذیرایی الزامی است"),
});

export const updateProjectAfficheP1Schema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان آفیش الزامی است"),
    description: Yup.string().trim().required("توضیحات آفیش الزامی است"),
    time_type_id: Yup.string().trim().required("زمان اجرا آفیش الزامی است"),
    location_side_id: Yup.string().trim().required("سمت مکان آفیش الزامی است"),
    is_off: Yup.number(),
    type: Yup.string().trim().required("نوع فنی آفیش الزامی است"),
    affiche_date: Yup.string().trim().required("تاریخ آفیش الزامی است"),
    start_date: Yup.string().trim().required("تاریخ اجرای آفیش الزامی است"),
    coming_time: Yup.string().trim().required("ساعت حضور آفیش الزامی است"),
    start_time: Yup.string().trim().required("ساعت کلید آفیش الزامی است"),
    addresses: Yup.array().of(Yup.object().shape({
        address: Yup.string().trim(),
        lat: Yup.number(),
        lon: Yup.number(),
    })).min(1, "آدرس آفیش الزامی است"),
    auto_motivation_sentence: Yup.number(),
    motivation_sentence: Yup.string().when("auto_motivation_sentence", {
        is: (value) => value === 0,
        then: (schema) => schema.trim().required("جمله انگیزشی آفیش الزامی است")
    }),
});

export const updateProjectAfficheP2Schema = Yup.object().shape({
    actors: Yup.array().of(Yup.object().shape({
        actor_id: Yup.string().trim().required("بازیگر الزامی است"),
        full_name: Yup.string(),
        role: Yup.string().trim().required("نقش بازیگر الزامی است"),
        coming_time: Yup.string().trim().required("ساعت حضور بازیگر الزامی است"),
        makeup_time: Yup.string().trim().required("ساعت گریم بازیگر الزامی است"),
    })),
    members: Yup.array().of(Yup.object().shape({
        member_id: Yup.string().trim().required("عوامل الزامی است"),
        full_name: Yup.string(),
        coming_time: Yup.string().trim().required("ساعت حضور عوامل الزامی است"),
        description: Yup.string().trim(),
    })),
    receptions: Yup.array().of(Yup.object().shape({
        member_id: Yup.string().trim().required("عوامل پذیرایی الزامی است"),
        full_name: Yup.string().trim(),
        reception_type: Yup.string().trim().required("نوع پذیرایی الزامی است"),
    })),
});

export const updateProjectAfficheP3Schema = Yup.object().shape({
    screenplays: Yup.array().of(Yup.string().trim())
});

export const createProjectMoodBoardSchema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان مود بورد الزامی است"),
    type: Yup.string().trim().required("نوع مود بورد الزامی است"),
    image: Yup.mixed().when('type', {
        is: (value) => value === "image",
        then: (schema) => schema.test("fileExist", "محتوای مود بورد الزامی است", (value: File) => {
            return Object.keys(value).length !== 0;
        }).test("fileSize", "حجم عکس ارسالی حداکثر 1 مگابایت باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return value.size <= 1 * 1_024_000;
            }
        }).test("fileType", "فرمت عکس ارسالی باید از نوع (png , jpg , jpeg) باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
            }
        }).required("محتوای مود بورد الزامی است"),
    }),
    audio: Yup.mixed().when('type', {
        is: (value) => value === "audio",
        then: (schema) => schema.test("fileExist", "محتوای مود بورد الزامی است", (value: File) => {
            return Object.keys(value).length !== 0;
        }).test("fileSize", "حجم صدای ارسالی حداکثر 5 مگابایت باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return value.size <= 5 * 1_024_000;
            }
        }).test("fileType", "فرمت صدای ارسالی باید از نوع (mp3 , wav , ogg) باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return ['audio/mp3', 'audio/wav', 'audio/ogg'].includes(value.type);
            }
        }),
    }),
    video: Yup.string().when("type", {
        is: (value) => value === "video",
        then: (schema) => schema.trim().required("محتوای مود بورد الزامی است")
    }),
    text: Yup.string().when("type", {
        is: (value) => value === "text",
        then: (schema) => schema.trim().required("محتوای مود بورد الزامی است")
    }),
});

export const updateProjectMoodBoardSchema = Yup.object().shape({
    title: Yup.string().trim().required("عنوان مود بورد الزامی است"),
    type: Yup.string().trim().required("نوع مود بورد الزامی است"),
    image: Yup.mixed().when('type', {
        is: (value) => value === "image",
        then: (schema) => schema.test("fileExist", "محتوای مود بورد الزامی است", (value: File) => {
            return Object.keys(value).length !== 0;
        }).test("fileSize", "حجم عکس ارسالی حداکثر 2 مگابایت باشد", (value: File) => {
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
        }).required("محتوای مود بورد الزامی است"),
    }),
    audio: Yup.mixed().when('type', {
        is: (value) => value === "audio",
        then: (schema) => schema.test("fileExist", "محتوای مود بورد الزامی است", (value: File) => {
            return Object.keys(value).length !== 0;
        }).test("fileSize", "حجم صدای ارسالی حداکثر 5 مگابایت باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return value.size <= 2 * 1_024_000;
            }
        }).test("fileType", "فرمت صدای ارسالی باید از نوع (mpeg , wav , ogg) باشد", (value: File) => {
            if (Object.keys(value).length === 0) {
                return true;
            } else {
                return ['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(value.type);
            }
        }),
    }),
    video: Yup.string().when("type", {
        is: (value) => value === "video",
        then: (schema) => schema.trim().required("محتوای مود بورد الزامی است")
    }),
    text: Yup.string().when("type", {
        is: (value) => value === "text",
        then: (schema) => schema.trim().required("محتوای مود بورد الزامی است")
    }),
});

export const createArticleSchema = Yup.object().shape({
    article: Yup.string().trim().required("ماده الزامی است"),
});

export const createSectionSchema = Yup.object().shape({
    section: Yup.string().trim().required("بند الزامی است"),
});

export const createNoteSchema = Yup.object().shape({
    note: Yup.string().trim().required("تبصره الزامی است"),
});

export const createPartiesSchema = Yup.object().shape({
    foa_parent_id: Yup.string().trim().required("گروه شغلی الزامی است"),
    foa_child_id: Yup.string().trim().required("عنوان شغلی الزامی است"),
    user_info: Yup.object().test('has-one-key', 'کاربر الزامی است', value => value && Object.keys(value).length > 0)
});

export const createPaymentSchema = Yup.object().shape({
    percent: Yup.number().min(1 , "مقدار درصد نادرست است").max(100 , "مقدار درصد نادرست است").required("درصد الزامی است"),
    date: Yup.string().trim().required("تاریخ الزامی است"),
});

export const createProjectContractSchema = Yup.object().shape({
    articles: Yup.array(),
    sections: Yup.array(),
    notes: Yup.array(),
});

export const updateProjectContractSchema = Yup.object().shape({
    articles: Yup.array(),
    sections: Yup.array(),
    notes: Yup.array(),
});

export const createUnOfficialRealPartiesSchema = Yup.object().shape({
    first_name: Yup.string().trim().required("نام الزامی است"),
    last_name: Yup.string().trim().required("نام خانوادگی الزامی است"),
    national_code: Yup.string().trim().required("کد ملی الزامی است"),
    mobile: Yup.string().trim().matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/, "فرمت شماره موبایل نادرست است").required("شماره موبایل الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
    address: Yup.string().trim().required("آدرس الزامی است"),
});

export const createUnOfficialLegalPartiesSchema = Yup.object().shape({
    company_name: Yup.string().trim().required("نام شرکت الزامی است"),
    register_code: Yup.string().trim().required("شماره ثبت الزامی است"),
    economic_code: Yup.string().trim().required("شناسه ملی الزامی است"),
    address: Yup.string().trim().required("آدرس الزامی است"),
    postal_code: Yup.string().trim().required("کد پستی الزامی است"),
    telephone: Yup.string().trim().required("شماره تماس الزامی است"),
    representatives: Yup.array().of(Yup.object().shape({
        full_name: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
        national_code: Yup.string().trim().required("کد ملی الزامی است"),
        post: Yup.string().trim().required("سمت کاری الزامی است"),
    }))
});


