// libraries
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    userName: Yup.string().matches(/^[a-zA-Z0-9_\.\-\@]+$/ , "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8,"تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40 , "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نامک کاربری الزامی است"),
    password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
});

export const RegisterSchema = Yup.object().shape({
    userName: Yup.string().matches(/^[a-zA-Z0-9_\.\-\@]+$/ , "نام کاربری می تواند ترکیبی از حروف ، اعداد و (-،.،_،@) باشد").min(8,"تعداد کاراکتر های نام کاربری باید بیشتر از 8 باشد").max(40 , "تعداد کاراکتر های نام کاربری باید کمتر از 40 باشد").required("نامک کاربری الزامی است"),
    password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    passwordRepeat: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "تکرار رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").oneOf([Yup.ref('password'), null], "رمز عبور با تکرار آن یکسان نیست").required("تکرار رمز عبور الزامی است"),
});