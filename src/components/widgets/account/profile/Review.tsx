// modules
import Typography from "@/modules/Typography.tsx";
import Form from "@/modules/Form.tsx";
import Alert from "@/modules/Alert.tsx";
import Chip from "@/modules/Chip.tsx";

const Review = () => {
    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تصویر جلو کارت ملی"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Chip
                            color="success"
                            label="ثبت شده"
                        />
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="نام و نام خانوادگی"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            علیرضا نقدی
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="کد ملی"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            0021234567
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره شناسنامه"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            0021234567
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="تاریخ تولد"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            1403/02/01
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره موبایل"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            09123456789
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="آدرس"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                        >
                            ایران ، تهران ، میدان ولی عصر
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="ایمیل"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            alirezanaghdi47@gmail.com
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="گروه شغلی"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            برنامه نویس و طراح
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="عنوان شغلی"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            فرانت اند
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="رزومه (عکس یا pdf)"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Chip
                            color="danger"
                            label="ثبت نشده"
                        />
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="رزومه متنی"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                        >
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره کارت"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            9012_5678_1234_6037
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره شبا"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            IR_12345_0000000123456789012
                        </Typography>
                    </div>
                </div>

                <div className="row gy-2">
                    <div className="col-lg-4">
                        <Form.Label
                            label="شماره حساب"
                            size="xs"
                            color="muted"
                        />
                    </div>

                    <div className="col-lg-8">
                        <Typography
                            variant="p"
                            size="xs"
                            color="dark"
                            isBold
                        >
                            000000123456789012
                        </Typography>
                    </div>
                </div>

                <Alert
                    color="warning"
                    size="lg"
                    icon="fad fa-triangle-exclamation"
                    title="تکمیل بخش مالی"
                    message="از طریق لینک رو به رو بخش مالی خود را تکمیل کنید"
                    action={{
                        label: "بخش مالی",
                        href: "/account/profile#financial"
                    }}
                />
            </div>
        </div>
    )
}

export default Review;