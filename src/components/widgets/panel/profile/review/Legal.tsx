// libraries
import {LuAlertTriangle} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";
import Form from "@/modules/Form";
import Alert from "@/modules/Alert";
import Chip from "@/modules/Chip";

const Legal = ({readMyProfileAction}) => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تصویر روزنامه رسمی"
                            size="sm"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Chip
                            color={readMyProfileAction.data?.data?.user_info?.newspaper_file ? "success" : "danger"}
                            label={readMyProfileAction.data?.data?.user_info?.newspaper_file ? "ثبت شده" : "ثبت نشده"}
                        />
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نام شرکت"
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
                                !readMyProfileAction.data?.data?.user_info?.company_name ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : readMyProfileAction.data?.data?.user_info?.company_name
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره ثبت"
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
                                !readMyProfileAction.data?.data?.user_info?.register_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.register_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد اقتصادی"
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
                                !readMyProfileAction.data?.data?.user_info?.economic_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.economic_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره تماس"
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
                                !readMyProfileAction.data?.data?.user_info?.telephone ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.telephone
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
                            label="کد پستی"
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
                                !readMyProfileAction.data?.data?.user_info?.postal_code ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : (
                                    readMyProfileAction.data?.data?.user_info?.postal_code
                                )
                            }
                        </Typography>
                    </div>
                </div>

                <div className="row gy-5 w-100">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نمایندگان"
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
                                readMyProfileAction.data?.data?.user_info?.representatives.length === 0 ? (
                                    <Chip
                                        color="danger"
                                        label="ثبت نشده"
                                    />
                                ) : ` دارای ${readMyProfileAction.data?.data?.user_info?.representatives.length} نماینده `
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

export default Legal;