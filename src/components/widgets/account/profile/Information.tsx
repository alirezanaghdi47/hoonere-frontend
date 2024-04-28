// libraries
import {LazyLoadImage} from 'react-lazy-load-image-component';

// assets
import avatar from "@/assets/images/avatar.jpg";

// modules
import Typography from "@/modules/Typography.tsx";

const Information = () => {
    return (
        <div className="d-flex flex-column flex-sm-row justify-content-start align-items-start gap-5 w-100 h-100 mb-5">
            <div className="d-flex flex-column justify-content-start align-items-start h-100 gap-5">
                <LazyLoadImage
                    src={avatar}
                    alt="avatar"
                    width={150}
                    height={150}
                    className="rounded-2 min-w-100px min-h-100px mw-150px mh-150px"
                />
            </div>

            <div className="d-flex flex-column justify-content-start align-items-start w-100 h-100 gap-5">
                <Typography
                    variant="h3"
                    size="lg"
                    color="dark"
                    isBold
                >
                    علیرضا نقدی
                </Typography>

                <ul className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 list-style-none p-0 m-0">
                    <li className="">
                        <Typography
                            variant="p"
                            size="xs"
                            color="gray-700"
                        >
                            <i className="fad fa-user-circle fs-5 me-2"/>
                            برنامه نویس و طراح رابط کاربری
                        </Typography>
                    </li>

                    <li className="">
                        <Typography
                            variant="p"
                            size="xs"
                            color="gray-700"
                        >
                            <i className="fad fa-location-dot fs-5 me-2"/>
                            تهران
                        </Typography>
                    </li>

                    <li className="">
                        <Typography
                            variant="p"
                            size="xs"
                            color="gray-700"
                        >
                            <i className="fad fa-at fs-5 me-2"/>
                            alirezanaghdi47@gmail.com
                        </Typography>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Information;