// libraries
import {LuAlertTriangle} from "react-icons/lu";

// components
import Loading from "@/components/partials/main/Loading.tsx";

// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Alert from "@/modules/Alert.tsx";
import Chip from "@/modules/Chip.tsx";

// utils
import {convertGregorianToJalali} from "@/utils/functions.ts";

const Review = ({myProfileAction}) => {
    return !myProfileAction.isPending ? (
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
                            color={myProfileAction?.data?.data?.userInfo?.national_card ? "success" : "danger"}
                            label={myProfileAction?.data?.data?.userInfo?.national_card ? "ثبت شده" : "ثبت نشده"}
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
                                (!myProfileAction?.data?.data?.userInfo?.first_name || !myProfileAction?.data?.data?.userInfo?.last_name) ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    myProfileAction?.data?.data?.userInfo?.first_name + " " + myProfileAction?.data?.data?.userInfo?.last_name
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
                                !myProfileAction?.data?.data?.userInfo?.national_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    myProfileAction?.data?.data?.userInfo?.national_code
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
                                !myProfileAction?.data?.data?.userInfo?.id_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    myProfileAction?.data?.data?.userInfo?.id_code
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
                                !myProfileAction?.data?.data?.userInfo?.birthdate ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : convertGregorianToJalali(myProfileAction?.data?.data?.userInfo?.birthdate)
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
                                !myProfileAction?.data?.data?.userInfo?.mobile ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    myProfileAction?.data?.data?.userInfo?.mobile
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
                                !myProfileAction?.data?.data?.userInfo?.address ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    myProfileAction?.data?.data?.userInfo?.address
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
                                !myProfileAction?.data?.data?.userInfo?.email ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    myProfileAction?.data?.data?.userInfo?.email
                                )
                            }
                        </Typography>
                    </div>
                </div>

                {
                    parseInt(myProfileAction?.data?.data?.userInfo?.status_id) !== 5 && (
                        <Alert
                            color="warning"
                            size="xs"
                            icon={
                                <LuAlertTriangle
                                    size={25}
                                    color="currentColor"
                                />
                            }
                            message={myProfileAction?.data?.data?.userInfo?.status.title}
                        />
                    )
                }
            </div>
        </div>
    ) : (
        <Loading
            width="100%"
            height={400}
        />
    )
}

export default Review;