// libraries
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {LuUser} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography.tsx";

const Information = ({myProfileAction}) => {
    return (
        <div className="d-flex flex-column flex-sm-row justify-content-start align-items-start gap-5 w-100 h-100 mb-5">
            <div className="d-flex justify-content-center align-items-center w-150px h-150px bg-secondary rounded-2">
                {
                    myProfileAction?.data?.data?.userInfo?.profile_img ? (
                        <LazyLoadImage
                            src={myProfileAction?.data?.data?.userInfo?.profile_img}
                            alt="avatar"
                            width={150}
                            height={150}
                            className="w-100 h-100 rounded-2"
                        />
                    ) : (
                        <LuUser
                            size={30}
                            color='currentColor'
                            className="text-gray-700"
                        />
                    )
                }
            </div>

            <div className="d-flex flex-column justify-content-start align-items-start h-100 gap-5">
                <Typography
                    variant="h3"
                    size="lg"
                    color="dark"
                    isBold
                >
                    {
                        (!myProfileAction?.data?.data?.userInfo?.first_name || !myProfileAction?.data?.data?.userInfo?.last_name) ? (
                            myProfileAction?.data?.data?.userInfo?.username
                        ) : (
                            myProfileAction?.data?.data?.userInfo?.first_name + " " + myProfileAction?.data?.data?.userInfo?.last_name
                        )
                    }
                </Typography>

                {/*<ul className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 list-style-none p-0 m-0">*/}
                {/*    <li className="">*/}
                {/*        <Typography*/}
                {/*            variant="p"*/}
                {/*            size="xs"*/}
                {/*            color="gray-700"*/}
                {/*        >*/}
                {/*            <LuUserCircle*/}
                {/*                size={15}*/}
                {/*                color='currentColor'*/}
                {/*                className="me-2"*/}
                {/*            />*/}

                {/*            برنامه نویس و طراح رابط کاربری*/}
                {/*        </Typography>*/}
                {/*    </li>*/}

                {/*    <li className="">*/}
                {/*        <Typography*/}
                {/*            variant="p"*/}
                {/*            size="xs"*/}
                {/*            color="gray-700"*/}
                {/*        >*/}
                {/*            <LuMapPin*/}
                {/*                size={15}*/}
                {/*                color='currentColor'*/}
                {/*                className="me-2"*/}
                {/*            />*/}

                {/*            تهران*/}
                {/*        </Typography>*/}
                {/*    </li>*/}

                {/*    <li className="">*/}
                {/*        <Typography*/}
                {/*            variant="p"*/}
                {/*            size="xs"*/}
                {/*            color="gray-700"*/}
                {/*        >*/}
                {/*            <LuAtSign*/}
                {/*                size={15}*/}
                {/*                color='currentColor'*/}
                {/*                className="me-2"*/}
                {/*            />*/}

                {/*            alirezanaghdi47@gmail.com*/}
                {/*        </Typography>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}

export default Information;