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
                            color={readMyProfileAction.data?.data?.userInfo?.national_card ? "success" : "danger"}
                            label={readMyProfileAction.data?.data?.userInfo?.national_card ? "ثبت شده" : "ثبت نشده"}
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
                                (!readMyProfileAction.data?.data?.userInfo?.first_name || !readMyProfileAction.data?.data?.userInfo?.last_name) ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.first_name + " " + readMyProfileAction.data?.data?.userInfo?.last_name
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
                                !readMyProfileAction.data?.data?.userInfo?.national_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.national_code
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
                                !readMyProfileAction.data?.data?.userInfo?.id_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.id_code
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
                                !readMyProfileAction.data?.data?.userInfo?.birthdate ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : convertGregorianToJalali(readMyProfileAction.data?.data?.userInfo?.birthdate)
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
                                !readMyProfileAction.data?.data?.userInfo?.mobile ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.mobile
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
                                !readMyProfileAction.data?.data?.userInfo?.address ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.address
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
                                !readMyProfileAction.data?.data?.userInfo?.email ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.userInfo?.email
                                )
                            }
                        </Typography>
                    </div>
                </div>

                {
                    parseInt(readMyProfileAction.data?.data?.userInfo?.status_id) !== 5 && (
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
                                    message={readMyProfileAction.data?.data?.userInfo?.status?.title}
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