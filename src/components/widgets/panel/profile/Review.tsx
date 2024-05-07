// libraries
import {LuAlertTriangle} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Alert from "@/modules/Alert.tsx";
import Chip from "@/modules/Chip.tsx";

// utils
import {convertGregorianToJalali} from "@/utils/functions.ts";

const Review = ({me}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تصویر جلو کارت ملی"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Chip
                            color={me?.data?.data?.userInfo?.national_card ? "success" : "danger"}
                            label={me?.data?.data?.userInfo?.national_card ? "ثبت شده" : "ثبت نشده"}
                        />
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نام و نام خانوادگی"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                (!me?.data?.data?.userInfo?.first_name || !me?.data?.data?.userInfo?.last_name) ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.first_name + " " + me?.data?.data?.userInfo?.last_name
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد ملی"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.national_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.national_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره شناسنامه"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.id_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.id_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تاریخ تولد"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.birthdate ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : convertGregorianToJalali(me?.data?.data?.userInfo?.birthdate)
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره موبایل"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.mobile ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.mobile
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="آدرس"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.address ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.address
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="ایمیل"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.email ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.email
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="رزومه (عکس یا pdf)"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Chip
                            color={me?.data?.data?.userInfo?.resume_file ? "success" : "danger"}
                            label={me?.data?.data?.userInfo?.resume_file ? "ثبت شده" : "ثبت نشده"}
                        />
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="رزومه متنی"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="sm"
                            color="dark"
                        >
                            {
                                !me?.data?.data?.userInfo?.resume_text ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    me?.data?.data?.userInfo?.resume_text
                                )
                            }
                        </Typography>
                    </div>
                </div>

                {
                    parseInt(me?.data?.data?.userInfo?.status_id) !== 5 && (
                        <Alert
                            color="warning"
                            size="xs"
                            icon={
                                <LuAlertTriangle
                                    size={25}
                                    color="currentColor"
                                />
                            }
                            message={me?.data?.data?.userInfo?.status.title}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Review;