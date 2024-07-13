// libraries
import {LuAlertTriangle} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Alert from "@/modules/Alert.tsx";
import Chip from "@/modules/Chip.tsx";

// utils
import {convertGregorianToJalali} from "@/utils/functions.ts";

const Review = ({readMyProfileAction}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تصویر جلو کارت ملی"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Chip
                            color={readMyProfileAction.data?.data?.user_info?.national_card ? "success" : "danger"}
                            label={readMyProfileAction.data?.data?.user_info?.national_card ? "ثبت شده" : "ثبت نشده"}
                        />
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                (!readMyProfileAction.data?.data?.user_info?.first_name || !readMyProfileAction.data?.data?.user_info?.last_name) ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.first_name + " " + readMyProfileAction.data?.data?.user_info?.last_name
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                !readMyProfileAction.data?.data?.user_info?.national_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.national_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                !readMyProfileAction.data?.data?.user_info?.id_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.id_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                !readMyProfileAction.data?.data?.user_info?.birthdate ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : convertGregorianToJalali(readMyProfileAction.data?.data?.user_info?.birthdate)
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                !readMyProfileAction.data?.data?.user_info?.mobile ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.mobile
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                !readMyProfileAction.data?.data?.user_info?.address ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.address
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
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
                                !readMyProfileAction.data?.data?.user_info?.email ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.email
                                )
                            }
                        </Typography>
                    </div>
                </div>

                {
                    Number(readMyProfileAction.data?.data?.user_info?.status_id) !== 5 && (
                        <div className="row gy-5 w-100">
                            <div className="col-12">
                                <Alert
                                    color="warning"
                                    size="xs"
                                    icon={
                                        <LuAlertTriangle
                                            size={25}
                                            color="currentColor"
                                        />
                                    }
                                    message={readMyProfileAction.data?.data?.user_info?.status?.title}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Review;